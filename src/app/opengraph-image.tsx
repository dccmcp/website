import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = ["MCP for Blender", "MCP for Rhino", "MCP for FreeCAD", "MCP for QGIS"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            left: -120,
            width: 700,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(45,212,191,0.16), rgba(10,10,11,0))",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 11,
              border: "1.5px solid #2dd4bf",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#2dd4bf",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#fafafa", fontSize: 27, fontWeight: 600 }}>{site.name}</span>
            <span style={{ color: "#a1a1aa", fontSize: 15, letterSpacing: 2.5 }}>
              MCP SERVERS FOR DCC SOFTWARE
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "relative" }}>
          <span
            style={{
              color: "#fafafa",
              fontSize: 60,
              fontWeight: 600,
              lineHeight: 1.08,
              maxWidth: 960,
            }}
          >
            Connect AI agents to Blender, Rhino, FreeCAD &amp; QGIS
          </span>
          <span style={{ color: "#a1a1aa", fontSize: 25, maxWidth: 920, lineHeight: 1.4 }}>
            Typed tools · safety policies · checkpoints · audit logs. Local by default.
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 26, position: "relative" }}>
          {chips.map((item) => (
            <span
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                color: "#a1a1aa",
                fontSize: 19,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 9999,
                  background: "#2dd4bf",
                  display: "flex",
                }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
