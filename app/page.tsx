import Link from "next/link";

const faqs = [
  {
    question: "¿Necesito saber de diseño o de tecnología?",
    answer: "Para nada. Tú solo rellenas y eliges. El diseño ya está hecho y la tecnología es invisible.",
  },
  {
    question: "¿Es como una plantilla de las de siempre?",
    answer: "No. En las plantillas normales tú tienes que tomar decisiones de diseño — tipografías, colores, proporciones — y siempre queda peor que el modelo. Aquí no tocas nada de eso. Tu contenido aparece dentro de un diseño cerrado con criterio profesional.",
  },
  {
    question: "¿Puedo tener tienda online?",
    answer: "En esta versión no. Laark está pensado para servicios y productos digitales, no para e-commerce.",
  },
  {
    question: "¿Puedo añadir un blog?",
    answer: "Próximamente. No está en la versión inicial pero sí está en el roadmap.",
  },
  {
    question: "¿Qué pasa si no me gustan los diseños disponibles?",
    answer: "Los diseños crecen con el tiempo. Elena añade nuevos cada temporada y te aparecen automáticamente. Puedes cambiar cuando quieras sin perder tu contenido.",
  },
  {
    question: "¿Puedo usar mi propio dominio?",
    answer: "Sí. Tu web nace en tunegocio.laark.io y si quieres tu propio .com hay un tutorial de 10 minutos para conectarlo.",
  },
  {
    question: "¿Qué incluye la web base?",
    answer: "Home, Sobre mí, una página de servicio y Contacto. Todo lo necesario para empezar con presencia profesional.",
  },
  {
    question: "¿Puedo añadir más páginas de servicio?",
    answer: "Sí, como extra de pago en versiones futuras.",
  },
  {
    question: "¿Los textos los escribe la IA o los escribo yo?",
    answer: "Los dos. Tú aportas la información sobre tu negocio en una conversación natural. La IA la transforma en copy estratégico: titulares, beneficios, frases que conectan. Tú puedes revisarlo y ajustarlo.",
  },
  {
    question: "¿Y las fotos?",
    answer: "Las subes tú y las asignas a cada sección. La IA las recorta y ajusta automáticamente a las proporciones correctas del diseño.",
  },
  {
    question: "¿Qué pasa si necesito hacer cambios después?",
    answer: "Entras, modificas el campo que quieras y la web se actualiza sola. Sin depender de nadie.",
  },
  {
    question: "¿Es una suscripción mensual?",
    answer: "No. 200 euros una sola vez. Acceso de por vida, sin sorpresas.",
  },
];

const steps = [
  {
    n: "1",
    img: "/assets/step-1.png",
    title: "Cuéntame sobre tu negocio",
    text: "Con una serie de preguntas se ordena todo el contenido. Tú no pienses en la web: solo en lo que quieres contar.",
  },
  {
    n: "2",
    img: "/assets/step-2.png",
    title: "Elige tu diseño",
    text: "Nada de elegir colores, tipografías ni de mover elementos. Solo eliges el modelo que más te guste.",
  },
  {
    n: "3",
    img: "/assets/step-3.png",
    title: "Sube tus fotos",
    text: "Laark las recorta, perfecciona y las encaja en su sitio. No te preocupes por nada técnico.",
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
          <img className="logo-h" src="/assets/LAARK logo horiz.png" alt="LAARK" />
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
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details className="faq-item" key={faq.question} open={index === 0}>
                <summary>
                  <span>{faq.question}</span>
                  <span className="faq-toggle" aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
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
        <img className="footer-logo" src="/assets/LAARK logo vert.png" alt="LAARK" />
        <div className="footer-links">Política de privacidad · Aviso legal · Cookies · Términos y condiciones</div>
      </footer>


    </main>
  );
}
