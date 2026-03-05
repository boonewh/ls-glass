import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, phone, service, details, honeypot } = await req.json();

  // Honeypot — bots fill this hidden field, humans don't
  if (honeypot) {
    return NextResponse.json({ ok: true }); // silently discard
  }

  if (!name?.trim() || !phone?.trim()) {
    return NextResponse.json(
      { error: "Name and phone are required." },
      { status: 400 }
    );
  }

  try {
    await resend.emails.send({
      from: "Lone Star Glass & Shower <noreply@lsglassandshower.com>",
      to: "lsglassandshower@gmail.com",
      subject: `New Quote Request — ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #003366; padding: 24px 32px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Quote Request</h1>
          </div>
          <div style="padding: 32px; background: #f9fafb; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #374151; width: 120px;">Name</td>
                <td style="padding: 10px 0; color: #111827;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone</td>
                <td style="padding: 10px 0; color: #111827;">
                  <a href="tel:${phone.replace(/\D/g, "")}" style="color: #B80C09;">${phone}</a>
                </td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151;">Service</td>
                <td style="padding: 10px 0; color: #111827;">${service}</td>
              </tr>
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Details</td>
                <td style="padding: 10px 0; color: #111827;">${details?.trim() || "<em style='color:#9ca3af'>None provided</em>"}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #003366; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              Lone Star Glass &amp; Shower · 2011 W 7th St, Odessa TX · (432) 316-3142
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please call us directly at (432) 316-3142." },
      { status: 500 }
    );
  }
}
