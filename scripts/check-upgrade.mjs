import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {createServer} from 'node:http';
import {mkdir, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {chromium, devices} from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const base = 'http://127.0.0.1:3431', provider = 'http://127.0.0.1:4535';
const fixtureKey = 're_local_lsglass_fixture_only';
const checks = [], deliveries = [], fixtureErrors = [], assets = new Map();
let mode = 'success', releasePending, browserFailure = false, browser;
const fixture = createServer(async (request, response) => {
  try {
    assert.equal(request.method, 'POST'); assert.equal(request.url, '/emails');
    assert.equal(request.headers.authorization, 'Bearer ' + fixtureKey);
    let body = ''; for await (const chunk of request) {body += chunk; assert(body.length < 65536);}
    const payload = JSON.parse(body); deliveries.push(payload);
    assert.equal(payload.from, 'Lone Star Glass & Shower <noreply@lsglassandshower.com>');
    assert.deepEqual([].concat(payload.to), ['lsglassandshower@gmail.com']);
    assert.equal(payload.cc, undefined); assert.equal(payload.bcc, undefined);
    if (mode === 'drop') {request.socket.destroy(); return;}
    if (mode === 'pending') await new Promise(resolve => {releasePending = resolve;});
    response.setHeader('Content-Type', 'application/json');
    if (mode === 'error') {response.statusCode = 503; response.end('{"name":"application_error","message":"Synthetic provider failure"}');}
    else if (mode === 'invalid-json') response.end('not-json');
    else if (mode === 'no-id') response.end('{}');
    else if (mode === 'wrong-id') response.end('{"id":123}');
    else response.end(JSON.stringify({id: 'fixture-' + deliveries.length}));
  } catch (error) {fixtureErrors.push(error.message); response.statusCode = 500; response.end('{}');}
});
let server;
const valid = {name: 'Fictional <fixture> & company', phone: '+1 (000) 000-0000', location: 'Odessa, TX', service: 'Custom Cut Glass', details: '<a href="https://example.test">Only literal text</a>', honeypot: ''};
async function check(name, run) {await run(); checks.push(name); console.log('PASS ' + name);}
async function post(body, headers = {}) {
  const response = await fetch(base + '/api/contact', {method: 'POST', headers: {'Content-Type': 'application/json', Origin: base, ...headers}, body: typeof body === 'string' ? body : JSON.stringify(body), signal: AbortSignal.timeout(10000)});
  assert.match(response.headers.get('cache-control') || '', /private, no-store/);
  return {status: response.status, body: await response.json()};
}
async function visible(locator) {await locator.waitFor({state: 'visible'});}
async function fill(page, location = 'Odessa, TX') {
  await page.getByLabel('Name', {exact: true}).fill('Fictional browser fixture');
  await page.getByLabel('Phone', {exact: true}).fill('0000000000');
  await page.getByLabel('Location', {exact: true}).selectOption(location);
  await page.getByLabel('Details', {exact: true}).fill('Synthetic local request; never delivered.');
}
async function send(page) {await page.getByRole('button', {name: 'SEND REQUEST', exact: true}).click();}
async function accepted(page) {await visible(page.getByRole('heading', {name: 'Request Sent!', exact: true}));}
async function layout(page) {assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);}
async function externalAsset(url) {
  if (!assets.has(url)) assets.set(url, (async () => {
    const response = await fetch(url, {signal: AbortSignal.timeout(30000)}); assert(response.ok, url);
    return {body: Buffer.from(await response.arrayBuffer()), contentType: response.headers.get('content-type') || 'application/octet-stream'};
  })());
  return assets.get(url);
}

try {
  await mkdir(new URL('../test-results/', import.meta.url), {recursive: true});
  await new Promise((resolve, reject) => {fixture.once('error', reject); fixture.listen(4535, '127.0.0.1', resolve);});
  const env = {...process.env, NEXT_TELEMETRY_DISABLED: '1', RESEND_API_KEY: fixtureKey, RESEND_BASE_URL: provider, RESEND_DEBUG: ''};
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', '3431'], {cwd: root, env, stdio: 'inherit', windowsHide: true});
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) throw Error('Local app exited');
    try {if ((await fetch(base, {signal: AbortSignal.timeout(1000)})).ok) {ready = true; break;}} catch { /* Wait for startup. */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert(ready);
  await check('seven public pages,18 images, metadata/schema/sitemap/robots/404', () => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['scripts/check-seo.mjs', base], {cwd: root, env, stdio: 'inherit', windowsHide: true});
    child.on('error', reject); child.on('exit', code => code === 0 ? resolve() : reject(Error('Site checks failed: ' + code)));
  }));
  await check('optimized local image still loads', async () => {
    const response = await fetch(base + '/_next/image?url=%2Fimages%2Flone-star-logo-small.png&w=640&q=75');
    assert.equal(response.status, 200); assert.match(response.headers.get('content-type') || '', /^image\//); assert((await response.arrayBuffer()).byteLength > 100);
  });
  await check('invalid/honeypot requests reject or discard before any provider call', async () => {
    const count = deliveries.length;
    const cases = [
      [{honeypot: 'synthetic bot', name: {}}, {}, 200], ['{', {}, 400], ['null', {}, 400], ['[]', {}, 400],
      [{...valid, name: {}}, {}, 400], [{...valid, details: []}, {}, 400], [{...valid, location: 'Elsewhere'}, {}, 400],
      [{...valid, service: 'Unknown'}, {}, 400], [{...valid, name: 'a'.repeat(121)}, {}, 400],
      [{...valid, details: 'x'.repeat(5001)}, {}, 400], ['x'.repeat(32769), {}, 413],
      [valid, {'Content-Type': 'text/plain'}, 415], [valid, {Origin: 'https://elsewhere.example'}, 403],
      [valid, {Origin: 'null'}, 403], [valid, {'Sec-Fetch-Site': 'cross-site'}, 403],
    ];
    for (const [body, headers, status] of cases) assert.equal((await post(body, headers)).status, status);
    assert.equal(deliveries.length, count);
  });
  await check('both locations and legacy services use the fixed sender/recipient and escaped HTML', async () => {
    for (const [location, service, expected] of [['Odessa, TX', 'Home Windows', 'Residential Glass'], ['Bartlesville, OK', 'Oilfield & Heavy Equipment', 'Heavy Equipment Glass']]) {
      const count = deliveries.length; assert.deepEqual(await post({...valid, location, service}), {status: 200, body: {ok: true}});
      assert.equal(deliveries.length, count + 1); const message = deliveries.at(-1);
      assert.equal(message.subject, 'New Quote Request — ' + expected);
      assert(message.html.includes('Fictional &lt;fixture&gt; &amp; company'));
      assert(message.html.includes('&lt;a href=&quot;https://example.test&quot;&gt;Only literal text&lt;/a&gt;'));
      assert(!message.html.includes('<a href="https://example.test">'));
      assert(message.html.includes(location)); assert(message.html.includes('tel:10000000000'));
    }
  });
  await check('provider errors, dropped responses and malformed confirmations fail without automatic send retries', async () => {
    for (const failure of ['error', 'drop', 'invalid-json', 'no-id', 'wrong-id']) {
      mode = failure; const count = deliveries.length; const result = await post(valid);
      assert.equal(result.status, 500); assert.equal(result.body.error, 'Failed to send. Please call us directly at (432) 316-3142.');
      assert.equal(deliveries.length, count + 1);
    }
    mode = 'success';
  });
  browser = await chromium.launch({headless: true});
  for (const [name, options] of [['desktop', {viewport: {width: 1440, height: 1000}}], ['mobile', {...devices['iPhone 13']}]]) {
    const context = await browser.newContext({...options, reducedMotion: 'reduce', serviceWorkers: 'block'});
    const errors = [], unexpected = [], failed = [];
    await context.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin === base) {
        if (browserFailure && url.pathname === '/api/contact' && route.request().method() === 'POST') return route.abort('failed');
        return route.continue();
      }
      if (url.hostname === 'maps.google.com') return route.fulfill({status: 200, contentType: 'text/html', body: '<!doctype html><title>Local map placeholder</title>'});
      if ((url.hostname === 'cdnjs.cloudflare.com' && url.pathname.startsWith('/ajax/libs/font-awesome/6.0.0/')) || url.href === 'https://www.transparenttextures.com/patterns/carbon-fibre.png') {
        const asset = await externalAsset(url.href); return route.fulfill({...asset, status: 200, headers: {'Access-Control-Allow-Origin': '*'}});
      }
      unexpected.push(url.origin); return route.abort();
    });
    const page = await context.newPage(); page.setDefaultTimeout(15000);
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {if (response.url().startsWith(base) && response.status() >= 400 && !response.url().endsWith('/api/contact')) failed.push({url: response.url(), status: response.status()});});
    await check(`${name}: all six service pages display matching quote prefills and navigation works`, async () => {
      for (const [label, slug, service] of [['Bathroom Remodels', 'bathroom-remodel', 'Bathroom Remodel'], ['Custom Cut Glass', 'custom-cut-glass', 'Custom Cut Glass'], ['Residential Glass', 'residential-glass', 'Residential Glass'], ['Commercial Glass', 'commercial-glass', 'Commercial Glass'], ['Auto Glass', 'auto-glass', 'Auto Glass'], ['Oilfield & Heavy Equipment', 'heavy-equipment', 'Heavy Equipment Glass']]) {
        await page.goto(base, {waitUntil: 'networkidle'}); const nav = page.locator('nav').first();
        if (name === 'mobile') await nav.getByRole('button', {name: 'Open menu', exact: true}).click();
        await nav.getByRole('button', {name: /^Services\b/i}).click();
        await nav.getByRole('link', {name: label, exact: true}).click(); await page.waitForURL(base + '/services/' + slug);
        await visible(page.locator('h1')); assert.equal(await page.getByLabel('Service Interest', {exact: true}).inputValue(), service);
        await layout(page);
      }
      await page.goto(base, {waitUntil: 'networkidle'}); await layout(page);
      assert.equal(await page.getByLabel('Service Interest', {exact: true}).inputValue(), 'General Inquiry');
      await page.screenshot({path: fileURLToPath(new URL(`../test-results/home-${name}.png`, import.meta.url)), fullPage: true, animations: 'disabled'});
    });
    await check(`${name}: residential quote validates, waits and succeeds with matching payload`, async () => {
      await page.goto(base + '/services/residential-glass', {waitUntil: 'networkidle'});
      const count = deliveries.length; await send(page);
      assert.equal(await page.locator('#contact form').evaluate(form => form.checkValidity()), false); assert.equal(deliveries.length, count);
      await fill(page); mode = 'pending'; releasePending = undefined; await send(page);
      await visible(page.getByRole('button', {name: /Sending\.\.\./i})); assert(await page.getByRole('button', {name: /Sending\.\.\./i}).isDisabled());
      for (let i = 0; typeof releasePending !== 'function' && i < 100; i++) await new Promise(resolve => setTimeout(resolve, 50));
      assert.equal(typeof releasePending, 'function'); mode = 'success'; releasePending(); await accepted(page);
      assert.equal(deliveries.length, count + 1); assert.equal(deliveries.at(-1).subject, 'New Quote Request — Residential Glass');
      await page.getByRole('button', {name: 'Send another request', exact: true}).click();
      assert.equal(await page.getByLabel('Name', {exact: true}).inputValue(), ''); assert.equal(await page.getByLabel('Details', {exact: true}).inputValue(), '');
      assert.equal(await page.getByLabel('Service Interest', {exact: true}).inputValue(), 'Residential Glass'); await layout(page);
    });
    await check(`${name}: Bartlesville custom quote keeps fields on provider failure and succeeds on retry`, async () => {
      await page.goto(base + '/services/custom-cut-glass', {waitUntil: 'networkidle'}); await fill(page, 'Bartlesville, OK');
      mode = 'error'; await send(page); await visible(page.locator('#contact [role="alert"]'));
      assert.equal(await page.getByLabel('Name', {exact: true}).inputValue(), 'Fictional browser fixture');
      assert.equal(await page.getByLabel('Location', {exact: true}).inputValue(), 'Bartlesville, OK');
      assert.equal(await page.getByLabel('Service Interest', {exact: true}).inputValue(), 'Custom Cut Glass');
      mode = 'success'; await send(page); await accepted(page); assert(await page.getByText(/your Bartlesville inquiry shortly/).isVisible());
      assert.equal(deliveries.at(-1).subject, 'New Quote Request — Custom Cut Glass'); assert(deliveries.at(-1).html.includes('Bartlesville, OK'));
    });
    await check(`${name}: heavy-equipment quote preserves draft on browser network failure and retries`, async () => {
      await page.goto(base + '/services/heavy-equipment', {waitUntil: 'networkidle'}); await fill(page);
      browserFailure = true; const count = deliveries.length; await send(page); await visible(page.locator('#contact [role="alert"]'));
      assert.equal(deliveries.length, count); assert.equal(await page.getByLabel('Details', {exact: true}).inputValue(), 'Synthetic local request; never delivered.');
      assert.equal(await page.getByLabel('Service Interest', {exact: true}).inputValue(), 'Heavy Equipment Glass');
      browserFailure = false; await send(page); await accepted(page); assert.equal(deliveries.length, count + 1);
      assert.equal(deliveries.at(-1).subject, 'New Quote Request — Heavy Equipment Glass');
    });
    assert.deepEqual(errors, []); assert.deepEqual(unexpected, []); assert.deepEqual(failed, []); await context.close();
  }
  assert.deepEqual(fixtureErrors, []);
  await writeFile(new URL('../test-results/upgrade-checks.json', import.meta.url), JSON.stringify({checks, count: checks.length, mockedEmailAttempts: deliveries.length, realEmails: 0}, null, 2) + '\n');
  console.log(`${checks.length} verification groups passed; all email attempts stayed on loopback.`);
} finally {
  await browser?.close(); server?.kill(); fixture.closeAllConnections(); await new Promise(resolve => fixture.close(resolve));
}
