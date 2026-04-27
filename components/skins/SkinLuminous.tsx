"use client";
import { WebSlots } from "@/lib/slots";

interface Props {
  slots: WebSlots;
  mobile?: boolean;
}

function Placeholder({ w = 200, h = 16 }: { w?: number; h?: number }) {
  return <span style={{ display: "inline-block", background: "#E5DDD5", borderRadius: 2, opacity: 0.5, width: w, height: h, verticalAlign: "middle" }} />;
}

function Slot({ value, placeholder, style }: { value: string; placeholder?: string; style?: React.CSSProperties }) {
  if (!value) return <span style={{ color: "#C8BCB2", fontStyle: "italic", fontSize: "0.9em", ...style }}>{placeholder ?? "—"}</span>;
  return <span style={style}>{value}</span>;
}

export default function SkinLuminous({ slots, mobile }: Props) {
  const s = slots;
  const scale = mobile ? 0.55 : 1;

  const beneficios = [s.home_beneficio_1, s.home_beneficio_2, s.home_beneficio_3].filter(Boolean);
  const faqs = [
    { q: s.home_faq_1_pregunta, r: s.home_faq_1_respuesta },
    { q: s.home_faq_2_pregunta, r: s.home_faq_2_respuesta },
    { q: s.home_faq_3_pregunta, r: s.home_faq_3_respuesta },
  ].filter(f => f.q);

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: mobile ? 11 : 14,
      lineHeight: 1.6,
      color: "#1C1917",
      background: "#FAF8F4",
      transform: mobile ? `scale(${scale})` : undefined,
      transformOrigin: mobile ? "top left" : undefined,
      width: mobile ? `${100 / scale}%` : "100%",
    }}>
      {/* NAV */}
      <div style={{ padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5DDD5" }}>
        <span style={{ fontSize: 15, fontWeight: 400, letterSpacing: "0.08em" }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </span>
        <div style={{ display: "flex", gap: 16, fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "#78716C" }}>
          <span>Inicio</span><span>Sobre mí</span><span>Servicios</span><span>Contacto</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "40px 24px 32px", background: "#F5EDE7" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", color: "#8B6F5E", marginBottom: 10 }}>
          <Slot value={s.negocio_sector} placeholder="tu sector · para emprendedoras" />
        </div>
        <h1 style={{ fontSize: mobile ? 20 : 28, fontWeight: 300, lineHeight: 1.15, marginBottom: 10, minHeight: 36 }}>
          <Slot value={s.home_hero_titular} placeholder="Tu titular aparecerá aquí" />
        </h1>
        <p style={{ fontSize: mobile ? 10 : 12, fontFamily: "DM Sans, sans-serif", color: "#44403C", lineHeight: 1.6, minHeight: 18, maxWidth: 360 }}>
          <Slot value={s.home_hero_subtitular} placeholder="El subtítulo que explica tu propuesta" />
        </p>
        <div style={{ marginTop: 16 }}>
          <span style={{
            display: "inline-block", padding: "8px 18px",
            background: "#1C1917", color: "#FAF8F4",
            fontSize: 9, fontFamily: "DM Sans, sans-serif",
            letterSpacing: "0.06em", textTransform: "uppercase",
            borderRadius: 2,
          }}>
            <Slot value={s.home_hero_cta} placeholder="Trabajemos juntas" />
          </span>
        </div>
      </div>

      {/* PROBLEMA / SOLUCIÓN */}
      <div style={{ padding: "28px 24px", borderBottom: "1px solid #E5DDD5" }}>
        <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", color: "#8B6F5E", marginBottom: 10 }}>mi propuesta</div>
        <div style={{ fontSize: mobile ? 16 : 20, fontWeight: 300, marginBottom: 10, minHeight: 28 }}>
          <Slot value={s.home_problema_texto} placeholder="El problema que resuelves" style={{ display: "block", maxWidth: 360 }} />
        </div>
        {s.home_solucion_texto && (
          <p style={{ fontSize: mobile ? 10 : 12, fontFamily: "DM Sans, sans-serif", color: "#44403C", lineHeight: 1.6 }}>
            {s.home_solucion_texto}
          </p>
        )}
      </div>

      {/* BENEFICIOS */}
      {(beneficios.length > 0 || true) && (
        <div style={{ padding: "28px 24px", background: "#F5F2EC", borderBottom: "1px solid #E5DDD5" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", color: "#8B6F5E", marginBottom: 14 }}>beneficios</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[s.home_beneficio_1, s.home_beneficio_2, s.home_beneficio_3].map((b, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #E5DDD5", borderRadius: 4, padding: 12 }}>
                <div style={{ fontSize: 22, fontWeight: 300, color: "#8B6F5E", marginBottom: 4 }}>0{i + 1}</div>
                <div style={{ fontSize: mobile ? 9 : 11, fontFamily: "DM Sans, sans-serif", color: "#44403C", lineHeight: 1.5, minHeight: 14 }}>
                  {b || <Placeholder w={80} h={10} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOBRE MÍ */}
      <div style={{ padding: "28px 24px", display: "grid", gridTemplateColumns: "64px 1fr", gap: 16, alignItems: "flex-start", borderBottom: "1px solid #E5DDD5" }}>
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E8DDD6" }} />
        <div>
          <div style={{ fontSize: mobile ? 16 : 20, fontWeight: 300, marginBottom: 6 }}>
            <Slot value={s.sobremi_nombre} placeholder="Tu nombre" />
          </div>
          <div style={{ fontSize: mobile ? 10 : 12, fontFamily: "DM Sans, sans-serif", color: "#44403C", lineHeight: 1.6, minHeight: 14 }}>
            <Slot value={s.sobremi_bio_corta || s.sobremi_diferencial} placeholder="Tu diferencial y bio aparecerán aquí" />
          </div>
        </div>
      </div>

      {/* TESTIMONIOS */}
      {(s.home_testimonio_1_texto || s.home_testimonio_2_texto) && (
        <div style={{ padding: "28px 24px", background: "#F5EDE7", borderBottom: "1px solid #E5DDD5" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", color: "#8B6F5E", marginBottom: 14 }}>testimonios</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { texto: s.home_testimonio_1_texto, nombre: s.home_testimonio_1_nombre },
              { texto: s.home_testimonio_2_texto, nombre: s.home_testimonio_2_nombre },
            ].filter(t => t.texto).map((t, i) => (
              <div key={i} style={{ background: "white", border: "1px solid #E5DDD5", borderRadius: 4, padding: 14 }}>
                <p style={{ fontSize: mobile ? 10 : 12, fontStyle: "italic", color: "#44403C", lineHeight: 1.6, marginBottom: 8 }}>"{t.texto}"</p>
                <div style={{ fontSize: 10, fontFamily: "DM Sans, sans-serif", color: "#78716C" }}>— {t.nombre}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <div style={{ padding: "28px 24px", borderBottom: "1px solid #E5DDD5" }}>
          <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", color: "#8B6F5E", marginBottom: 14 }}>preguntas frecuentes</div>
          {faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: i < faqs.length - 1 ? "1px solid #E5DDD5" : "none" }}>
              <div style={{ fontSize: 13, fontWeight: 400, marginBottom: 4 }}>{faq.q}</div>
              <div style={{ fontSize: 11, fontFamily: "DM Sans, sans-serif", color: "#44403C", lineHeight: 1.6 }}>{faq.r}</div>
            </div>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div style={{ padding: "18px 24px", background: "#1C1917" }}>
        <div style={{ fontSize: 13, fontWeight: 300, letterSpacing: "0.08em", color: "#FAF8F4", marginBottom: 2 }}>
          <Slot value={s.negocio_nombre} placeholder="Tu negocio" />
        </div>
        <div style={{ fontSize: 9, fontFamily: "DM Sans, sans-serif", color: "#78716C" }}>
          {s.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io
        </div>
      </div>
    </div>
  );
}
