"use client";
import { WebSlots } from "@/lib/slots";
import { SkinName } from "@/lib/slots";
import dynamic from "next/dynamic";

const SkinLuminous = dynamic(() => import("./skins/SkinLuminous"), { ssr: false });
const SkinFresko = dynamic(() => import("./skins/SkinFresko"), { ssr: false });
const SkinCalma = dynamic(() => import("./skins/SkinCalma"), { ssr: false });

interface Props {
  slots: WebSlots;
  skin: SkinName;
  mobile?: boolean;
}

export default function SkinPreview({ slots, skin, mobile }: Props) {
  const url = `${slots.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io`;

  return (
    <div style={{
      background: "white", border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)", overflow: "hidden",
      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      maxWidth: mobile ? 320 : "100%",
      margin: mobile ? "0 auto" : undefined,
    }}>
      {/* Browser bar */}
      <div style={{ background: "var(--warm-white)", borderBottom: "1px solid var(--border)", padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ flex: 1, background: "var(--border)", borderRadius: 3, height: 20, display: "flex", alignItems: "center", padding: "0 10px", fontSize: 10, color: "var(--ink-muted)" }}>
          {url}
        </div>
      </div>

      {/* Skin */}
      <div style={{ overflowY: "auto", maxHeight: mobile ? 500 : 600 }}>
        {skin === "Luminous" && <SkinLuminous slots={slots} mobile={mobile} />}
        {skin === "Fresco" && <SkinFresko slots={slots} mobile={mobile} />}
        {skin === "Calma" && <SkinCalma slots={slots} mobile={mobile} />}
      </div>
    </div>
  );
}
