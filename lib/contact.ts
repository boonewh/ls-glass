import {CONTACT_LIMITS, contactService, type ContactService} from "./contact-services";
export {CONTACT_LIMITS} from "./contact-services";
export type ContactInput = {name: string; phone: string; location: "Odessa, TX" | "Bartlesville, OK"; service: ContactService; details: string};
export type ContactResult = {kind: "input"; input: ContactInput} | {kind: "honeypot"} | {kind: "error"; status: number; error: string};
const failure = (error: string, status = 400): ContactResult => ({kind: "error", status, error});

export function sameOriginInquiry(request: Request): boolean {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return true; // Preserve non-browser clients; this is not bot authentication.
  try {
    const source = new URL(origin), target = new URL(request.url);
    // NextRequest normalizes loopback URL names; Host retains the browser authority.
    const host = request.headers.get("host") ?? target.host;
    return origin === source.origin && source.host === host && source.protocol === target.protocol;
  } catch {return false;}
}

export function validateContact(value: unknown): ContactResult {
  if (!value || typeof value !== "object" || Array.isArray(value)) return failure("Expected a quote request.");
  const fields = value as Record<string, unknown>;
  if (fields.honeypot) return {kind: "honeypot"};
  const {name, phone, location} = fields;
  if (typeof name !== "string" || typeof phone !== "string" || !name.trim() || !phone.trim()) return failure("Name and phone are required.");
  if (name.length > CONTACT_LIMITS.name || phone.length > CONTACT_LIMITS.phone || /[\u0000-\u001f\u007f]/.test(name + phone)) return failure("Please shorten or correct your name and phone number.");
  if (location !== "Odessa, TX" && location !== "Bartlesville, OK") return failure("Please choose Odessa or Bartlesville for your inquiry.");
  const service = fields.service ?? "General Inquiry";
  if (typeof service !== "string" || service.length > CONTACT_LIMITS.service) return failure("Please choose a service.");
  const chosen = contactService(service.trim());
  if (!chosen) return failure("Please choose a service.");
  const details = fields.details ?? "";
  if (typeof details !== "string" || details.length > CONTACT_LIMITS.details || details.includes("\u0000")) return failure("Please keep project details within 5,000 characters.");
  return {kind: "input", input: {name: name.trim(), phone: phone.trim(), location, service: chosen, details: details.trim()}};
}

export async function readContact(request: Request): Promise<ContactResult> {
  if (!sameOriginInquiry(request)) return failure("Please send your inquiry from this website.", 403);
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") return failure("Expected a JSON quote request.", 415);
  if (Number(request.headers.get("content-length")) > CONTACT_LIMITS.bytes) return failure("Quote request is too large.", 413);
  try {
    const reader = request.body?.getReader();
    if (!reader) return failure("Expected a quote request.");
    const parts: Uint8Array[] = []; let length = 0;
    for (;;) {
      const {done, value} = await reader.read(); if (done) break;
      length += value.byteLength;
      if (length > CONTACT_LIMITS.bytes) {await reader.cancel(); return failure("Quote request is too large.", 413);}
      parts.push(value);
    }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const part of parts) {bytes.set(part, offset); offset += part.byteLength;}
    return validateContact(JSON.parse(new TextDecoder("utf-8", {fatal: true}).decode(bytes)));
  } catch {return failure("Please send a valid quote request.");}
}

export function escapeEmailText(value: string): string {
  const entities: Record<string, string> = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
  return value.replace(/[&<>"']/g, character => entities[character]);
}
