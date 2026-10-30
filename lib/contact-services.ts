export const CONTACT_SERVICES = [
  {value: "General Inquiry", label: "General Inquiry"},
  {value: "Bathroom Remodel", label: "Bathroom Remodel (Full Service)"},
  {value: "Custom Shower", label: "Custom Shower"},
  {value: "Residential Glass", label: "Residential Windows / Mirrors"},
  {value: "Custom Cut Glass", label: "Custom Cut Glass"},
  {value: "Commercial Glass", label: "Commercial Glass / Storefront"},
  {value: "Auto Glass", label: "Auto Glass"},
  {value: "Heavy Equipment Glass", label: "Oilfield & Heavy Equipment"},
] as const;

export type ContactService = typeof CONTACT_SERVICES[number]["value"];
export const CONTACT_LIMITS = {bytes: 32 * 1024, name: 120, phone: 40, service: 80, details: 5000} as const;

export function contactService(value: string): ContactService | undefined {
  // Keep existing homepage proposals and older clients compatible.
  if (value === "Home Windows") return "Residential Glass";
  if (value === "Oilfield & Heavy Equipment") return "Heavy Equipment Glass";
  return CONTACT_SERVICES.find(service => service.value === value)?.value;
}
