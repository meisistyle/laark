"use client";
import { WebSlots } from "@/lib/slots";

interface Props { slots: WebSlots; mobile?: boolean; }

function Slot({ value, placeholder, style }: { value: string; placeholder?: string; style?: React.CSSProperties }) {
  if (!value) return <span style={{ color: "#B8B0A4", fontStyle: "italic", fontSize: "0.9em", ...style }}>{placeholder ?? "—"}</span>;
  return <span style={style}>{value}</span>;
}

export default function SkinCalma({ slots, mobile }: Props) {
  const s = slots;
  const scale = mobile ? 0.55 : 1;

  return (
    <div style={{
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontSize: mobile ? 11 : 14,
      lineHeight: 1.6,
      color: "#2A2520",
      background: "#FAFAF8",
      transform: mobile ? `scale(${scale})` : undefined,
      transformOrigin: mobile ? "top left" : undefined,
      width: mobile ? `${100 / scale}%` : "100%",
    }}>
      {/* NAV — minimal */}
      <div style={{ padding: "18px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </span>
        <div style={{ display: "flex", gap: 20, fontSize: 10, color: "#8A8278", letterSpacing: "0.04em" }}>
          <span>inicio</span><span>sobre mí</span><span>servicios</span><span>contacto</span>
        </div>
      </div>

      {/* HERO — centrado y minimalista */}
      <div style={{ padding: "48px 28px 40px", textAlign: "center", borderTop: "1px solid #E8E4DE", borderBottom: "1px solid #E8E4DE" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8A8278", marginBottom: 16 }}>
          <Slot value={s.negocio_sector} placeholder="tu sector" />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 22 : 30, fontWeight: 300, lineHeight: 1.2, marginBottom: 14, color: "#2A2520", maxWidth: 400, margin: "0 auto 14px" }}>
          <Slot value={s.home_hero_titular} placeholder="Tu titular aparecerá aquí" />
        </h1>
        <p style={{ fontSize: mobile ? 10 : 12, color: "#5A544E", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 20px" }}>
          <Slot value={s.home_hero_subtitular} placeholder="Subtítulo de tu propuesta" />
        </p>
        <span style={{
          display: "inline-block", padding: "9px 22px",
          border: "1px solid #2A2520", color: "#2A2520",
          fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
          borderRadius: 1,
        }}>
          <Slot value={s.home_hero_cta} placeholder="Hablemos" />
        </span>
      </div>

      {/* PROBLEMA */}
      <div style={{ padding: "36px 28px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 18 : 24, fontWeight: 300, fontStyle: "italic", lineHeight: 1.4, color: "#2A2520", marginBottom: 12 }}>
          <Slot value={s.home_problema_texto} placeholder="El problema que resuelves" />
        </div>
        {s.home_solucion_texto && (
          <p style={{ fontSize: mobile ? 10 : 12, color: "#5A544E", lineHeight: 1.7 }}>{s.home_solucion_texto}</p>
        )}
      </div>

      {/* BENEFICIOS — líneas horizontales */}
      <div style={{ borderTop: "1px solid #E8E4DE" }}>
        {[s.home_beneficio_1, s.home_beneficio_2, s.home_beneficio_3].map((b, i) => (
          <div key={i} style={{ padding: "20px 28px", display: "grid", gridTemplateColumns: "28px 1fr", gap: 16, alignItems: "center", borderBottom: "1px solid #E8E4DE" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 300, color: "#8A8278" }}>0{i + 1}</span>
            <span style={{ fontSize: mobile ? 11 : 13, color: "#2A2520" }}>
              {b || <span style={{ color: "#B8B0A4" }}>Beneficio {i + 1}</span>}
            </span>
          </div>
        ))}
      </div>

      {/* SOBRE MÍ */}
      <div style={{ padding: "36px 28px", textAlign: "center", borderBottom: "1px solid #E8E4DE" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#C9C4B4", margin: "0 auto 16px" }} />
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 18 : 22, fontWeight: 300, marginBottom: 8, color: "#2A2520" }}>
          <Slot value={s.sobremi_nombre} placeholder="Tu nombre" />
        </div>
        <p style={{ fontSize: mobile ? 10 : 12, color: "#5A544E", lineHeight: 1.7, maxWidth: 320, margin: "0 auto" }}>
          <Slot value={s.sobremi_diferencial || s.sobremi_bio_corta} placeholder="Tu diferencial aparecerá aquí" />
        </p>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "20px 28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </span>
        <span style={{ fontSize: 9, color: "#8A8278" }}>
          {s.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io
        </span>
      </div>
    </div>
  );
}
