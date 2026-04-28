"use client";
import Link from "next/link";
import { useState } from "react";

const imgLogoHoriz    = "https://www.figma.com/api/mcp/asset/ec29164d-157c-4d29-a7e7-e15a0987d575";
const imgLogoVert     = "https://www.figma.com/api/mcp/asset/8e4a2371-3208-4048-9793-e5d6e6e2178c";
const imgHeroMain     = "https://www.figma.com/api/mcp/asset/497532e8-1b10-41d4-89be-5935ea5afcd4";
const imgHeroGrid     = "https://www.figma.com/api/mcp/asset/c4a0e133-b764-4d45-ae71-2fc045e33d53";
const imgHeroProduct  = "https://www.figma.com/api/mcp/asset/bb615139-dfa4-4ec9-9d00-fbe60b488795";
const imgHeroSmall    = "https://www.figma.com/api/mcp/asset/c6b357f1-8b20-4700-9db4-22183ad7cf1c";
const imgSkinLuminoso = "https://www.figma.com/api/mcp/asset/a3de5503-fe76-41ee-a589-488b6cddbec6";
const imgSkinFresko   = "https://www.figma.com/api/mcp/asset/30ecc5cb-e765-4bbd-9af4-10693e13b76e";
const imgSkinCalma    = "https://www.figma.com/api/mcp/asset/993dfd74-25e7-495e-a9cb-7ae7a1297b5d";
const imgStep1        = "https://www.figma.com/api/mcp/asset/7dd3e286-0cfc-48c5-818c-b54d43bd514f";
const imgStep2        = "https://www.figma.com/api/mcp/asset/7ec2ec8c-2404-4701-aeff-14c65e1423f0";
const imgStep3        = "https://www.figma.com/api/mcp/asset/bb44323e-d639-46b9-86ac-09f7eaa77585";
const imgStep4        = "https://www.figma.com/api/mcp/asset/184a10ed-3a82-4491-bcd4-3f4e30280d36";
const imgPortrait     = "https://www.figma.com/api/mcp/asset/64fd8fa9-e965-4c80-a44e-33f7e1c6c70e";
const imgPhoto        = "https://www.figma.com/api/mcp/asset/706e94e7-ada5-49c2-a4eb-cb078625d268";
const imgSunglasses   = "https://www.figma.com/api/mcp/asset/fc0d5338-fc5b-4670-a764-5aba38565845";

const FAQS = [
  { q: "¿Necesito saber de diseño o de tecnología?",    r: "No. La plataforma hace todo por ti. Tú solo respondes preguntas sobre tu negocio." },
  { q: "¿Es como una plantilla de las de siempre?",     r: "No. Una plantilla te obliga a decidir colores, fuentes y tamaños. Con Laark el diseño ya está resuelto y solo necesita tu contenido." },
  { q: "¿Cuánto tiempo tardará en estar lista mi web?", r: "Puedes tener la web lista en una tarde. La conversación lleva 20-30 minutos, elegir diseño es instantáneo." },
  { q: "¿Puedo cambiar el contenido después?",          r: "Sí, cuando quieras. El contenido es tuyo y puedes editarlo en cualquier momento desde el panel." },
  { q: "¿Qué pasa después del primer año?",             r: "Puedes renovar el alojamiento por 40€/año, o exportar tu web completa de forma gratuita y alojarla donde quieras." },
];

const STEPS = [
  { n: "1", title: "Cuéntame sobre tu negocio", desc: "Con una serie de preguntas se ordena todo el contenido. Tú no pienses en la web: solo en lo que quieres contar.", img: imgStep1 },
  { n: "2", title: "Elige tu diseño",           desc: "Nada de elegir colores, tipografías ni de mover elementos. Solo elige el modelo que más te guste.",              img: imgStep2 },
  { n: "3", title: "Sube tus fotos",            desc: "Laark las recorta, perfecciona y las encaja en su sitio. No te preocupes por nada técnico.",                     img: imgStep3 },
  { n: "4", title: "Tu web está online",        desc: "Publicas y listo. Puedes cambiar lo que quieras en cualquier momento.",                                          img: imgStep4 },
];

const SKINS = [
  { img: imgSkinLuminoso, name: "Luminoso", tag: "Magazine"    },
  { img: imgSkinFresko,   name: "Fresco",   tag: "Sofisticado" },
  { img: imgSkinCalma,    name: "Calma",    tag: "Natural"     },
];

const serif  = "var(--font-cormorant), Georgia, serif";
const sans   = "var(--font-jost), system-ui, sans-serif";
const outfit = "var(--font-outfit), system-ui, sans-serif";
const btnPeach: React.CSSProperties = {
  display: "inline-block", background: "#EBCAB8", color: "#382F29",
  padding: "17px 48px", fontSize: 13, letterSpacing: "0.22em",
  textTransform: "uppercase", textDecoration: "none", fontFamily: sans, fontWeight: 300,
  cursor: "pointer", border: "none",
};

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#FAF8F4", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(250,248,244,0.96)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid #E5DDD5", padding: "0 48px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <img src={imgLogoHoriz} alt="Laark" style={{ height: 44, opacity: 0.73, mixBlendMode: "multiply" }} />
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {(["#como-funciona|cómo funciona", "#disenos|diseños", "#precio|precio"] as const).map(s => {
            const [href, label] = s.split("|");
            return <a key={href} href={href} style={{ fontSize: 12, color: "#78716C", textDecoration: "none", letterSpacing: "0.03em", fontFamily: sans }}>{label}</a>;
          })}
          <Link href="/dashboard" style={{ fontSize: 12, color: "#78716C", textDecoration: "none", fontFamily: sans }}>entrar</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ paddingTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
        <div style={{ padding: "88px 60px 80px 56px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 17, lineHeight: 1.65, color: "#1C1917", marginBottom: 36, maxWidth: 460 }}>
            Cuentas de que va tu web, eliges un buen diseño, y tu web aparece lista.
            Sin tomar ninguna decisión de diseño, sin mover ni colocar nada.
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(40px,4.6vw,66px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "#1C1917", marginBottom: 44 }}>
            Rellenas un formulario.<br />
            Sales con un web así
          </h1>
          <div>
            <Link href="/dashboard" style={btnPeach}>crear mi web</Link>
          </div>
        </div>
        <div style={{ background: "#E9E6DF", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-48%, -50%)", width: "76%", maxWidth: 460, background: "#FAFAFA", boxShadow: "28px 4px 30px -10px rgba(0,0,0,0.17)" }}>
            <div style={{ background: "#EBE4DC", padding: "36px 28px 20px" }}>
              <p style={{ fontFamily: outfit, fontWeight: 300, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#44403C", textAlign: "center", marginBottom: 10 }}>CAMILA</p>
              <p style={{ fontFamily: serif, fontSize: 38, fontWeight: 300, textAlign: "center", letterSpacing: "0.05em", color: "#292929", marginBottom: 16 }}>Flores</p>
              <p style={{ fontSize: 10, textAlign: "center", color: "#78716C", marginBottom: 18, lineHeight: 1.5, fontFamily: sans }}>Rellenas, eliges un buen diseño,<br />y tu web aparece lista.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ background: "#EBCAB8", padding: "7px 18px", fontSize: 9, letterSpacing: "0.2em", color: "#382F29", textTransform: "uppercase", fontFamily: outfit }}>ELIGE TU RAMO</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr" }}>
              <div style={{ aspectRatio: "1/1.4", overflow: "hidden" }}>
                <img src={imgHeroMain} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
                  <img src={imgHeroGrid} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <p style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", fontFamily: outfit, fontSize: 8, letterSpacing: "0.15em", color: "white", textTransform: "uppercase", whiteSpace: "nowrap" }}>TAZAS</p>
                </div>
                <div style={{ flex: 1, background: "#D0CDC5", display: "flex", alignItems: "flex-end", padding: "0 6px 6px" }}>
                  <p style={{ fontFamily: outfit, fontSize: 8, letterSpacing: "0.15em", color: "#382F29", textTransform: "uppercase" }}>POSTERS</p>
                </div>
              </div>
              <div style={{ overflow: "hidden" }}>
                <img src={imgHeroProduct} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEJOR QUE UNA PLANTILLA */}
      <section style={{ background: "#FAF8F4", padding: "96px 48px", borderTop: "1px solid #E5DDD5" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(32px,4.6vw,60px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 36 }}>
            Mejor que una plantilla.<br />No tienes que decidir.
          </h2>
          <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 17, color: "#1C1917", lineHeight: 1.65, maxWidth: 660, margin: "0 auto" }}>
            Una plantilla te obliga a decidir colores, fuentes y tamaños, y ya sabes que cuando empiezas a tocar es cuando deja de parecerse al modelo. Con Laark no hay nada que ajustar. El diseño ya está resuelto — solo necesita tu texto y tus imágenes.
          </p>
        </div>
      </section>

      {/* MÁS SIMPLE */}
      <section id="como-funciona" style={{ background: "#E9E6DF", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, marginBottom: 64 }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(34px,4.6vw,60px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1917" }}>
              Más simple de<br />lo que parece
            </h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 17, color: "#1C1917", lineHeight: 1.65 }}>
                Cuéntalo y sube tus fotos como si hablases con alguien.
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.13)" : "none", padding: i === 0 ? "0 28px 0 0" : "0 28px" }}>
                <p style={{ fontFamily: serif, fontSize: 44, fontWeight: 400, color: "#1C1917", letterSpacing: "0.04em", marginBottom: 20 }}>{s.n}</p>
                <div style={{ width: "100%", aspectRatio: "3/4", overflow: "hidden", marginBottom: 20 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <p style={{ fontFamily: serif, fontSize: 21, fontWeight: 400, color: "#1C1917", marginBottom: 10, lineHeight: 1.2 }}>{s.title}</p>
                <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 13, color: "#44403C", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ELIGE TU DISEÑO */}
      <section id="disenos" style={{ background: "#FAF8F4", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ fontFamily: outfit, fontSize: 13, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E96B22", marginBottom: 18 }}>NUEVO</p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(30px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 22 }}>
              Elige tu diseño.<br />Cambia cuando quieras.
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 15, color: "#1C1917", lineHeight: 1.65 }}>
              Tienes varios diseños para elegir. Tu contenido encaja en cualquiera sin que tengas que tocar nada. Como cambiar de vestido.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {SKINS.map(sk => (
              <div key={sk.name} style={{ background: "#FFFBF4", boxShadow: "0 6px 20px rgba(0,0,0,0.09)", overflow: "hidden" }}>
                <div style={{ aspectRatio: "2/3", overflow: "hidden" }}>
                  <img src={sk.img} alt={sk.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <div style={{ padding: "14px 16px 18px" }}>
                  <p style={{ fontFamily: serif, fontSize: 24, fontWeight: 400, color: "#1C1917", marginBottom: 4 }}>{sk.name}</p>
                  <p style={{ fontFamily: outfit, fontWeight: 300, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#78716C" }}>{sk.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEJORES TEXTOS */}
      <section style={{ background: "#FAF8F4", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
              <img src={imgPortrait} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "12%", left: "50%", transform: "translateX(-50%)", background: "#FFFBF4", boxShadow: "0 8px 28px rgba(0,0,0,0.11)", padding: "22px 28px", width: "68%", textAlign: "center" }}>
              <p style={{ fontFamily: outfit, fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E47E42", marginBottom: 10 }}>AHORA</p>
              <p style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, fontStyle: "italic", color: "#393939", lineHeight: 1.25, marginBottom: 16 }}>
                Deja de sentir que no llegas a todo.
              </p>
              <div style={{ borderTop: "1px solid #E5DDD5", paddingTop: 12 }}>
                <p style={{ fontFamily: outfit, fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "#E47E42", marginBottom: 6, opacity: 0.65 }}>ANTES</p>
                <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 11, color: "#78716C", textDecoration: "line-through", fontStyle: "italic" }}>Ayudo a mujeres a organizarse mejor</p>
              </div>
            </div>
          </div>
          <div style={{ paddingLeft: 12 }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(34px,4vw,54px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 26 }}>Mejores textos</h2>
            <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 16, color: "#1C1917", lineHeight: 1.65 }}>
              No tienes que saber escribir una web. Tú cuentas lo tuyo, y el sistema lo convierte en un mensaje claro y bien enfocado.
            </p>
          </div>
        </div>
      </section>

      {/* NO TIENES FOTOS */}
      <section style={{ background: "#FAF8F4", padding: "0 56px 90px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative", minHeight: 480 }}>
            <div style={{ width: "65%", aspectRatio: "2/3", overflow: "hidden" }}>
              <img src={imgPhoto} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 290, overflow: "hidden", transform: "rotate(10deg)" }}>
              <img src={imgSunglasses} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px,3.8vw,50px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 22 }}>
              ¿No tienes fotos<br />profesionales?<br />No pasa nada
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 16, color: "#1C1917", lineHeight: 1.65 }}>
              Subes tus fotos y el sistema hace el resto. Las ajusta y las deja listas para que la web se vea bien.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#FBF8F3", padding: "90px 56px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div style={{ position: "sticky", top: 80 }}>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(30px,4vw,50px)", fontWeight: 400, lineHeight: 1.12, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 20 }}>
              Te estarás<br />preguntando esto:
            </h2>
            <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 15, color: "#44403C", lineHeight: 1.7 }}>
              Si te queda alguna después, escríbenos,<br />respondemos en menos de un día.
            </p>
          </div>
          <div>
            {FAQS.map((faq, i) => (
              <div key={faq.q} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)", cursor: "pointer" }}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <p style={{ fontFamily: serif, fontSize: 20, fontStyle: "italic", fontWeight: 400, color: "#1C1917" }}>{faq.q}</p>
                  <span style={{ color: "#1C1917", fontSize: 22, flexShrink: 0, lineHeight: 1, display: "inline-block", transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </div>
                {openFaq === i && (
                  <p style={{ paddingBottom: 20, fontFamily: sans, fontWeight: 300, fontSize: 14, color: "#44403C", lineHeight: 1.7 }}>{faq.r}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIO */}
      <section id="precio" style={{ background: "#FBF8F3", padding: "100px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: outfit, fontWeight: 300, fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: "#FF853E", marginBottom: 16 }}>PRECIO ÚNICO</p>
        <p style={{ fontFamily: serif, fontSize: "clamp(68px,11vw,118px)", fontWeight: 400, lineHeight: 1, color: "#1C1917", marginBottom: 8 }}>200 €</p>
        <p style={{ fontFamily: serif, fontSize: "clamp(30px,4.5vw,56px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.01em", color: "#1C1917", marginBottom: 40 }}>
          y tu web está hecha
        </p>
        <p style={{ fontFamily: sans, fontWeight: 300, fontSize: 16, color: "#1C1917", lineHeight: 1.65, maxWidth: 580, margin: "0 auto 48px" }}>
          Incluye el primer año funcionando en <em>tunegocio.laark.io</em>. Puedes usar tu propio dominio cuando quieras. Después decides: la mantienes aquí por una pequeña cuota anual (40€) o la pasas a tu propio hosting.
        </p>
        <Link href="/dashboard" style={btnPeach}>crear mi web, ahora</Link>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#FAF8F4", padding: "52px 48px 32px", borderTop: "1px solid #E5DDD5" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img src={imgLogoVert} alt="Laark" style={{ height: 80, opacity: 0.8, mixBlendMode: "multiply" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 28, marginBottom: 14 }}>
          {["Política de Privacidad", "Política de Cookies", "Aviso Legal", "Términos y Condiciones"].map(l => (
            <a key={l} href="#" style={{ fontFamily: outfit, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "#1C1917", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <p style={{ textAlign: "center", fontFamily: sans, fontWeight: 300, fontSize: 13, color: "#78716C" }}>
          © Laark. 2026. todos los derechos reservados.
        </p>
      </footer>

    </div>
  );
}
