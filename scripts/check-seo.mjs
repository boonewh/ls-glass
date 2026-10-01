import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";

// Check server-rendered output; no browser execution or external requests needed.
const base = process.argv[2] || "http://127.0.0.1:3000";
const site = "https://www.lsglassandshower.com";
const serviceSlugs = (await readdir(new URL("../app/services/", import.meta.url), { withFileTypes: true }))
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name);
const paths = ["/", ...serviceSlugs.map((slug) => `/services/${slug}`)];
const decode = (text) => text.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const titles = new Set();
const descriptions = new Set();
const images = new Set();

async function get(path) {
  const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(60000) });
  assert.equal(response.status, 200, `${path} must return 200`);
  return response;
}

for (const path of paths) {
  const html = await (await get(path)).text();
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${path}: server-rendered head`);
  const titleMatches = [...head.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(titleMatches.length, 1, `${path}: one title`);
  const title = decode(titleMatches[0][1]);
  assert.ok(title && !titles.has(title), `${path}: unique title`);
  titles.add(title);
  const metas = [...head.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const meta = (name) => {
    const matches = metas.filter((entry) => entry.name === name || entry.property === name);
    assert.equal(matches.length, 1, `${path}: exactly one ${name}`);
    assert.ok(matches[0].content, `${path}: nonempty ${name}`);
    return matches[0].content;
  };
  const description = meta("description");
  assert.ok(!descriptions.has(description), `${path}: unique description`);
  descriptions.add(description);
  const canonical = [...head.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((tag) => tag.rel === "canonical");
  assert.deepEqual(canonical.map((tag) => new URL(tag.href).href), [site + path], `${path}: canonical URL`);
  assert.equal(new URL(meta("og:url")).href, site + path);
  assert.equal(meta("og:title"), title);
  assert.equal(meta("twitter:title"), title);
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("og:type"), "website");
  assert.equal(meta("twitter:card"), "summary_large_image");
  for (const field of ["og:image", "twitter:image"]) {
    const image = new URL(meta(field));
    assert.equal(image.origin, site);
    images.add(image.pathname + image.search);
  }
  assert.match(meta("robots"), /\bindex\b/);
  assert.doesNotMatch(meta("robots"), /noindex/);
  assert.match(meta("googlebot"), /max-image-preview:large/);
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one main heading`);
  const graphs = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(([, json]) => JSON.parse(json)["@graph"]);
  const businesses = graphs.filter((node) => node["@type"] === "LocalBusiness");
  assert.equal(businesses.length, 2, `${path}: two locations`);
  const odessa = businesses.find((node) => node.address.addressLocality === "Odessa");
  const oklahoma = businesses.find((node) => node.address.addressLocality === "Bartlesville");
  assert.equal(odessa.telephone, "+14323163142");
  assert.equal(oklahoma.address.streetAddress, "1781 W 14th St.");
  for (const key of ["telephone", "email", "geo", "openingHoursSpecification", "hasOfferCatalog", "areaServed"]) {
    assert.equal(oklahoma[key], undefined, `${path}: no unconfirmed Oklahoma ${key}`);
  }
  assert.ok(graphs.every((node) => !node.aggregateRating && !node.review), "No self-serving review markup");
  if (path !== "/") {
    const service = graphs.find((node) => node["@type"] === "Service");
    assert.equal(service.url, site + path);
    assert.equal(service.provider["@id"], odessa["@id"]);
    const breadcrumbs = graphs.find((node) => node["@type"] === "BreadcrumbList");
    assert.equal(breadcrumbs.itemListElement.at(-1).item, site + path);
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    const attrs = attributes(tag);
    assert.ok(attrs.alt, `${path}: image alt text`);
    const src = new URL(attrs.src, base);
    const asset = src.pathname === "/_next/image" ? src.searchParams.get("url") : src.pathname;
    if (asset?.startsWith("/images/")) images.add(asset);
  }
  console.log(`PASS ${path}: metadata, social previews, headings, and structured data`);
}

for (const path of images) {
  const response = await get(path);
  assert.match(response.headers.get("content-type"), /^image\//, `${path}: actual image response`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  assert.ok(bytes.length > 100, `${path}: nonempty image`);
  if (path.startsWith("/opengraph-image")) {
    const view = new DataView(bytes.buffer);
    assert.equal(view.getUint32(16), 1200);
    assert.equal(view.getUint32(20), 630);
  }
}
const sitemap = await (await get("/sitemap.xml")).text();
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => decode(url)).sort(), paths.map((path) => site + path).sort());
assert.doesNotMatch(sitemap, /<lastmod>/, "No fabricated sitemap update dates");
const robots = await (await get("/robots.txt")).text();
assert.match(robots, /Allow: \/\s/);
assert.ok(robots.includes(`Sitemap: ${site}/sitemap.xml`));
const missing = await fetch(new URL("/seo-check-missing-page", base));
assert.equal(missing.status, 404);
assert.match(await missing.text(), /<meta name="robots" content="noindex"/);
await get("/icon.svg");
console.log(`PASS: ${paths.length} pages, ${images.size} images, sitemap, robots.txt, favicon, and noindex 404.`);
