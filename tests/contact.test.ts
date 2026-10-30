import assert from "node:assert/strict";
import test from "node:test";
import {CONTACT_SERVICES, contactService} from "../lib/contact-services";
import {CONTACT_LIMITS, escapeEmailText, readContact, sameOriginInquiry, validateContact} from "../lib/contact";

const url = "https://www.lsglassandshower.com/api/contact";
const valid = {name: " Fictional fixture ", phone: " +1 (000) 000-0000 ", location: "Odessa, TX", service: "Custom Cut Glass", details: " Plain text <not markup> "};
const request = (body: string, headers: Record<string, string> = {}) => new Request(url, {method: "POST", headers: {"Content-Type": "application/json", Origin: new URL(url).origin, ...headers}, body});

test("all displayed services and both legacy aliases preserve a valid quote value", () => {
  for (const {value} of CONTACT_SERVICES) {
    assert.equal(contactService(value), value);
    const result = validateContact({...valid, service: value});
    assert.equal(result.kind, "input");
  }
  for (const [value, expected] of [["Home Windows", "Residential Glass"], ["Oilfield & Heavy Equipment", "Heavy Equipment Glass"]]) {
    const result = validateContact({...valid, service: value});
    assert.equal(result.kind, "input");
    if (result.kind === "input") assert.equal(result.input.service, expected);
  }
});
test("both locations, optional details and older missing-service requests stay valid", () => {
  for (const location of ["Odessa, TX", "Bartlesville, OK"]) {
    const result = validateContact({...valid, location, service: undefined, details: undefined});
    assert.equal(result.kind, "input");
    if (result.kind === "input") assert.deepEqual(result.input, {name: "Fictional fixture", phone: "+1 (000) 000-0000", location, service: "General Inquiry", details: ""});
  }
});
test("wrong shapes, types, locations, services and control characters are rejected", () => {
  for (const value of [null, [], true, "text", {}, {...valid, name: {}}, {...valid, phone: 123}, {...valid, name: " "}, {...valid, phone: "\n"}, {...valid, location: "Elsewhere"}, {...valid, service: "Unknown"}, {...valid, service: {}}, {...valid, details: []}, {...valid, name: "Name\nBcc: elsewhere"}, {...valid, details: "Bad\0data"}]) {
    const result = validateContact(value); assert.equal(result.kind, "error");
    if (result.kind === "error") assert.equal(result.status, 400);
  }
});
test("field limits accept their boundary and reject larger user-controlled values", () => {
  for (const [field, maximum] of [["name", CONTACT_LIMITS.name], ["phone", CONTACT_LIMITS.phone], ["details", CONTACT_LIMITS.details]] as const) {
    assert.equal(validateContact({...valid, [field]: "a".repeat(maximum)}).kind, "input");
    assert.equal(validateContact({...valid, [field]: "a".repeat(maximum + 1)}).kind, "error");
  }
});
test("honeypot short-circuits malformed quote fields without attempting validation", () => {
  assert.deepEqual(validateContact({honeypot: "synthetic bot", name: {}}), {kind: "honeypot"});
});
test("email escaping keeps user-provided markup, quotes and ampersands as text", () => {
  assert.equal(escapeEmailText(`A&B <a href="elsewhere">'quote'</a>`), "A&amp;B &lt;a href=&quot;elsewhere&quot;&gt;&#39;quote&#39;&lt;/a&gt;");
});
test("same-origin browser writes and non-browser clients work; cross-site/null origins do not", () => {
  assert(sameOriginInquiry(request("{}")));
  assert(sameOriginInquiry(new Request(url)));
  const rejectedHeaders: Record<string, string>[] = [{Origin: "https://elsewhere.example"}, {Origin: "null"}, {"Sec-Fetch-Site": "cross-site"}];
  for (const headers of rejectedHeaders) assert.equal(sameOriginInquiry(request("{}", headers)), false);
});
test("browser authority is checked against Host when Next normalizes the loopback URL", () => {
  const local = new Request("http://localhost:3431/api/contact", {headers: {Host: "127.0.0.1:3431", Origin: "http://127.0.0.1:3431"}});
  assert(sameOriginInquiry(local));
  for (const origin of ["http://elsewhere.example", "https://127.0.0.1:3431", "http://127.0.0.1:3431/not-an-origin"]) assert.equal(sameOriginInquiry(new Request(local, {headers: {Host: "127.0.0.1:3431", Origin: origin}})), false);
});
test("JSON parse/type and content-type failures produce controlled responses", async () => {
  for (const body of ["{", "null", "[]", "123", JSON.stringify({...valid, name: {}})]) {
    const result = await readContact(request(body));assert.equal(result.kind, "error");
    if (result.kind === "error") assert.equal(result.status, 400);
  }
  assert.deepEqual(await readContact(request("{}", {"Content-Type": "text/plain"})), {kind: "error", status: 415, error: "Expected a JSON quote request."});
  const cross = await readContact(request(JSON.stringify(valid), {Origin: "null"}));
  assert.equal(cross.kind, "error");if (cross.kind === "error") assert.equal(cross.status, 403);
  assert.equal((await readContact(request(JSON.stringify(valid), {"Content-Type": "application/json; charset=UTF-8"}))).kind, "input");
});
test("body size is bounded using actual chunks even without a content-length header", async () => {
  const declared = await readContact(request("{}", {"Content-Length": String(CONTACT_LIMITS.bytes + 1)}));
  assert.equal(declared.kind, "error");if (declared.kind === "error") assert.equal(declared.status, 413);
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({pull(controller) {controller.enqueue(new Uint8Array(8192));}, cancel() {cancelled = true;}});
  const streamed = new Request(url, {method: "POST", headers: {"Content-Type": "application/json"}, body, duplex: "half"} as RequestInit & {duplex: "half"});
  const result = await readContact(streamed);
  assert.equal(result.kind, "error");if (result.kind === "error") assert.equal(result.status, 413);
  assert(cancelled);
});
test("invalid UTF-8 is rejected rather than silently changing contact text", async () => {
  const result = await readContact(new Request(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: new Uint8Array([0xff])}));
  assert.equal(result.kind, "error");if (result.kind === "error") assert.equal(result.status, 400);
});
