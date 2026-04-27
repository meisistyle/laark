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
  { n: "01", title: "Cuéntale a la IA todo sobre tu negocio", desc: "Sin formularios fríos. Una conversación que extrae exactamente lo que tu web necesita — beneficios, servicios, lo que te hace diferente." },
  { n: "02", title: "Elige tu diseño", desc: "Tres estilos diseñados con criterio. Tu contenido aparece dentro de cada uno para que veas cómo queda antes de elegir." },
  { n: "03", title: "Sube tus fotos", desc: "Las asignas a cada sección. La plataforma las recorta y ajusta automáticamente para que queden perfectas en el diseño." },
  { n: "04", title: "Tu web está online", desc: "En laark.io con tu nombre. Si quieres tu propio .com, un tutorial de 10 minutos te lo explica todo." },
];

const SKINS = [
  { name: "Luminous", desc: "Cálido, editorial, orgánico", bg: "linear-gradient(160deg, #F0EBE3 0%, #D4C5B5 100%)", color: "#4A3728" },
  { name: "Fresco", desc: "Limpio, fresco, profesional", bg: "linear-gradient(160deg, #E8EDF0 0%, #B5C9D4 100%)", color: "#2B3E4A" },
  { name: "Calma", desc: "Neutro, elegante, atemporal", bg: "linear-gradient(160deg, #F0EDE8 0%, #C9C4B4 100%)", color: "#3A3528" },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ background: "var(--cream)" }}>
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "var(--cream)", borderBottom: "1px solid var(--border)",
        padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Laark
        </span>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          <a href="#como-funciona" style={{ fontSize: 13, color: "var(--ink-muted)", textDecoration: "none" }}>cómo funciona</a>
          <a href="#disenos" style={{ fontSize: 13, color: "var(--ink-muted)", textDecoration: "none" }}>diseños</a>
          <a href="#precio" style={{ fontSize: 13, color: "var(--ink-muted)", textDecoration: "none" }}>precio</a>
          <Link href="/dashboard" style={{ fontSize: 13, color: "var(--ink-muted)", textDecoration: "none" }}>entrar</Link>
          <Link href="/dashboard" className="btn btn-primary" style={{ padding: "8px 20px" }}>empezar</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 160, paddingBottom: 100, paddingLeft: 48, paddingRight: 48, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24 }}>
          tu web. sin complicaciones.
        </div>
        <h1 style={{
          fontFamily: "var(--font-cormorant)", fontSize: "clamp(48px, 7vw, 88px)",
          fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.01em",
          color: "var(--ink)", marginBottom: 28, maxWidth: 800,
        }}>
          Rellenas un formulario.<br />
          <em style={{ fontStyle: "italic", color: "var(--accent)" }}>Sales con una web así.</em>
        </h1>
        <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 520, marginBottom: 40, lineHeight: 1.7 }}>
          Cuéntale a la IA sobre tu negocio. Elige un diseño con criterio de diseñadora.
          Tu web aparece lista — sin tocar tipografías, sin pelearte con plantillas.
        </p>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link href="/dashboard" className="btn btn-primary">crear mi web</Link>
          <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>
            <strong style={{ color: "var(--ink)" }}>200€</strong> — pago único, para siempre
          </span>
        </div>
      </section>

      {/* MEJOR QUE UNA PLANTILLA */}
      <section style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
              el criterio que marca la diferencia
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, fontWeight: 300, lineHeight: 1.2, marginBottom: 20, color: "var(--ink)" }}>
              Mejor que una plantilla.<br />
              <em style={{ fontStyle: "italic" }}>No tienes que decidir.</em>
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.8 }}>
              Una plantilla te deja ante un lienzo en blanco — tipografías, colores, estructura.
              Siempre queda peor que el modelo. Laark te da el criterio estratégico de Elena
              convertido en un sistema: tú pones el contenido, el diseño lo pone ella.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["Sin decidir tipografías", "El diseño está cerrado. Solo cambia el contenido."],
              ["Sin pelearte con el layout", "Las secciones, el orden y el espacio ya están pensados."],
              ["Sin copiar y pegar mal", "La IA extrae y transforma tu contenido en copy estratégico."],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--success-light)", border: "1px solid #A8D5B5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 12, color: "var(--success)", marginTop: 2 }}>✓</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 2 }}>{title}</div>
                  <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ padding: "100px 48px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
          el proceso
        </div>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, fontWeight: 300, marginBottom: 60, color: "var(--ink)" }}>
          Más simple de lo que parece.
        </h2>
        <div>
          {STEPS.map((s, i) => (
            <div key={s.n} style={{
              display: "grid", gridTemplateColumns: "60px 1fr", gap: 24,
              padding: "32px 0", borderBottom: i < STEPS.length - 1 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, color: "var(--accent)", lineHeight: 1, paddingTop: 4 }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 6, color: "var(--ink)" }}>{s.title}</div>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DISEÑOS */}
      <section id="disenos" style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, fontWeight: 300, textAlign: "center", marginBottom: 12, color: "var(--ink)" }}>
          Elige tu diseño.
        </h2>
        <p style={{ textAlign: "center", fontSize: 15, color: "var(--ink-muted)", marginBottom: 48 }}>
          Cambia cuando quieras — tu contenido se mantiene
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 900, margin: "0 auto" }}>
          {SKINS.map((sk) => (
            <div key={sk.name} style={{
              border: "1px solid var(--border)", borderRadius: "var(--radius-md)",
              overflow: "hidden", background: "white", cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
            >
              <div style={{ height: 180, background: sk.bg, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 20 }}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, fontWeight: 300, color: sk.color }}>{sk.name}</span>
              </div>
              <div style={{ padding: "16px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>{sk.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{sk.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          + nuevos diseños cada temporada
        </p>
      </section>

      {/* MEJORES TEXTOS */}
      <section style={{ padding: "100px 48px", maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            copy estratégico
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, fontWeight: 300, lineHeight: 1.2, marginBottom: 20, color: "var(--ink)" }}>
            Mejores textos<br />
            <em style={{ fontStyle: "italic" }}>de los que escribirías tú.</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.8 }}>
            La IA no copia lo que dices — lo transforma. Tu "ayudo a mujeres a organizarse mejor"
            se convierte en "Tu agenda deja de mandarte. Tú decides qué importa."
            El criterio de Elena, aplicado a cada frase de tu web.
          </p>
        </div>
        <div style={{ background: "var(--warm-white)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 16 }}>antes → después</div>
          {[
            ["ayudo a mujeres a organizarse mejor", "Tu agenda deja de mandarte. Tú decides qué importa."],
            ["soy nutricionista con 10 años de experiencia", "10 años viendo qué funciona de verdad. Sin dietas de castigo."],
            ["ofrezco sesiones de coaching personalizadas", "El plan que nadie te dio para llegar a donde quieres llegar."],
          ].map(([before, after]) => (
            <div key={before} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontSize: 12, color: "var(--ink-muted)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ textDecoration: "line-through" }}>{before}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", display: "flex", alignItems: "flex-start", gap: 8 }}>
                <span style={{ color: "var(--success)", flexShrink: 0 }}>→</span>
                <em style={{ fontFamily: "var(--font-cormorant)", fontSize: 16, fontStyle: "italic", fontWeight: 400 }}>{after}</em>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEJA DE SENTIR */}
      <section style={{ padding: "100px 48px", background: "var(--ink)", textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, fontStyle: "italic", color: "var(--cream)", marginBottom: 20, lineHeight: 1.2 }}>
          Deja de sentir<br />que no llegas a todo.
        </h2>
        <p style={{ fontSize: 16, color: "rgba(250,248,244,0.65)", maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.7 }}>
          Llevas tiempo sin web o con una que da vergüenza mostrar.
          Hoy puedes tener algo que te represente de verdad.
        </p>
        <Link href="/dashboard" className="btn" style={{ background: "var(--cream)", color: "var(--ink)" }}>
          crear mi web ahora
        </Link>
      </section>

      {/* FOTOS */}
      <section style={{ padding: "100px 48px", maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div style={{ background: "var(--accent-pale)", border: "1px solid var(--accent-light)", borderRadius: "var(--radius-md)", padding: 32, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 48, fontWeight: 300, color: "var(--accent)", marginBottom: 8 }}>📷</div>
          <div style={{ fontSize: 14, color: "var(--ink-muted)" }}>foto de móvil · perfectamente optimizada</div>
        </div>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            sobre las imágenes
          </div>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, lineHeight: 1.2, marginBottom: 16, color: "var(--ink)" }}>
            ¿No tienes fotos<br />profesionales?<br />
            <em style={{ fontStyle: "italic" }}>No pasa nada.</em>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.8 }}>
            Laark optimiza lo que tienes y lo hace funcionar dentro del diseño.
            Una foto bien recortada y bien colocada da mejores resultados
            que una foto de estudio mal usada.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: "80px 48px", background: "var(--warm-white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, fontWeight: 300, marginBottom: 48, color: "var(--ink)", textAlign: "center" }}>
            Te estarás preguntando esto.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 48px" }}>
            {FAQS.map((faq) => (
              <div key={faq.q} style={{ paddingBottom: 28, marginBottom: 28, borderBottom: "1px solid var(--border)" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)", marginBottom: 8 }}>{faq.q}</div>
                <div style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.7 }}>{faq.r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO */}
      <section id="precio" style={{ padding: "100px 48px", background: "var(--warm-white)", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
          precio
        </div>
        <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: 52, fontWeight: 300, color: "var(--ink)", marginBottom: 8 }}>
          200€ y tu web está hecha.
        </h2>
        <div style={{ fontFamily: "var(--font-cormorant)", fontSize: 96, fontWeight: 300, color: "var(--ink)", lineHeight: 1, margin: "16px 0" }}>
          200€
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-muted)", marginBottom: 12 }}>
          pago único · sin suscripciones · sin sorpresas
        </p>
        <p style={{ fontSize: 13, color: "var(--ink-muted)", marginBottom: 36, maxWidth: 400, margin: "0 auto 36px" }}>
          Incluye el primer año de alojamiento en laark.io. Después, 40€/año — o te llevas la web gratis.
        </p>
        <Link href="/dashboard" className="btn btn-primary" style={{ fontSize: 14, padding: "14px 36px" }}>
          crear mi web ahora →
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 48px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "var(--ink-muted)" }}>
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: 18, fontWeight: 300, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)" }}>Laark</span>
        <span>por Elena · meisi.es</span>
        <span>© 2026 · hola@laark.io</span>
      </footer>
    </div>
  );
}
