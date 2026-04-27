"use client";
import Link from "next/link";
import { useState } from "react";

const FAQS = [
  { q: "¿Necesito saber de diseño o programación?", r: "No. La plataforma hace todo por ti. Tú solo respondes preguntas sobre tu negocio." },
  { q: "¿Cuánto tiempo tardará en estar lista mi web?", r: "Puedes tener la web lista en una tarde. La conversación lleva 20-30 minutos, elegir diseño es instantáneo." },
  { q: "¿Puedo cambiar el contenido después?", r: "Sí, cuando quieras. El contenido es tuyo y puedes editarlo en cualquier momento desde el panel." },
  { q: "¿Y si quiero cambiar de diseño?", r: "Cambiar de diseño es instantáneo. Tu contenido se mantiene — solo cambia la apariencia, como cambiar de vestido a una muñeca." },
  { q: "¿Qué pasa después del primer año?", r: "Puedes renovar el alojamiento por 40€/año, o exportar tu web completa de forma gratuita y alojarla donde quieras." },
  { q: "¿Funciona si no tengo fotos profesionales?", r: "Sí. Muchas clientas usan fotos de móvil o imágenes de stock. La plataforma las optimiza automáticamente." },
];

const STEPS = [
  { n: "1", title: "Cuéntame sobre tu negocio", desc: "Una serie de preguntas que extraen exactamente lo que tu web necesita — beneficios, servicios, lo que te hace diferente.", icon: "✦" },
  { n: "2", title: "Elige tu diseño", desc: "No eliges colores, tipografía ni hover elements. Tú solo elige el modelo que más te guste.", icon: "◈" },
  { n: "3", title: "Sube tus fotos", desc: "Laark las recorta, perfecciona y las encaja en su sitio. Tú no te preocupas por nada técnico.", icon: "❋" },
  { n: "4", title: "Tu web está online", desc: "Publícala y listo. Puedes cambiar lo que quieras en cualquier momento.", icon: "◉" },
];

function LaarkLogo({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="2" x2="20" y2="38" stroke={color} strokeWidth="1.8" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1.8" />
      <line x1="5.86" y1="5.86" x2="34.14" y2="34.14" stroke={color} strokeWidth="1.8" />
      <line x1="34.14" y1="5.86" x2="5.86" y2="34.14" stroke={color} strokeWidth="1.8" />
      <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function WebMockup() {
  return (
    <div style={{
      background: "#FAF8F4",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 24px 64px rgba(28,25,23,0.14), 0 4px 16px rgba(28,25,23,0.06)",
      border: "1px solid #E5DDD5",
      width: "100%",
      maxWidth: 380,
    }}>
      {/* Browser bar */}
      <div style={{ background: "#F0EBE3", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #E5DDD5" }}>
        <div style={{ display: "flex", gap: 5 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E8A598" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E8D498" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#A8D5B5" }} />
        </div>
        <div style={{ flex: 1, background: "#FAF8F4", borderRadius: 4, padding: "3px 10px", fontSize: 9, color: "#78716C", textAlign: "center" }}>
          camila.laark.io
        </div>
      </div>
      {/* Nav */}
      <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #E5DDD5" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, letterSpacing: "0.18em", fontWeight: 300, textTransform: "uppercase" }}>CAMILA</span>
        <div style={{ display: "flex", gap: 14 }}>
          {["flores", "servicios", "contacto"].map(l => (
            <span key={l} style={{ fontSize: 8, color: "#78716C", letterSpacing: "0.06em", textTransform: "uppercase" }}>{l}</span>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div style={{ padding: "24px 20px 20px", background: "#F5EDE7" }}>
        <div style={{ fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8B6F5E", marginBottom: 8 }}>floristería · madrid</div>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, fontWeight: 300, lineHeight: 1.15, marginBottom: 10, color: "#1C1917" }}>
          Flores que cuentan<br /><em style={{ fontStyle: "italic" }}>tu historia.</em>
        </p>
        <p style={{ fontSize: 9, color: "#44403C", lineHeight: 1.6, marginBottom: 14, maxWidth: 200 }}>
          Arreglos para bodas, eventos y momentos que merecen ser recordados.
        </p>
        <div style={{ display: "inline-block", padding: "6px 14px", background: "#1C1917", color: "#FAF8F4", fontSize: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ver servicios
        </div>
      </div>
      {/* Image grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 3, padding: 3 }}>
        <div style={{ background: "linear-gradient(135deg, #DDD0C8 0%, #C9B8AC 100%)", height: 90, borderRadius: 4 }} />
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: 3 }}>
          <div style={{ background: "linear-gradient(135deg, #E8DDD6 0%, #D4C5B5 100%)", borderRadius: 4 }} />
          <div style={{ background: "linear-gradient(135deg, #C9BDB5 0%, #B5A89E 100%)", borderRadius: 4 }} />
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,244,0.95)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
        padding: "0 48px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <LaarkLogo size={20} color="var(--ink)" />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 300, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            LAARK
          </span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#como-funciona" style={{ fontSize: 12, color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>cómo funciona</a>
          <a href="#disenos" style={{ fontSize: 12, color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>diseños</a>
          <a href="#precio" style={{ fontSize: 12, color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>precio</a>
          <Link href="/dashboard" style={{ fontSize: 12, color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>entrar</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ padding: "8px 20px", fontSize: 12 }}>empezar</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 28, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-block", width: 20, height: 1, background: "var(--accent)" }} />
              tu web. sin complicaciones.
            </div>
            <h1 style={{
              fontFamily: "var(--font-cormorant)", fontSize: "clamp(44px, 5.5vw, 76px)",
              fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.01em",
              color: "var(--ink)", marginBottom: 24,
            }}>
              Rellenas un formulario.<br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Sales con una web así.</em>
            </h1>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", maxWidth: 420, marginBottom: 40, lineHeight: 1.75 }}>
              Cuéntale a la IA sobre tu negocio. Elige un diseño con criterio de diseñadora.
              Tu web aparece lista — sin tocar tipografías, sin pelearte con plantillas.
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 13, padding: "12px 28px" }}>crear mi web</Link>
              <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                <strong style={{ color: "var(--ink)", fontWeight: 500 }}>200€</strong> — pago único, para siempre
              </span>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: -20, right: -20, width: 200, height: 200, background: "radial-gradient(circle, #F5EDE7 0%, transparent 70%)", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10, textAlign: "center" }}>
                ✦ skin luminoso
              </div>
              <WebMockup />
            </div>
          </div>
        </div>
      </section>

      {/* MEJOR QUE UNA PLANTILLA */}
      <section style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
              el criterio que marca la diferencia
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.15, color: "var(--ink)" }}>
              Mejor que una plantilla.<br />
              <em style={{ fontWeight: 300, fontStyle: "italic" }}>No tienes que decidir.</em>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {[
              { icon: "◻", title: "Sin decidir tipografías", desc: "El diseño está cerrado. Solo cambia el contenido. Nunca más eligiendo entre 400 fuentes." },
              { icon: "◻", title: "Sin pelearte con el layout", desc: "Las secciones, el orden y el espacio ya están pensados por una diseñadora con criterio." },
              { icon: "◻", title: "Sin copiar y pegar mal", desc: "La IA transforma tu contenido en copy estratégico. No solo recoge lo que dices — lo mejora." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: "28px 24px", background: "white", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
                <div style={{ width: 32, height: 32, background: "var(--success-light)", border: "1px solid #A8D5B5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 14, color: "var(--success)" }}>✓</div>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "100px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
                el proceso
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--ink)", marginBottom: 20 }}>
                Más simple<br />
                <em style={{ fontWeight: 300, fontStyle: "italic" }}>de lo que parece.</em>
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.75 }}>
                Cuéntalo todo y sube tus fotos como si hablases con alguien.
              </p>
            </div>
            <div>
              {STEPS.map((s, i) => (
                <div key={s.n} style={{
                  display: "grid", gridTemplateColumns: "48px 1fr", gap: 24,
                  padding: "32px 0", borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
                  alignItems: "start",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: "50%",
                    border: "1px solid var(--border)", background: "white",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 300, color: "var(--accent)",
                    flexShrink: 0,
                  }}>
                    {s.n}
                  </div>
                  <div style={{ paddingTop: 10 }}>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 500, marginBottom: 6, color: "var(--ink)" }}>{s.title}</div>
                    <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISEÑOS */}
      <section id="disenos" style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ background: "var(--accent)", color: "white", fontSize: 8, padding: "2px 7px", borderRadius: 10, letterSpacing: "0.1em" }}>NUEVO</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, color: "var(--ink)", marginBottom: 16 }}>
                Elige tu diseño.<br />
                <em style={{ fontWeight: 300, fontStyle: "italic" }}>Cambia cuando quieras.</em>
              </h2>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 16 }}>
                Tienes varios diseños para elegir. Tu contenido encaja en cualquiera sin que tengas que tocar nada. Como cambiar de vestido.
              </p>
              <p style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
                + nuevos diseños cada temporada
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { name: "Luminoso", tag: "CÁLIDO", bg: "#F0EBE3", accent: "#8B6F5E", desc: "cálido · editorial · orgánico" },
                { name: "Fresco", tag: "DIFERENCIADO", bg: "#E8EDF2", accent: "#2B4A5E", desc: "limpio · fresco · profesional" },
                { name: "Calma", tag: "NATURAL", bg: "#F0EDE8", accent: "#3A3528", desc: "neutro · elegante · atemporal" },
              ].map((sk, i) => (
                <div key={sk.name} style={{
                  border: i === 0 ? "2px solid var(--accent)" : "1px solid var(--border)",
                  borderRadius: "var(--radius-md)", overflow: "hidden", background: "white",
                  cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
                >
                  <div style={{ height: 140, background: sk.bg, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 8, letterSpacing: "0.14em", color: sk.accent, textTransform: "uppercase" }}>{sk.tag}</div>
                    <div>
                      <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 14, fontWeight: 300, color: sk.accent, letterSpacing: "0.08em", marginBottom: 4 }}>ENTRANCE</div>
                      <div style={{ width: "60%", height: 1, background: sk.accent, opacity: 0.3 }} />
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px" }}>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 16, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{sk.name}</div>
                    <div style={{ fontSize: 10, color: "var(--ink-muted)", letterSpacing: "0.04em" }}>{sk.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MEJORES TEXTOS */}
      <section style={{ padding: "100px 48px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              mejores textos
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.15, marginBottom: 20, color: "var(--ink)" }}>
              No tienes que<br />
              <em style={{ fontWeight: 300, fontStyle: "italic" }}>escribir una web.</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.8 }}>
              La IA no copia lo que dices — lo transforma. Tu "ayudo a mujeres a organizarse mejor"
              se convierte en copy que vende. El criterio de Elena, aplicado a cada frase.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ background: "var(--ink)", borderRadius: "var(--radius-md)", padding: "32px 28px", color: "var(--cream)" }}>
              <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,244,0.45)", marginBottom: 20 }}>ahora</div>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 28, fontWeight: 300, fontStyle: "italic", lineHeight: 1.3, marginBottom: 20 }}>
                "Deja de sentir que no llegas a todo."
              </p>
              <div style={{ borderTop: "1px solid rgba(250,248,244,0.15)", paddingTop: 16, marginTop: 4 }}>
                <div style={{ fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(250,248,244,0.35)", marginBottom: 8 }}>antes</div>
                <p style={{ fontSize: 12, color: "rgba(250,248,244,0.45)", textDecoration: "line-through", lineHeight: 1.6 }}>
                  "Ayudo a mujeres a organizarse mejor y a ser más productivas en su día a día."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEJA DE SENTIR */}
      <section style={{ padding: "100px 48px", background: "var(--ink)", textAlign: "center" }}>
        <LaarkLogo size={32} color="rgba(250,248,244,0.3)" />
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, fontStyle: "italic", color: "var(--cream)", margin: "24px 0 16px", lineHeight: 1.15 }}>
          Deja de sentir<br />que no llegas a todo.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(250,248,244,0.55)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.75 }}>
          Llevas tiempo sin web o con una que da vergüenza mostrar.
          Hoy puedes tener algo que te represente de verdad.
        </p>
        <Link href="/dashboard" className="btn" style={{ background: "var(--cream)", color: "var(--ink)", padding: "13px 32px", fontSize: 13 }}>
          crear mi web ahora
        </Link>
      </section>

      {/* FOTOS */}
      <section style={{ padding: "100px 48px", maxWidth: 960, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ background: "var(--warm-white)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <div style={{ textAlign: "center", padding: 32 }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 52, fontWeight: 300, color: "var(--accent-light)", marginBottom: 8 }}>◈</div>
                <div style={{ fontSize: 11, color: "var(--ink-muted)", letterSpacing: "0.08em" }}>foto de móvil · perfectamente optimizada</div>
              </div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
              sobre las imágenes
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 16, color: "var(--ink)" }}>
              ¿No tienes fotos<br />profesionales?<br />
              <em style={{ fontWeight: 300, fontStyle: "italic" }}>No pasa nada.</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.8 }}>
              Sube lo que tienes. El sistema hace el resto: las ajusta y las deja listas para que la web se vea bien.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>faqs</div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.2, color: "var(--ink)" }}>
                Te estarás<br />
                <em style={{ fontWeight: 300, fontStyle: "italic" }}>preguntando esto.</em>
              </h2>
            </div>
            <div>
              {FAQS.map((faq, i) => (
                <div
                  key={faq.q}
                  style={{ borderBottom: "1px solid var(--border)", cursor: "pointer" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                    <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontWeight: 500, color: "var(--ink)" }}>{faq.q}</div>
                    <div style={{ color: "var(--accent)", fontSize: 18, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</div>
                  </div>
                  {openFaq === i && (
                    <div style={{ paddingBottom: 20, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>{faq.r}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRECIO */}
      <section id="precio" style={{ padding: "100px 48px", textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>precio</div>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>
          y tu web está hecha.
        </h2>
        <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(72px, 12vw, 120px)", fontWeight: 300, color: "var(--ink)", lineHeight: 1, margin: "0 0 20px" }}>
          200 €
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 8 }}>pago único · sin suscripciones · sin sorpresas</p>
        <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
          Incluye el primer año de alojamiento en laark.io.<br />Después, 40€/año — o te llevas la web gratis.
        </p>
        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 13, padding: "14px 40px" }}>
          crear mi web, ahora →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--ink-muted)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LaarkLogo size={16} color="var(--ink-muted)" />
          <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 16, fontWeight: 300, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)" }}>LAARK</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>política de privacidad</a>
          <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>aviso legal</a>
          <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none", letterSpacing: "0.04em" }}>términos y condiciones</a>
        </div>
        <span>© 2026 · hola@laark.io</span>
      </footer>
    </div>
  );
}
