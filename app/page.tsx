import Link from "next/link";

const faqs = [
  "¿Necesito saber de diseño o de tecnología?",
  "¿Es como una plantilla de las de siempre?",
  "¿Cuánto tiempo tardará en estar lista mi web?",
  "¿Puedo cambiar el contenido después?",
  "¿Qué pasa después del primer año?",
  "¿Puedo usar mi propio dominio?",
];

const steps = [
  {
    n: "1",
    img: "/assets/step-1.png",
    title: "Cuéntame sobre tu negocio",
    text: "Con una serie de preguntas sencillas sabemos qué necesitas. Tú no piensas en la web: solo en lo que quieres contar.",
  },
  {
    n: "2",
    img: "/assets/step-2.png",
    title: "Elige tu diseño",
    text: "Nada de elegir colores, tipografías ni tocar nada. Solo eliges el modelo que más te guste.",
  },
  {
    n: "3",
    img: "/assets/step-3.png",
    title: "Sube tus fotos",
    text: "Laark las recorta, perfecciona y las organiza en la web. No te preocupas por nada técnico.",
  },
  {
    n: "4",
    img: "/assets/step-4.png",
    title: "Tu web está online",
    text: "Publicas y listo. Puedes cambiar lo que quieras en cualquier momento.",
  },
];

const skins = [
  { img: "/assets/skin-luminoso.png", name: "Luminoso", tag: "Magazine", badge: true },
  { img: "/assets/skin-fresco.png", name: "Fresco", tag: "Boutique" },
  { img: "/assets/skin-calma.png", name: "Calma", tag: "Natural" },
];

export default function Landing() {
  return (
    <main className="laark-page">
      <header className="site-header">
        <div className="header-inner">
          <img className="logo-h" src="/assets/logo-horizontal.png" alt="LAARK" />
          <nav className="top-nav" aria-label="Navegación principal">
            <a href="#como-funciona">cómo funciona</a>
            <a href="#disenos">diseños</a>
            <a href="#precio">precio</a>
            <Link href="/dashboard">entrar</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <h1>Rellenas un formulario.<br />Sales con un web así</h1>
            <p>Cuentas de qué va tu web, eliges un buen diseño, y tu web aparece lista. Sin tomar ninguna decisión de diseño, sin mover ni colocar nada.</p>
            <Link className="btn" href="/dashboard">Crear mi web</Link>
          </div>
          <img className="hero-mockup" src="/assets/hero-mockup.png" alt="Ejemplo de diseño web LAARK" />
        </div>
      </section>

      <section className="intro">
        <h2>Mejor que una plantilla. No tienes que decidir:</h2>
        <p>Una plantilla te obliga a decidir, fuentes y tamaños y colores y cosas que cuando empiezas a tocar es cuando deja de parecerse al modelo. Con Laark no hay nada que ajustar. El diseño ya está resuelto: solo necesita tu texto y tus imágenes.</p>
      </section>

      <section className="steps" id="como-funciona">
        <div className="steps-top">
          <h2>Más simple de lo que parece</h2>
          <p className="steps-lead">Cuéntalo y sube tus fotos como si hablases con alguien.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step) => (
            <article className="step" key={step.n}>
              <div className="step-num">{step.n}</div>
              <img src={step.img} alt="" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="designs" id="disenos">
        <div className="designs-inner">
          <div className="designs-copy">
            <h2>Elige tu diseño.<br />Cambia cuando quieras.</h2>
            <p>Tienes varios diseños para elegir. Tu contenido encaja en cualquiera sin que tengas que tocar nada. Como cambiar de vestido.</p>
          </div>
          <div className="cards">
            {skins.map((skin) => (
              <article className="skin-card" key={skin.name}>
                {skin.badge && <div className="badge">Nuevo<span>✦</span></div>}
                <img src={skin.img} alt={`Diseño ${skin.name}`} />
                <h3>{skin.name}</h3>
                <small>{skin.tag}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="copy-section">
        <div className="copy-grid">
          <div>
            <h2>Mejores textos</h2>
            <p>No tienes que saber escribir una web. Tú cuentas lo tuyo, y el sistema lo convierte en un mensaje claro y bien enfocado.</p>
          </div>
          <img className="ticket" src="/assets/copy-ticket.png" alt="Antes y ahora de texto web" />
        </div>

        <div className="glasses-grid">
          <div className="glasses-wrap">
            <img className="glasses-main" src="/assets/glasses-main.png" alt="Gafas fotografiadas para una web" />
            <img className="polaroid" src="/assets/glasses-polaroid.png" alt="Foto original de producto" />
          </div>
          <div className="glasses-copy">
            <h2>¿No tienes fotos profesionales?<br />No pasa nada</h2>
            <p>Subes tus fotos y el sistema hace el resto. Las ajusta y las deja listas para que la web se vea bien.</p>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="faq-inner">
          <div>
            <h2>Te estarás preguntando esto:</h2>
            <p className="faq-note">Si te queda alguna después, escríbenos, respondemos en menos de un día.</p>
          </div>
          <div className="faq-cols">
            <div>
              {faqs.slice(0, 3).map((faq) => <div className="q" key={faq}><span>{faq}</span><span>+</span></div>)}
            </div>
            <div>
              {faqs.slice(3).map((faq) => <div className="q" key={faq}><span>{faq}</span><span>+</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="price" id="precio">
        <div className="overline">Precio único</div>
        <h2><strong>200 €</strong>y tu web está hecha</h2>
        <p>Incluye el primer año funcionando en nuestro hosting. Puedes usar tu propio dominio cuando quieras. Después decides: la mantienes aquí por una pequeña cuota anual de 40 € o la pasas a tu propio hosting.</p>
        <Link className="btn" href="/dashboard">Crear mi web, ahora</Link>
      </section>

      <footer className="site-footer">
        <img className="footer-logo" src="/assets/logo-vertical.png" alt="LAARK" />
        <div className="footer-links">Política de privacidad · Aviso legal · Cookies · Términos y condiciones</div>
      </footer>

      <style>{`
        .laark-page{
          --bg:#fbfaf7;
          --paper:#f4f0ea;
          --paper-2:#ebe5dc;
          --ink:#171514;
          --muted:#625d58;
          --line:#d9d1c7;
          --peach:#f3cdbd;
          --accent:#e67f4f;
          --serif: Didot, "Bodoni 72", "Bodoni 72 Smallcaps", "Bodoni MT", "Times New Roman", serif;
          --sans: var(--font-jost), Jost, "Avenir Next", Montserrat, Arial, sans-serif;
          --max:1180px;
          margin:0;
          background:var(--bg);
          color:var(--ink);
          font-family:var(--sans);
          font-weight:300;
          line-height:1.45;
          overflow-x:hidden;
        }
        .laark-page *{box-sizing:border-box}
        .laark-page img{max-width:100%;display:block}
        .laark-page a{text-decoration:none;color:inherit}
        .site-header{height:122px;display:flex;align-items:center;border-bottom:1px solid var(--line);background:#fff}
        .header-inner{width:min(var(--max),calc(100% - 80px));margin:auto;display:flex;align-items:center;justify-content:space-between;gap:32px}
        .logo-h{width:210px;height:auto}
        .top-nav{display:flex;align-items:center;gap:28px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7c736c}
        .hero{background:linear-gradient(90deg,var(--paper-2) 0 44%,#f8f7f4 44% 100%);min-height:420px;position:relative;overflow:visible}
        .hero-inner{width:min(var(--max),calc(100% - 80px));margin:auto;display:grid;grid-template-columns:39% 61%;align-items:center;min-height:420px;position:relative}
        h1,h2,h3{font-family:var(--serif);font-weight:400;line-height:.96;letter-spacing:-.04em;margin:0}
        .hero h1{font-size:46px;max-width:420px;margin-bottom:22px}
        .hero p{font-size:16px;max-width:430px;margin:0 0 26px;color:#2d2926}
        .btn{display:inline-block;background:var(--peach);font-family:var(--sans);font-size:12px;letter-spacing:.28em;text-transform:uppercase;padding:14px 25px;color:#6c4b42}
        .hero-mockup{width:650px;justify-self:end;filter:drop-shadow(0 18px 22px rgba(0,0,0,.16));transform:translateY(24px)}
        .intro{text-align:center;background:#fff;padding:88px 20px 94px}
        .intro h2{font-size:42px;margin-bottom:20px;letter-spacing:-.035em}
        .intro p{font-size:15px;max-width:650px;margin:0 auto;color:#2d2926;line-height:1.65}
        .steps{background:var(--paper);padding:70px 0 90px}
        .steps-top{width:min(var(--max),calc(100% - 80px));margin:0 auto 52px;display:grid;grid-template-columns:33% 1fr;gap:60px;align-items:start}
        .steps h2{font-size:40px;max-width:280px}
        .steps-lead{font-size:18px;color:#2b2724;max-width:470px;margin-top:8px}
        .steps-grid{width:min(var(--max),calc(100% - 80px));margin:auto;display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-left:1px solid var(--line)}
        .step{min-height:270px;padding:0 28px 0;border-right:1px solid var(--line)}
        .step-num{font-family:var(--serif);font-size:42px;line-height:1;margin-bottom:18px}
        .step img{height:118px;object-fit:contain;margin:0 0 26px 0}
        .step h3{font-family:var(--serif);font-size:20px;letter-spacing:-.02em;margin-bottom:10px;line-height:1.05}
        .step p{font-size:12.5px;color:#3b3632;margin:0;line-height:1.45}
        .designs{background:#fff;padding:80px 0 92px}
        .designs-inner{width:min(980px,calc(100% - 80px));margin:auto;display:grid;grid-template-columns:28% 72%;gap:52px;align-items:center}
        .designs h2{font-size:44px;margin-bottom:24px}
        .designs p{font-size:14px;color:#3d3834;max-width:290px}
        .cards{display:flex;gap:28px;align-items:flex-start}
        .skin-card{width:175px;background:#fff;box-shadow:0 14px 22px rgba(40,30,25,.16);padding-bottom:16px;position:relative}
        .skin-card img{width:100%;height:210px;object-fit:cover}
        .skin-card h3{font-family:var(--serif);font-size:25px;font-weight:400;line-height:.96;margin:14px 14px 2px;letter-spacing:-.04em}
        .skin-card small{font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:#8f7e72;margin-left:15px}
        .badge{position:absolute;top:-31px;left:50%;transform:translateX(-50%);font-size:9px;letter-spacing:.24em;color:var(--accent);text-transform:uppercase;text-align:center}
        .badge span{display:block;background:var(--accent);color:#fff;width:28px;height:28px;border-radius:50%;line-height:28px;margin:4px auto 0;font-size:14px;letter-spacing:0}
        .copy-section{background:#fff;padding:40px 0 110px}
        .copy-grid{width:min(860px,calc(100% - 80px));margin:auto;display:grid;grid-template-columns:1fr 1.15fr;gap:65px;align-items:center}
        .copy-section h2{font-size:40px;margin-bottom:30px}
        .copy-section p{font-size:14px;color:#3c3733;max-width:280px}
        .ticket{box-shadow:0 14px 20px rgba(0,0,0,.18)}
        .glasses-grid{width:min(800px,calc(100% - 80px));margin:20px auto 0;display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
        .glasses-wrap{position:relative;min-height:360px}
        .glasses-main{width:430px;box-shadow:0 10px 20px rgba(0,0,0,.08)}
        .polaroid{position:absolute;width:210px;right:-26px;bottom:-28px;transform:rotate(6deg)}
        .glasses-copy h2{font-size:43px;margin-bottom:24px}
        .glasses-copy p{font-size:14px;color:#3b3632;max-width:320px}
        .faq{background:var(--paper);padding:92px 0 100px}
        .faq-inner{width:min(980px,calc(100% - 80px));margin:auto;display:grid;grid-template-columns:32% 1fr;gap:80px}
        .faq h2{font-size:40px}
        .faq-note{font-size:14px;margin-top:8px;color:#3b3632}
        .faq-cols{display:grid;grid-template-columns:1fr 1fr;gap:48px}
        .q{border-bottom:1px solid #bdb5aa;padding:12px 0;font-family:var(--serif);font-style:italic;font-size:16px;display:flex;justify-content:space-between;gap:20px}
        .q span:last-child{font-family:var(--sans);font-style:normal;color:#7d756e}
        .price{background:#fff;text-align:center;padding:76px 20px 80px}
        .overline{font-size:10px;letter-spacing:.36em;text-transform:uppercase;color:var(--accent);margin-bottom:12px}
        .price h2{font-size:42px;line-height:1.08;margin-bottom:18px}
        .price h2 strong{display:block;font-family:var(--serif);font-weight:400;font-size:45px;margin-bottom:4px}
        .price p{font-size:13px;color:#3a3531;margin:0 auto 30px;max-width:470px;line-height:1.6}
        .site-footer{background:var(--paper);text-align:center;padding:55px 20px 45px}
        .footer-logo{width:150px;margin:0 auto 26px}
        .footer-links{font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:#605852}
        @media (max-width:900px){
          .header-inner,.hero-inner,.steps-top,.steps-grid,.designs-inner,.copy-grid,.glasses-grid,.faq-inner{width:calc(100% - 36px)}
          .top-nav{display:none}
          .hero{background:var(--paper-2)}
          .hero-inner,.steps-top,.designs-inner,.copy-grid,.glasses-grid,.faq-inner{grid-template-columns:1fr}
          .hero-inner{padding:46px 0;gap:35px}
          .hero-mockup{width:100%;transform:none;justify-self:center}
          .hero h1,.intro h2,.steps h2,.designs h2,.copy-section h2,.glasses-copy h2,.faq h2{font-size:34px}
          .steps-grid{grid-template-columns:1fr 1fr;border-left:0;gap:36px}
          .step{border-right:0;border-left:1px solid var(--line);padding-left:22px}
          .cards{overflow-x:auto;padding:36px 0 20px}
          .skin-card{min-width:165px}
          .faq-cols{grid-template-columns:1fr}
        }
        @media (max-width:560px){
          .site-header{height:88px}.logo-h{width:170px}
          .hero h1{font-size:36px}
          .steps-grid{grid-template-columns:1fr}
          .glasses-wrap{min-height:auto}.polaroid{position:relative;right:auto;bottom:auto;width:170px;margin:-25px 0 0 auto}
        }
      `}</style>
    </main>
  );
}
