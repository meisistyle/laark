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
  style?: React.CSSProperties;
}

function EditImg({ src, alt, imgKey, className, editMode, overrides, onImageClick, style }: EditImgProps) {
  const resolved = overrides?.[imgKey] || src;
  if (!editMode) return <img src={resolved} alt={alt} className={className} style={style} />;
  return (
    <div className="s1-img-wrap" onClick={() => onImageClick?.(imgKey)} style={style}>
      <img src={resolved} alt={alt} className={className} />
      <div className="s1-img-overlay" aria-label="Cambiar foto">
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

function res(overrides: Record<string, string> | undefined, key: string, def: string) {
  return overrides?.[key] || def;
}

function brandName(slots: WebSlots) {
  return pick(slots.negocio_nombre, "Silvia Lebrero");
}

type EditProps = {
  editMode?: boolean;
  overrides?: Record<string, string>;
  onImageClick?: (key: string) => void;
};

/* ─── NAV ─── */
function Nav({ slots }: { slots: WebSlots }) {
  return (
    <nav className="s1-nav">
      <div className="s1-nav-logo">
        <span className="s1-logo-script">{brandName(slots)}</span>
        <span className="s1-logo-tag">{pick(slots.negocio_sector, "Photography")}</span>
      </div>
      <ul className="s1-nav-links">
        <li>Servicios</li>
        <li>Sobre mí</li>
        <li>Galerías</li>
        <li>Contacto</li>
      </ul>
    </nav>
  );
}

/* ─── FOOTER ─── */
function Footer({ slots }: { slots: WebSlots }) {
  return (
    <footer className="s1-footer">
      <div className="s1-footer-legal">
        <span>Política de privacidad</span>
        <span>Términos y condiciones</span>
      </div>
      <div className="s1-footer-logo">
        <span className="s1-logo-script">{brandName(slots)}</span>
        <span className="s1-logo-tag">{pick(slots.negocio_sector, "Photography")}</span>
      </div>
      <div className="s1-footer-copy">© 2025 {brandName(slots)}</div>
    </footer>
  );
}

/* ─── CTA FINAL (shared) ─── */
function CtaFinal({ slots, imgKey, overrides, editMode, onImageClick }: { slots: WebSlots; imgKey: string } & EditProps) {
  return (
    <div className="s1-cta-final">
      <img
        className="s1-cta-final-bg"
        src={res(overrides, imgKey, `/assets/skin1/laark_sk1-13.jpg`)}
        alt=""
      />
      <div className="s1-cta-final-overlay" />
      <div className="s1-cta-final-box">
        <h2>{pick(slots.servicio_nombre, "Inmortaliza tu historia con imágenes que durarán toda la vida.")}</h2>
        <p>{pick(slots.contacto_mensaje_intro, "Asegura tu fecha y deja que cada momento especial sea capturado con elegancia y emoción. Reserva tu sesión hoy.")}</p>
        <span className="s1-btn-outline">{pick(slots.home_hero_cta, "Reserva tu sesión")}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════ */
function HomePage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  return (
    <>
      <Nav slots={slots} />

      {/* HERO */}
      <div className="s1-hero">
        <img className="s1-hero-bg" src={res(overrides, 'home_hero', '/assets/skin1/laark_sk1-2.jpg')} alt="" />
        <div className="s1-hero-overlay" />
        <div className="s1-hero-text">
          <h1>{pick(slots.home_hero_titular, "Capturando momentos únicos y llenos de emoción")}</h1>
          <p>{pick(slots.negocio_sector, "Fotografía de familia en Barcelona y alrededores")}</p>
        </div>
      </div>

      {/* DEFINICIÓN */}
      <section className="s1-definicion">
        <div className="s1-inner">
          <h2>{pick(slots.home_problema_texto, "Fotografía de familia con alma, para los momentos que merecen quedarse para siempre")}</h2>
          <p className="s1-serif-italic">{pick(slots.home_solucion_texto, "Capturo lo que de verdad importa. Sesiones en exteriores con luz natural, para familias que quieren conservar sus momentos más especiales.")}</p>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="s1-problema">
        <div className="s1-problema-text">
          <h2>{pick(slots.servicio_subtitulo, "El tiempo pasa más rápido de lo que parece.")}</h2>
          <p className="s1-serif-italic">{pick(slots.servicio_para_quien, "Los niños crecen, las etapas cambian, y los momentos cotidianos que hoy te parecen normales son los que más vas a querer recordar.")}</p>
          <p>Cada historia merece ser contada con luz, sensibilidad y elegancia.</p>
        </div>
        <EditImg
          src="/assets/skin1/laark_sk1-4.jpg"
          alt="Familia"
          imgKey="home_problema"
          className="s1-problema-img"
          editMode={editMode} overrides={overrides} onImageClick={onImageClick}
        />
      </section>

      {/* MINI SOBRE MÍ */}
      <section className="s1-sobremi-mini">
        <EditImg
          src="/assets/skin1/laark_sk1-3.jpg"
          alt={pick(slots.sobremi_nombre, "Fotógrafa")}
          imgKey="home_about"
          className="s1-sobremi-mini-img"
          editMode={editMode} overrides={overrides} onImageClick={onImageClick}
        />
        <div className="s1-sobremi-mini-text">
          <span className="s1-eyebrow">Fotógrafa</span>
          <h2>{pick(slots.sobremi_nombre, "Hola, soy María")}</h2>
          <p>{pick(slots.sobremi_bio_corta, "Llevo más de diez años fotografiando familias y parejas en Barcelona. Me especializo en sesiones naturales, sin poses forzadas, donde lo que sale es lo que realmente sois.")}</p>
          <span className="s1-btn-outline">{pick(slots.sobremi_cta, "Conóceme")}</span>
        </div>
      </section>

      {/* BENEFICIOS / ¿POR QUÉ ELEGIRME? */}
      <section className="s1-beneficios">
        <p className="s1-section-label">¿Por qué elegirme?</p>
        <div className="s1-beneficios-grid">
          <div className="s1-beneficio">
            <EditImg src="/assets/skin1/laark_sk1-5.jpg" alt="" imgKey="home_card_0" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
            <span className="s1-card-tag">Descubre</span>
            <h3>{pick(slots.home_beneficio_1, "Fotos que parecen de película, no de estudio")}</h3>
            <p>{pick(slots.home_beneficio_1, "Trabajo con luz natural y entornos reales para que las imágenes tengan vida propia.")}</p>
          </div>
          <div className="s1-beneficio">
            <EditImg src="/assets/skin1/laark_sk1-6.jpg" alt="" imgKey="home_card_1" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
            <span className="s1-card-tag">Inspírate</span>
            <h3>{pick(slots.home_beneficio_2, "Una sesión que se siente como un paseo")}</h3>
            <p>Sin poses forzadas, sin tensión. Dejo que la familia sea ella misma y capturo lo que pasa.</p>
          </div>
          <div className="s1-beneficio">
            <EditImg src="/assets/skin1/laark_sk1-7.jpg" alt="" imgKey="home_card_2" className="s1-beneficio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
            <span className="s1-card-tag">Confía</span>
            <h3>{pick(slots.home_beneficio_3, "Imágenes que duran toda la vida")}</h3>
            <p>Entrego una selección cuidada, editada con mi estilo, lista para imprimir o guardar para siempre.</p>
          </div>
        </div>
      </section>

      {/* SERVICIOS / MOSAICO */}
      <div className="s1-servicios-header">
        <p className="s1-section-label">¿Qué puedo hacer por ti?</p>
      </div>
      <div className="s1-mosaico">
        <div className="s1-mosaico-item s1-mosaico-tall-left">
          <EditImg src="/assets/skin1/laark_sk1-8.jpg" alt="" imgKey="home_mosaic_0" className="s1-mosaico-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="s1-mosaico-label">Fotografía<br />de boda</div>
        </div>
        <div className="s1-mosaico-item">
          <EditImg src="/assets/skin1/laark_sk1-9.jpg" alt="" imgKey="home_mosaic_1" className="s1-mosaico-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="s1-mosaico-label">Fotografía<br />de familia</div>
        </div>
        <div className="s1-mosaico-item s1-mosaico-tall-right">
          <EditImg src="/assets/skin1/laark_sk1-10.jpg" alt="" imgKey="home_mosaic_2" className="s1-mosaico-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="s1-mosaico-label">Fotografía<br />infantil</div>
        </div>
        <div className="s1-mosaico-item">
          <EditImg src="/assets/skin1/laark_sk1-11.jpg" alt="" imgKey="home_mosaic_3" className="s1-mosaico-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="s1-mosaico-label">Recién<br />nacido</div>
        </div>
      </div>

      {/* TESTIMONIO */}
      <section className="s1-testimonio">
        <div className="s1-inner">
          <h2>{pick(slots.home_testimonio_2_texto, "Historias reales, recuerdos inolvidables")}</h2>
          <p className="s1-testimonio-quote s1-serif-italic">&ldquo;{pick(slots.home_testimonio_1_texto, "Cada imagen captura la emoción y la felicidad de nuestra sesión. No podíamos haber pedido una mejor fotógrafa.")}&rdquo;</p>
          <p className="s1-testimonio-autor">{pick(slots.home_testimonio_1_nombre, "Ana y Samuel")}</p>
        </div>
      </section>

      {/* CITA */}
      <div className="s1-cita">
        <img className="s1-cita-bg" src={res(overrides, 'home_cita', '/assets/skin1/laark_sk1-12.jpg')} alt="" />
        <div className="s1-cita-overlay" />
        <div className="s1-cita-inner">
          <p className="s1-serif-italic">&ldquo;La fotografía no es solo una imagen, es la memoria de un instante irrepetible.&rdquo;</p>
          <span className="s1-cita-autor">{brandName(slots)}</span>
        </div>
      </div>

      {/* GUÍA / LEAD */}
      <section className="s1-lead">
        <div className="s1-lead-inner">
          <div className="s1-lead-text">
            <h2>{pick(slots.contacto_mensaje_intro, "Guía esencial para fotos perfectas")}</h2>
            <p>¿Cómo preparar tu sesión para que todo salga bien? ¿Qué llevar puesto, dónde ir, a qué hora? Todo lo que necesitas saber antes de reservar, en una guía gratuita que te mando al correo.</p>
          </div>
          <div className="s1-lead-form">
            <div className="s1-lead-field"><span>Nombre</span></div>
            <div className="s1-lead-field"><span>Email</span></div>
            <button className="s1-btn-gold">Suscribirse</button>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <CtaFinal slots={slots} imgKey="home_cta_final" overrides={overrides} editMode={editMode} onImageClick={onImageClick} />

      <Footer slots={slots} />
    </>
  );
}

/* ═══════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════ */
function AboutPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const name = pick(slots.sobremi_nombre, "¡Hola!\nSoy Silvia Lebrero");
  const lead = pick(slots.sobremi_bio_corta, "Soy fotógrafa especializada en capturar momentos auténticos y llenos de emoción. Mi misión es transformar instantes en recuerdos inolvidables, reflejando la belleza natural de cada historia.");
  const diferencial = pick(slots.sobremi_diferencial, "Cuando alguien me pregunta por qué elegiría trabajar conmigo y no con otra fotógrafa, siempre pienso en lo mismo: en lo que he decidido cuidar con criterio desde el principio.\n\nTrabajo solo con luz natural porque creo que es la que más favorece y la que da a las fotos ese aspecto cálido y vivo que no se consigue con flash. Hago sesiones en exteriores o en vuestra propia casa porque quiero que os sintáis en vuestro entorno, no en un sitio desconocido que os ponga nerviosos.");

  const detalles = [
    "Mi amor por la fotografía comenzó con una vieja cámara de mi abuelo, y desde entonces nunca he dejado de capturar momentos especiales.",
    "Soy adicta al café y no empiezo mi día sin una taza bien caliente. Es mi pequeño ritual antes de cada sesión.",
    "Me encanta viajar y descubrir rincones escondidos, siempre llevo mi cámara conmigo para capturar la magia de cada destino.",
    "La música es mi inspiración, mi playlist para editar fotos cambia según la energía de cada sesión.",
    "Podría pasar horas perdiéndome en libros de arte y fotografía, siempre buscando nuevas formas de contar historias visuales.",
    "Soy amante de los animales y si traes a tu mascota a la sesión, ¡será la estrella de algunas fotos!",
    "No puedo resistirme a un buen postre, especialmente si es tarta de queso o chocolate.",
    "Amo la naturaleza y las sesiones al aire libre, la luz natural es mi mejor aliada para capturar emociones genuinas.",
    "Soy una apasionada del cine clásico, siempre encuentro inspiración en la estética y composición de las películas antiguas.",
  ];

  return (
    <>
      <Nav slots={slots} />

      {/* HERO */}
      <section className="s1-about-hero">
        <div className="s1-about-hero-inner">
          <EditImg
            src="/assets/skin1/laark_sk1-20.jpg"
            alt={pick(slots.sobremi_nombre, "Fotógrafa")}
            imgKey="about_hero"
            className="s1-about-hero-img"
            editMode={editMode} overrides={overrides} onImageClick={onImageClick}
          />
          <div className="s1-about-copy">
            <span className="s1-eyebrow">Por qué creo que nos vamos a gustar</span>
            <h1 style={{ whiteSpace: 'pre-line' }}>{name}</h1>
            <p className="s1-serif-italic">{lead}</p>
            <p className="s1-about-diferencial" style={{ whiteSpace: 'pre-line' }}>{diferencial}</p>
          </div>
        </div>
      </section>

      {/* CITA */}
      <div className="s1-about-cita">
        <div className="s1-about-cita-inner">
          <div className="s1-about-cita-line" />
          <p className="s1-serif-italic">Creo en la fotografía espontánea, donde las sonrisas genuinas, los abrazos sinceros y las miradas cómplices son los verdaderos protagonistas. Gracias por estar aquí. Será un placer acompañarte en este viaje y capturar los momentos más valiosos para ti y tu familia.</p>
        </div>
      </div>

      {/* HISTORIA */}
      <div className="s1-about-historia">
        <div className="s1-about-historia-inner">
          <EditImg
            src="/assets/skin1/laark_sk1-21.jpg"
            alt="Historia"
            imgKey="about_story"
            className="s1-about-historia-img"
            editMode={editMode} overrides={overrides} onImageClick={onImageClick}
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
        <div className="s1-bio-inner">
          <h2>Bio</h2>
          <p>Mi amor por la fotografía comenzó con una vieja cámara de mi abuelo. De pequeña me pasaba horas disparando sin ton ni son, sin saber muy bien lo que hacía, pero sintiendo que había algo especial en congelar un momento. Con el tiempo ese amor se convirtió en vocación, estudié fotografía artística en Barcelona y me especialicé en retrato y fotografía de familia.</p>
          <p>Después de años asistiendo a otros fotógrafos y perfeccionando mi técnica, abrí mi primer estudio y empecé a construir mi propia forma de trabajar — alejada de los fondos blancos y las poses dirigidas, y cada vez más cerca de la luz natural, los exteriores y las sesiones donde la familia simplemente es ella misma.</p>
          <p>Llevo más de diez años fotografiando familias y parejas en Barcelona y alrededores. He tenido el privilegio de capturar primeros pasos, abrazos de recién nacidos, risas de hermanos y miradas de parejas que llevan toda una vida juntas. Cada sesión me sigue emocionando igual que la primera.</p>
        </div>
      </div>

      {/* DETALLES */}
      <div className="s1-detalles">
        <div className="s1-detalles-inner">
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
      </div>

      {/* CTA FINAL */}
      <CtaFinal slots={slots} imgKey="about_cta_final" overrides={overrides} editMode={editMode} onImageClick={onImageClick} />

      <Footer slots={slots} />
    </>
  );
}

/* ═══════════════════════════════════════
   SESSIONS PAGE
═══════════════════════════════════════ */
function SessionsPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  return (
    <>
      <Nav slots={slots} />

      {/* HERO */}
      <div className="s1-ses-hero">
        <img className="s1-ses-hero-bg" src={res(overrides, 'sessions_hero', '/assets/skin1/laark_sk1-14.jpg')} alt="" />
        <div className="s1-ses-hero-overlay" />
        <div className="s1-ses-hero-text">
          <span className="s1-ses-hero-tag">Sesiones</span>
          <h1>{pick(slots.servicio_nombre, "FAMILIAS")}</h1>
        </div>
      </div>

      {/* INTRO */}
      <section className="s1-ses-intro">
        <div className="s1-ses-intro-text">
          <h2>{pick(slots.servicio_subtitulo, "Inmortaliza los momentos más especiales.")}</h2>
          <p className="s1-serif-italic">{pick(slots.servicio_para_quien, "Cada familia tiene una historia única, llena de risas, abrazos y momentos inolvidables. Mis sesiones están diseñadas para capturar la esencia de tu hogar.")}</p>
          <p>Cada sesión de foto familiar es una aventura emocionante. Me apasiona encontrar los mejores escenarios para que las imágenes sean tan especiales como tus recuerdos.</p>
          <p>Me adaptaré a vosotros para que los momentos que capturemos sean los que siempre queréis recordar.</p>
          <span className="s1-btn-outline-sm">Ver más fotos de familias</span>
        </div>
        <div className="s1-ses-intro-imgs">
          <EditImg src="/assets/skin1/laark_sk1-15.jpg" alt="" imgKey="sessions_gallery_0" className="s1-ses-img-tall" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <EditImg src="/assets/skin1/laark_sk1-16.jpg" alt="" imgKey="sessions_gallery_1" className="s1-ses-img-short" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        </div>
      </section>

      {/* ¿POR QUÉ ELEGIR MIS SESIONES? */}
      <section className="s1-ses-porque">
        <div className="s1-inner">
          <h2>{pick(slots.servicio_beneficio_1, "¿Por qué elegir mis sesiones?")}</h2>
          <div className="s1-ses-porque-grid">
            <div className="s1-ses-porque-item">
              <h3>Captura momentos auténticos</h3>
              <p>{pick(slots.servicio_beneficio_1, "Cada imagen refleja la esencia de tu familia con naturalidad y emoción, sin poses forzadas.")}</p>
            </div>
            <div className="s1-ses-porque-item">
              <h3>Experiencia relajada y divertida</h3>
              <p>{pick(slots.servicio_beneficio_2, "Nada de estrés ni prisas, solo tiempo de calidad con quienes más amas.")}</p>
            </div>
            <div className="s1-ses-porque-item">
              <h3>Recuerdos para toda la vida</h3>
              <p>{pick(slots.servicio_beneficio_3, "Fotografías atemporales que podrás revivir una y otra vez.")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* LO QUE NECESITAS SABER */}
      <section className="s1-ses-detalles">
        <div className="s1-inner">
          <h2>Lo que necesitas saber</h2>
          <p className="s1-serif-italic s1-section-subtitle">Algunos detalles de la sesión</p>
          <div className="s1-ses-detalles-grid">
            <div className="s1-ses-detalle">
              <span className="s1-detalle-label">Lugar</span>
              <p>Las sesiones pueden realizarse en exteriores, en la comodidad de tu hogar o en un espacio especial que elijas.</p>
            </div>
            <div className="s1-ses-detalle">
              <span className="s1-detalle-label">Vestuario</span>
              <p>El costo de la sesión varía según la ubicación y la duración. Consulta las opciones disponibles.</p>
            </div>
            <div className="s1-ses-detalle">
              <span className="s1-detalle-label">Duración</span>
              <p>Las sesiones tienen una duración aproximada de 60 a 90 minutos, permitiendo capturar momentos espontáneos.</p>
            </div>
            <div className="s1-ses-detalle s1-ses-detalle-precio">
              <span className="s1-detalle-label">Inversión</span>
              <div className="s1-precio">400€</div>
              <span className="s1-serif-italic s1-precio-label">Sesión familiar</span>
            </div>
            <div className="s1-ses-detalle s1-ses-detalle-incluye">
              <span className="s1-detalle-label">Qué incluye</span>
              <ul className="s1-incluye-lista">
                <li>Asesoramiento previo</li>
                <li>Selección de 20 fotos editadas</li>
                <li>Impresión en papel 200gr</li>
                <li>Pendrive con los archivos</li>
              </ul>
            </div>
          </div>
          <div className="s1-ses-cta-center">
            <button className="s1-btn-gold">Reserva tu sesión</button>
          </div>
        </div>
      </section>

      {/* GALERÍA BAND */}
      <div className="s1-ses-galeria">
        <EditImg src="/assets/skin1/laark_sk1-17.jpg" alt="" imgKey="sessions_band" className="s1-ses-galeria-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div className="s1-ses-galeria-text">
          <span className="s1-eyebrow-gold">Galerías</span>
          <h2>Inspírate con momentos inolvidables</h2>
          <p>Antes de decidir, mira cómo trabajo. Cada imagen captura algo real.</p>
          <span className="s1-btn-outline">Ver galería</span>
        </div>
      </div>

      {/* PARA QUIÉN */}
      <section className="s1-ses-paraquien">
        <div className="s1-ses-paraquien-inner">
          <div className="s1-ses-paraquien-col">
            <h2>Esta sesión es para ti si...</h2>
            <ul>
              <li>Quieres capturar momentos auténticos y naturales con tu familia.</li>
              <li>Prefieres una sesión relajada, sin poses forzadas ni presión.</li>
              <li>Te encanta la fotografía con luz natural y colores cálidos.</li>
              <li>Buscas imágenes que reflejen la esencia y conexión de tu familia.</li>
              <li>Deseas recuerdos atemporales que puedas revivir siempre.</li>
            </ul>
          </div>
          <div className="s1-ses-paraquien-col">
            <h2>Esta sesión no es para ti si...</h2>
            <ul className="s1-list-no">
              <li>Prefieres fotos completamente posadas y estructuradas.</li>
              <li>Buscas un estilo de edición muy saturado o artificial.</li>
              <li>Quieres una sesión rápida sin enfoque en la experiencia.</li>
              <li>No te sientes cómodo dejando que los momentos fluyan naturalmente.</li>
              <li>Esperas un estudio con fondos artificiales y luces intensas.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <div className="s1-ses-testimonio">
        <EditImg src="/assets/skin1/laark_sk1-18.jpg" alt="" imgKey="sessions_testimonial" className="s1-ses-testimonio-img" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div className="s1-ses-testimonio-text">
          <h2>Lo que cuentan...</h2>
          <p className="s1-serif-italic">&ldquo;{pick(slots.servicio_testimonio_1_texto, "Cada imagen capturó la esencia de nuestra familia de una manera única y especial. Nos sentimos completamente cómodos durante la sesión, y el resultado superó todas nuestras expectativas.")}&rdquo;</p>
          <span className="s1-testimonio-autor">{pick(slots.servicio_testimonio_1_nombre, "María")}</span>
        </div>
      </div>

      {/* FAQS */}
      <section className="s1-ses-faqs">
        <div className="s1-inner">
          <h2>Preguntas frecuentes</h2>
          <div className="s1-ses-faqs-grid">
            {[
              { q: pick(slots.servicio_faq_1_pregunta, "¿Cuánto dura la sesión de fotos?"), a: pick(slots.servicio_faq_1_respuesta, "Las sesiones tienen una duración de 60 a 90 minutos.") },
              { q: pick(slots.servicio_faq_2_pregunta, "¿Cuánto tiempo tarda la entrega de las fotos?"), a: pick(slots.servicio_faq_2_respuesta, "Recibiréis las fotos en un plazo de 3 a 4 semanas.") },
              { q: "¿Dónde se pueden realizar las sesiones?", a: "En exteriores naturales, en vuestra casa o en cualquier espacio especial para vosotros." },
              { q: "¿Qué debo llevar o preparar para la sesión?", a: "Os envío una guía completa al confirmar la reserva con todo lo que necesitáis saber." },
              { q: "¿Cuántas fotos recibiré y en qué formato?", a: "Recibiréis entre 20 y 40 fotos editadas en alta resolución, listas para imprimir." },
              { q: "¿Ofreces paquetes o sesiones personalizadas?", a: "Sí, cuéntame vuestra historia y encontramos juntas el mejor formato." },
            ].map(({ q, a }, i) => (
              <div className="s1-faq-item" key={i}>
                <span className="s1-faq-q">{q}</span>
                <p className="s1-faq-a">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <CtaFinal slots={slots} imgKey="sessions_cta_final" overrides={overrides} editMode={editMode} onImageClick={onImageClick} />

      <Footer slots={slots} />
    </>
  );
}

/* ═══════════════════════════════════════
   ROOT
═══════════════════════════════════════ */
export default function Skin1({ slots, mobile, page = "home", editMode, onImageClick, imageOverrides }: Props) {
  return (
    <div className={`s1 ${mobile ? "s1-mobile" : ""}`}>
      {page === "home" && <HomePage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
      {page === "about" && <AboutPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
      {page === "sessions" && <SessionsPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
    </div>
  );
}
