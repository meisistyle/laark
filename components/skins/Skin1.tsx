"use client";
import './skin1.css';

import { WebSlots } from "@/lib/slots";

type PageKind = "home" | "about" | "sessions";

interface Props {
  slots: WebSlots;
  mobile?: boolean;
  page?: PageKind;
  editMode?: boolean;
  onImageClick?: (imageKey: string) => void;
  imageOverrides?: Record<string, string>;
}

interface EditImgProps {
  src: string;
  alt: string;
  imgKey: string;
  className?: string;
  editMode?: boolean;
  overrides?: Record<string, string>;
  onImageClick?: (key: string) => void;
}

function EditImg({ src, alt, imgKey, className, editMode, overrides, onImageClick }: EditImgProps) {
  const resolved = overrides?.[imgKey] || src;
  if (!editMode) return <img src={resolved} alt={alt} className={className} />;
  return (
    <div className="skin1-img-wrap" onClick={() => onImageClick?.(imgKey)}>
      <img src={resolved} alt={alt} className={className} />
      <div className="skin1-img-overlay" aria-label="Cambiar foto">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="17 8 12 3 7 8"/>
          <line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
    </div>
  );
}

function pick(value: string | undefined, fallback: string) {
  return value?.trim() || fallback;
}

function brandName(slots: WebSlots) {
  return pick(slots.negocio_nombre, "Silvia Lebrero");
}

function sector(slots: WebSlots) {
  return pick(slots.negocio_sector, "Photography");
}

function Header({ slots }: { slots: WebSlots }) {
  return (
    <nav className="s1-nav">
      <span className="s1-nav-logo">
        {brandName(slots)} <span>{sector(slots)}</span>
      </span>
      <ul className="s1-nav-links">
        <li>Servicios</li>
        <li>Sobre mí</li>
        <li>Galerías</li>
        <li>Contacto</li>
      </ul>
    </nav>
  );
}

function Footer({ slots }: { slots: WebSlots }) {
  return (
    <footer className="s1-footer">
      <div className="s1-footer-logo">
        {brandName(slots)}
        <span>{sector(slots)}</span>
      </div>
      <div className="s1-footer-copy">© 2025 {brandName(slots)}</div>
      <div className="s1-footer-legal">
        <span>Términos y condiciones</span>
        <span>Política de privacidad</span>
      </div>
    </footer>
  );
}

type EditProps = {
  editMode?: boolean;
  overrides?: Record<string, string>;
  onImageClick?: (key: string) => void;
};

function res(overrides: Record<string, string> | undefined, key: string, def: string) {
  return overrides?.[key] || def;
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
function HomePage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  return (
    <>
      <Header slots={slots} />

      {/* HERO */}
      <div className="s1-hero">
        <img
          className="s1-hero-img"
          src={res(overrides, 'home_hero', '/assets/skin1/laark_sk15.jpg')}
          alt="Familia feliz"
        />
        <div className="s1-hero-overlay" />
        <div className="s1-hero-text">
          <p>{pick(slots.negocio_sector, "Fotografía de familia en Barcelona y alrededores")}</p>
          <h1>{pick(slots.home_hero_titular, "Capturando momentos únicos y llenos de emoción")}</h1>
        </div>
      </div>

      {/* DEFINICIÓN */}
      <section className="s1-definicion s1-section">
        <div className="s1-inner">
          <h2>{pick(slots.home_problema_texto, "Fotografía de familia con alma, para los momentos que merecen quedarse para siempre")}</h2>
          <p>{pick(slots.home_solucion_texto, "Capturo lo que de verdad importa — la mirada, el abrazo, la risa sin avisar. Sesiones en exteriores con luz natural, para familias que quieren conservar sus momentos más especiales.")}</p>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="s1-problema">
        <div className="s1-problema-text">
          <h2>{pick(slots.servicio_subtitulo, "El tiempo pasa más rápido de lo que parece.")}</h2>
          <p>{pick(slots.servicio_para_quien, "Los niños crecen, las etapas cambian, y los momentos cotidianos que hoy te parecen normales son los que más vas a querer recordar.")}</p>
          <p>Cada historia merece ser contada con luz, sensibilidad y elegancia.</p>
        </div>
        <EditImg
          src="/assets/skin1/laark_sk14.jpg"
          alt="Madre e hijo"
          imgKey="home_reason"
          className="s1-problema-img"
          editMode={editMode}
          overrides={overrides}
          onImageClick={onImageClick}
        />
      </section>

      {/* MINI SOBRE MÍ */}
      <section className="s1-sobremi">
        <EditImg
          src="/assets/skin1/laark_sk13.png"
          alt={pick(slots.sobremi_nombre, "Fotógrafa")}
          imgKey="home_about"
          className="s1-sobremi-img"
          editMode={editMode}
          overrides={overrides}
          onImageClick={onImageClick}
        />
        <div className="s1-sobremi-text">
          <span className="s1-eyebrow">Fotógrafa</span>
          <h2>{pick(slots.sobremi_nombre, "Hola, soy María")}</h2>
          <p>{pick(slots.sobremi_bio_corta, "Llevo más de diez años fotografiando familias. Me especializo en sesiones naturales, sin poses forzadas, donde lo que sale es lo que realmente sois.")}</p>
          <span className="s1-btn-outline">{pick(slots.sobremi_cta, "Conóceme")}</span>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="s1-beneficios s1-section">
        <div className="s1-inner">
          <span className="s1-beneficios-titulo">¿Por qué elegirme?</span>
          <div className="s1-beneficios-grid">
            <div className="s1-beneficio-item">
              <EditImg src="/assets/skin1/laark_sk16.jpg" alt="Fotos naturales" imgKey="home_card_0" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
              <span className="s1-beneficio-word">Naturales</span>
              <h3>{pick(slots.home_beneficio_1, "Fotos que parecen de película, no de estudio")}</h3>
              <p>Trabajo con luz natural y entornos reales para que las imágenes tengan vida propia.</p>
            </div>
            <div className="s1-beneficio-item">
              <EditImg src="/assets/skin1/laark_sk17.jpg" alt="Sesión espontánea" imgKey="home_card_1" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
              <span className="s1-beneficio-word">Espontáneas</span>
              <h3>{pick(slots.home_beneficio_2, "Una sesión que se siente como un paseo")}</h3>
              <p>Sin poses forzadas ni tensión. Dejo que la familia sea ella misma.</p>
            </div>
            <div className="s1-beneficio-item">
              <EditImg src="/assets/skin1/laark_sk18.jpg" alt="Imágenes para toda la vida" imgKey="home_card_2" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
              <span className="s1-beneficio-word">Cuidadas</span>
              <h3>{pick(slots.home_beneficio_3, "Imágenes que duran toda la vida")}</h3>
              <p>Entrego una selección cuidada, editada con mi estilo, lista para imprimir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <div className="s1-servicios-header">
        <p>¿Qué puedo hacer por ti?</p>
      </div>
      {/*
        Figma mosaic:
        Row 1: [IMG familia] [LABEL Familia] [IMG infantil]
        Row 2: [LABEL Bebés] [IMG bebés]    [LABEL Infantil]
      */}
      <div className="s1-servicios-mosaic">
        {/* Row 1 – left image */}
        <div className="s1-mosaic-img s1-mosaic-row1">
          <EditImg src="/assets/skin1/laark_sk110.jpg" alt="Fotografía de familia" imgKey="home_mosaic_familia" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        </div>
        {/* Row 1 – center label */}
        <div className="s1-mosaic-lbl">
          <span>Fotografía<br />de Familia</span>
        </div>
        {/* Row 1 – right image */}
        <div className="s1-mosaic-img s1-mosaic-row1">
          <EditImg src="/assets/skin1/laark_sk18.jpg" alt="Fotografía infantil" imgKey="home_mosaic_infantil" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        </div>
        {/* Row 2 – left label */}
        <div className="s1-mosaic-lbl">
          <span>Fotografía<br />de Bebés</span>
        </div>
        {/* Row 2 – center image */}
        <div className="s1-mosaic-img s1-mosaic-row2">
          <EditImg src="/assets/skin1/laark_sk17.jpg" alt="Fotografía de bebés" imgKey="home_mosaic_bebes" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        </div>
        {/* Row 2 – right label */}
        <div className="s1-mosaic-lbl">
          <span>Fotografía<br />Infantil</span>
        </div>
      </div>

      {/* TESTIMONIO */}
      <section className="s1-testimonio s1-section">
        <div className="s1-inner">
          <h2>{pick(slots.home_testimonio_2_texto, "Historias reales, recuerdos inolvidables")}</h2>
          <p className="s1-testimonio-texto">&ldquo;{pick(slots.home_testimonio_1_texto, "Cada imagen captura la emoción y la felicidad de nuestra sesión. No podíamos haber pedido una mejor fotógrafa.")}&rdquo;</p>
          <p className="s1-testimonio-nombre">{pick(slots.home_testimonio_1_nombre, "Ana y Samuel")}</p>
        </div>
      </section>

      {/* CITA */}
      <div className="s1-cita">
        <img
          className="s1-cita-img"
          src={res(overrides, 'home_cita', '/assets/skin1/laark_sk19.jpg')}
          alt="Familia en la playa"
        />
        <div className="s1-cita-overlay" />
        <div className="s1-cita-inner">
          <p className="s1-cita-texto">&ldquo;La fotografía no es solo una imagen, es la memoria de un instante irrepetible.&rdquo;</p>
          <p className="s1-cita-autor">{brandName(slots)}</p>
        </div>
      </div>

      {/* GALERÍA */}
      <div className="s1-galeria">
        <div className="s1-galeria-text">
          <h2>Mira cómo trabajo</h2>
          <p>Cada sesión es diferente porque cada familia es diferente. Aquí puedes ver la luz, el estilo, los momentos que capturo — para que sepas lo que te espera antes de escribirme.</p>
          <span className="s1-btn-outline">Ver galería</span>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="s1-cta-final">
        <img
          className="s1-cta-final-img"
          src={res(overrides, 'home_cta_final', '/assets/skin1/laark_sk110.jpg')}
          alt="Familia feliz"
        />
        <div className="s1-cta-final-overlay" />
        <div className="s1-cta-inner">
          <h2>{pick(slots.servicio_nombre, "Inmortaliza tu historia con imágenes que duran toda la vida")}</h2>
          <p>{pick(slots.contacto_mensaje_intro, "Asegura tu fecha y deja que ese momento sea especial. Las sesiones se reservan con antelación — escríbeme y miramos juntas cuándo.")}</p>
          <span className="s1-btn-solid">{pick(slots.home_hero_cta, "Reserva tu sesión")}</span>
        </div>
      </div>

      <Footer slots={slots} />
    </>
  );
}

/* ─────────────────────────────────────────
   ABOUT PAGE
───────────────────────────────────────── */
function AboutPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const name = pick(slots.sobremi_nombre, "¡Hola!\nSoy Silvia Lebrero");
  const lead = pick(slots.sobremi_bio_corta, "Soy fotógrafa especializada en capturar momentos auténticos y llenos de emoción. Mi misión es transformar instantes en recuerdos inolvidables.");
  const diferencial = pick(slots.sobremi_diferencial, "Trabajo solo con luz natural porque creo que es la que más favorece. Hago sesiones en exteriores o en vuestra propia casa porque quiero que os sintáis en vuestro entorno.");
  const detalles = [
    "Mi amor por la fotografía comenzó con una vieja cámara de mi abuelo.",
    "Soy adicta al café y no empiezo mi día sin una taza bien caliente.",
    "Me encanta viajar y descubrir rincones escondidos, siempre llevo mi cámara conmigo.",
    "La música es mi inspiración, mi playlist para editar fotos cambia según la energía de cada sesión.",
    "Podría pasar horas perdiéndome en libros de arte y fotografía.",
    "Soy amante de los animales — si traes a tu mascota a la sesión, ¡será la estrella!",
    "No puedo resistirme a un buen postre, especialmente si es tarta de queso.",
    "Soy una apasionada del cine clásico, siempre encuentro inspiración en su estética.",
  ];

  return (
    <>
      <Header slots={slots} />

      {/* HERO */}
      <div className="s1-about-hero">
        <div className="s1-about-hero-inner">
          <EditImg
            src="/assets/skin1/laark_sk13.png"
            alt={pick(slots.sobremi_nombre, "Fotógrafa")}
            imgKey="about_hero"
            className="s1-about-hero-img"
            editMode={editMode}
            overrides={overrides}
            onImageClick={onImageClick}
          />
          <div className="s1-about-copy">
            <span className="s1-eyebrow">Por qué creo que nos vamos a gustar</span>
            <h1 style={{ whiteSpace: 'pre-line' }}>{name}</h1>
            <p>{lead}</p>
            <p className="s1-diferencial">{diferencial}</p>
          </div>
        </div>
      </div>

      {/* CITA */}
      <div className="s1-about-cita">
        <div className="s1-about-cita-line" />
        <p>Creo en la fotografía espontánea, donde las sonrisas genuinas, los abrazos sinceros y las miradas cómplices son los verdaderos protagonistas. Gracias por estar aquí. Será un placer acompañarte en este viaje.</p>
      </div>

      {/* IMAGEN + HISTORIA */}
      <div className="s1-about-historia">
        <div className="s1-about-historia-inner">
          <EditImg
            src="/assets/skin1/laark_sk110.jpg"
            alt="Fotos de familia"
            imgKey="about_story"
            className="s1-about-historia-img"
            editMode={editMode}
            overrides={overrides}
            onImageClick={onImageClick}
          />
          <div className="s1-about-historia-text">
            <p>Dedico tiempo antes de cada sesión a conoceros: cómo sois, qué os gusta, qué dinámica tiene vuestra familia, para que el día de la sesión todo fluya de forma natural.</p>
            <p>No busco la foto perfecta. Busco la foto real. La que dentro de veinte años vais a mirar y vais a sentir exactamente lo que sentíais ese día.</p>
            <div className="s1-firma">{pick(slots.sobremi_nombre, "Silvia")}</div>
          </div>
        </div>
      </div>

      {/* BIO */}
      <div className="s1-bio">
        <div className="s1-inner">
          <h2>Bio</h2>
          <p>{lead}</p>
          <p>{diferencial}</p>
        </div>
      </div>

      {/* DETALLES */}
      <div className="s1-detalles">
        <h2>Otros detalles sobre mí</h2>
        <div className="s1-detalles-grid">
          {detalles.map((item, i) => (
            <div className="s1-detalle-item" key={i}>
              <span className="s1-detalle-num">{i + 1}.</span>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="s1-cta-final">
        <img
          className="s1-cta-final-img"
          src={res(overrides, 'about_cta_final', '/assets/skin1/laark_sk16.jpg')}
          alt="Familia feliz"
        />
        <div className="s1-cta-final-overlay" />
        <div className="s1-cta-inner">
          <h2>Inmortaliza tu historia con imágenes que durarán toda la vida</h2>
          <p>Asegura tu fecha y deja que cada momento especial sea capturado con elegancia y emoción. Si esta forma de trabajar encaja contigo, estaré encantada de conocerte.</p>
          <span className="s1-btn-solid">{pick(slots.sobremi_cta, "Reserva tu sesión")}</span>
        </div>
      </div>

      <Footer slots={slots} />
    </>
  );
}

/* ─────────────────────────────────────────
   SESSIONS PAGE
───────────────────────────────────────── */
function SessionsPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const sessionTitle = pick(slots.servicio_nombre, "Sesiones\nde familias");

  return (
    <>
      <Header slots={slots} />

      {/* HERO */}
      <div className="s1-ses-hero">
        <img
          className="s1-ses-hero-img"
          src={res(overrides, 'sessions_hero', '/assets/skin1/laark_sk15.jpg')}
          alt="Sesiones de familias"
        />
        <div className="s1-ses-hero-overlay" />
        <div className="s1-ses-hero-text">
          <span className="s1-ses-hero-eyebrow">Sesiones</span>
          <h1>{sessionTitle}</h1>
        </div>
      </div>

      {/* INTRO */}
      <div className="s1-ses-intro">
        <div className="s1-ses-intro-inner">
          <div>
            <h2>{pick(slots.servicio_subtitulo, "Inmortaliza los momentos más especiales")}</h2>
            <p>{pick(slots.servicio_para_quien, "Cada familia tiene una historia única, llena de risas, abrazos y momentos espontáneos que merecen ser inmortalizados.")}</p>
            <p>Me adaptaré a vosotros para que los momentos que capturemos sean los que siempre queréis recordar.</p>
            <span className="s1-btn-link">Ver más fotos de familias</span>
          </div>
          <div className="s1-ses-intro-imgs">
            <EditImg src="/assets/skin1/laark_sk14.jpg" alt="Familia" imgKey="sessions_gallery_0" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
            <EditImg src="/assets/skin1/laark_sk13.png" alt="Niño leyendo" imgKey="sessions_gallery_1" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
            <EditImg src="/assets/skin1/laark_sk16.jpg" alt="Familia en exterior" imgKey="sessions_gallery_2" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          </div>
        </div>
      </div>

      {/* BENEFICIOS */}
      <div className="s1-ses-beneficios">
        <span className="s1-ses-beneficios-titulo">¿Por qué elegir mis sesiones?</span>
        <div className="s1-ses-beneficios-grid">
          <div className="s1-ses-beneficio">
            <h3>{pick(slots.servicio_beneficio_1, "Capturo momentos auténticos")}</h3>
            <p>Trabajo de forma natural, sin poses forzadas, para que lo que salga sea lo que realmente sois.</p>
          </div>
          <div className="s1-ses-beneficio">
            <h3>{pick(slots.servicio_beneficio_2, "Experiencia relajada y divertida")}</h3>
            <p>No hace falta que los niños estén quietos ni que nadie sonría a cámara.</p>
          </div>
          <div className="s1-ses-beneficio">
            <h3>{pick(slots.servicio_beneficio_3, "Recuerdos para toda la vida")}</h3>
            <p>Entrego una selección cuidada, editada con mi estilo personal.</p>
          </div>
        </div>
      </div>

      {/* DETALLES */}
      <div className="s1-ses-detalles">
        <h2>Lo que necesitas saber</h2>
        <div className="s1-ses-detalles-grid">
          <div className="s1-ses-detalle-item">
            <span className="s1-ses-detalle-label">Lugar</span>
            <p>Exteriores naturales de Barcelona y alrededores — parques, playas, campos o vuestra propia casa.</p>
          </div>
          <div className="s1-ses-detalle-item">
            <span className="s1-ses-detalle-label">Vestuario</span>
            <p>Ropa cómoda y colores neutros o tierra. Os mando una guía al reservar.</p>
          </div>
          <div className="s1-ses-detalle-item">
            <span className="s1-ses-detalle-label">Duración</span>
            <p>Entre 60 y 90 minutos, según el ritmo de la familia y los niños.</p>
          </div>
          <div className="s1-ses-detalle-item">
            <span className="s1-ses-detalle-label">Inversión</span>
            <div className="s1-ses-precio-num">400€</div>
            <span className="s1-ses-precio-label">Sesión familiar</span>
          </div>
          <div className="s1-ses-detalle-item" style={{ gridColumn: '2 / -1' }}>
            <span className="s1-ses-detalle-label">Qué incluye</span>
            <ul className="s1-incluye-lista">
              <li>Sesión de 60 a 90 minutos</li>
              <li>Selección de 40 fotografías editadas</li>
              <li>Galería privada online</li>
              <li>Posibilidad de álbum físico</li>
            </ul>
          </div>
        </div>
        <div className="s1-ses-detalles-cta">
          <span className="s1-btn-reserva">Reserva tu sesión</span>
        </div>
      </div>

      {/* GALERÍA ENLAZADA */}
      <div className="s1-ses-galeria">
        <EditImg
          src="/assets/skin1/laark_sk19.jpg"
          alt="Galería de familias"
          imgKey="sessions_band"
          editMode={editMode}
          overrides={overrides}
          onImageClick={onImageClick}
        />
        <div className="s1-ses-galeria-text">
          <span className="s1-eyebrow-gold">Galerías</span>
          <h2>Inspírate con momentos inolvidables</h2>
          <p>Antes de decidir, mira cómo trabajo. Cada imagen captura algo real — la luz, el movimiento, la conexión entre vosotros.</p>
          <span className="s1-btn-outline">Ver galería</span>
        </div>
      </div>

      {/* FILTRO */}
      <div className="s1-ses-filtro">
        <div className="s1-ses-filtro-inner">
          <div className="s1-ses-filtro-col">
            <h2>Esta sesión es para ti si...</h2>
            <ul className="s1-ses-filtro-lista">
              <li>Quieres fotos naturales, sin poses ni fondos de estudio</li>
              <li>Tus hijos tienen entre 0 y 12 años y buscas capturar esta etapa</li>
              <li>Prefieres un entorno exterior o tu propia casa</li>
              <li>Valoras tener imágenes de calidad para imprimir o guardar</li>
            </ul>
          </div>
          <div className="s1-ses-filtro-col">
            <h2>Esta sesión no es para ti si...</h2>
            <ul className="s1-ses-filtro-lista s1-ses-filtro-no">
              <li>Buscas un estudio con fondos blancos y poses dirigidas</li>
              <li>Necesitas las fotos en menos de una semana</li>
              <li>Quieres un reportaje de más de dos horas de duración</li>
            </ul>
          </div>
        </div>
      </div>

      {/* TESTIMONIO */}
      <div className="s1-ses-testimonio">
        <EditImg
          src="/assets/skin1/laark_sk14.jpg"
          alt="Testimonio"
          imgKey="sessions_testimonial"
          editMode={editMode}
          overrides={overrides}
          onImageClick={onImageClick}
        />
        <div className="s1-ses-testimonio-text">
          <span className="s1-ses-testimonio-titulo">Lo que cuentan</span>
          <p className="s1-ses-testimonio-quote">&ldquo;{pick(slots.servicio_testimonio_1_texto, "Cada imagen captura la emoción y la felicidad de nuestra sesión. No podíamos haber pedido una mejor fotógrafa.")}&rdquo;</p>
          <p className="s1-ses-testimonio-nombre">— {pick(slots.servicio_testimonio_1_nombre, "María")}</p>
        </div>
      </div>

      {/* FAQS */}
      <div className="s1-ses-faqs">
        <h2>Preguntas frecuentes</h2>
        <div className="s1-ses-faqs-grid">
          <div className="s1-ses-faq-item">
            <h3>{pick(slots.servicio_faq_1_pregunta, "¿A qué hora se realizan las sesiones?")}</h3>
            <p>{pick(slots.servicio_faq_1_respuesta, "Trabajo con luz natural, así que las sesiones se hacen a primera hora de la mañana o en las últimas horas de la tarde.")}</p>
          </div>
          <div className="s1-ses-faq-item">
            <h3>{pick(slots.servicio_faq_2_pregunta, "¿Dónde se realizan las sesiones?")}</h3>
            <p>{pick(slots.servicio_faq_2_respuesta, "En exteriores naturales de Barcelona y alrededores — parques, playas, campos o bosques.")}</p>
          </div>
          <div className="s1-ses-faq-item">
            <h3>¿Cuándo recibimos las fotografías?</h3>
            <p>En un plazo de 3 a 4 semanas recibiréis acceso a vuestra galería privada online con todas las imágenes editadas.</p>
          </div>
          <div className="s1-ses-faq-item">
            <h3>¿Qué pasa si mis hijos no cooperan?</h3>
            <p>Es lo más normal del mundo. No necesito que estén quietos ni que sonrían a cámara. Las mejores fotos suelen salir cuando los niños están haciendo lo suyo.</p>
          </div>
        </div>
      </div>

      {/* CTA FINAL */}
      <div className="s1-cta-final">
        <img
          className="s1-cta-final-img"
          src={res(overrides, 'sessions_cta_final', '/assets/skin1/laark_sk110.jpg')}
          alt="Familia"
        />
        <div className="s1-cta-final-overlay" />
        <div className="s1-cta-inner">
          <h2>Inmortaliza tu historia con imágenes que durarán toda la vida</h2>
          <p>Asegura tu fecha y deja que ese momento sea especial. Las sesiones se reservan con antelación.</p>
          <span className="s1-btn-solid">Reserva tu sesión</span>
        </div>
      </div>

      <Footer slots={slots} />
    </>
  );
}

/* ─────────────────────────────────────────
   ROOT
───────────────────────────────────────── */
export default function Skin1({ slots, mobile, page = "home", editMode, onImageClick, imageOverrides }: Props) {
  return (
    <div className={`photo-home ${mobile ? "photo-home-preview-mobile" : ""}`}>
      {page === "home" && <HomePage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
      {page === "about" && <AboutPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
      {page === "sessions" && <SessionsPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
    </div>
  );
}
