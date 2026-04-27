"use client";
import { WebSlots } from "@/lib/slots";

interface Props { slots: WebSlots; mobile?: boolean; }

function Slot({ value, placeholder, style }: { value: string; placeholder?: string; style?: React.CSSProperties }) {
  if (!value) return <span style={{ color: "#9AAFBC", fontStyle: "italic", fontSize: "0.9em", ...style }}>{placeholder ?? "—"}</span>;
  return <span style={style}>{value}</span>;
}

export default function SkinFresko({ slots, mobile }: Props) {
  const s = slots;
  const scale = mobile ? 0.55 : 1;

  return (
    <div style={{
      fontFamily: "DM Sans, system-ui, sans-serif",
      fontSize: mobile ? 11 : 14,
      lineHeight: 1.6,
      color: "#1A2B35",
      background: "#F7FAFB",
      transform: mobile ? `scale(${scale})` : undefined,
      transformOrigin: mobile ? "top left" : undefined,
      width: mobile ? `${100 / scale}%` : "100%",
    }}>
      {/* NAV */}
      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "white", borderBottom: "1px solid #D0E2EC" }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 300, letterSpacing: "0.06em", color: "#2B3E4A" }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </span>
        <div style={{ display: "flex", gap: 16, fontSize: 10, color: "#5A7A8A" }}>
          <span>Inicio</span><span>Sobre mí</span><span>Servicios</span><span>Contacto</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "40px 24px 32px", background: "linear-gradient(135deg, #E8EDF0 0%, #D0E2EC 100%)" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "#4A7A8A", marginBottom: 10 }}>
          <Slot value={s.negocio_sector} placeholder="tu especialidad" />
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: mobile ? 20 : 28, fontWeight: 300, lineHeight: 1.15, marginBottom: 10, color: "#1A2B35", minHeight: 36 }}>
          <Slot value={s.home_hero_titular} placeholder="Tu titular aparecerá aquí" />
        </h1>
        <p style={{ fontSize: mobile ? 10 : 12, color: "#3A5A6A", lineHeight: 1.6, minHeight: 18, maxWidth: 360 }}>
          <Slot value={s.home_hero_subtitular} placeholder="El subtítulo de tu propuesta" />
        </p>
        <div style={{ marginTop: 16 }}>
          <span style={{
            display: "inline-block", padding: "8px 18px",
            background: "#2B3E4A", color: "white",
            fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", borderRadius: 3,
          }}>
            <Slot value={s.home_hero_cta} placeholder="Contacta conmigo" />
          </span>
        </div>
      </div>

      {/* PROPUESTA */}
      <div style={{ padding: "28px 24px", background: "white", borderBottom: "1px solid #D0E2EC" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A7A8A", marginBottom: 8 }}>el problema</div>
            <p style={{ fontSize: mobile ? 10 : 12, color: "#3A5A6A", lineHeight: 1.6 }}>
              <Slot value={s.home_problema_texto} placeholder="Lo que tu clienta siente antes de encontrarte" />
            </p>
          </div>
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A7A8A", marginBottom: 8 }}>la solución</div>
            <p style={{ fontSize: mobile ? 10 : 12, color: "#3A5A6A", lineHeight: 1.6 }}>
              <Slot value={s.home_solucion_texto} placeholder="Cómo tu servicio lo resuelve" />
            </p>
          </div>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div style={{ padding: "28px 24px", borderBottom: "1px solid #D0E2EC" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A7A8A", marginBottom: 14 }}>qué consigues</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[s.home_beneficio_1, s.home_beneficio_2, s.home_beneficio_3].map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: 12, background: "#F7FAFB", borderRadius: 4, border: "1px solid #D0E2EC" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#2B3E4A", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: mobile ? 9 : 11, color: "#1A2B35", lineHeight: 1.5 }}>
                {b || <span style={{ color: "#9AAFBC" }}>Beneficio {i + 1}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SOBRE MÍ */}
      <div style={{ padding: "28px 24px", background: "white", borderBottom: "1px solid #D0E2EC" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4A7A8A", marginBottom: 14 }}>sobre mí</div>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <div style={{ width: 56, height: 56, borderRadius: 4, background: "#D0E2EC", flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, marginBottom: 6, color: "#1A2B35" }}>
              <Slot value={s.sobremi_nombre} placeholder="Tu nombre" />
            </div>
            <p style={{ fontSize: mobile ? 10 : 12, color: "#3A5A6A", lineHeight: 1.6 }}>
              <Slot value={s.sobremi_bio_corta || s.sobremi_diferencial} placeholder="Tu diferencial y trayectoria" />
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "18px 24px", background: "#2B3E4A", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, fontWeight: 300, color: "white" }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>
          {s.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io
        </div>
      </div>
    </div>
  );
}
