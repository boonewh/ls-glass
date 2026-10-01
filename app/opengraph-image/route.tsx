import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/images/lone-star-logo-small.png"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#003366", color: "white", padding: "52px 70px", borderBottom: "18px solid #B80C09" }}>
        {/* ImageResponse renders this into the share image, not the website DOM. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/png;base64,${logo.toString("base64")}`} alt="Lone Star Glass & Shower" width="500" height="136" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 64, fontWeight: 700, lineHeight: 1.12 }}>
          <span>GLASS PERFECTION.</span>
          <span>NO COMPROMISE.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 26 }}>
          <span>Odessa &amp; Midland, Texas</span>
          <span style={{ color: "#facc15" }}>New location in Bartlesville, Oklahoma</span>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#cbd5e1" }}>lsglassandshower.com</div>
      </div>
    ),
    size,
  );
}
