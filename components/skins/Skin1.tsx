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

function pick(value: string, fallback: string) {
  return value?.trim() || fallback;
}

function loremShort() {
  return "Lorem ipsum dolor sit amet";
}

function loremBody() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
}

function loremBodyLong() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
}

function brandName(slots: WebSlots) {
  return pick(slots.negocio_nombre, "Lorem Studio");
}

function Header({ slots }: { slots: WebSlots }) {
  return (
    <header className="photo-home-header">
      <img className="photo-home-logo" src="/assets/DASHBOARD/LAARK logo horiz 2.png" alt={brandName(slots)} />
      <nav className="photo-home-nav" aria-label="Navegación principal">
        <span>Home</span>
        <span>Servicios</span>
        <span>Sobre mí</span>
        <span>Galerías</span>
        <span>Contacto</span>
      </nav>
    </header>
  );
}

function Footer({ slots }: { slots: WebSlots }) {
  return (
    <footer className="photo-home-footer">
      <img className="photo-home-footer-logo" src="/assets/DASHBOARD/LAARK logo horiz 2.png" alt={brandName(slots)} />
      <div className="photo-home-footer-grid">
        <div>Política de privacidad<br />Política de cookies</div>
        <div>{brandName(slots)}</div>
        <div>Aviso legal<br />Términos y condiciones</div>
      </div>
    </footer>
  );
}

type EditProps = { editMode?: boolean; overrides?: Record<string, string>; onImageClick?: (key: string) => void };

function HomePage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const heroTitle = pick(slots.home_hero_titular, "Lorem ipsum dolor sit amet consectetur");
  const introTitle = pick(slots.home_problema_texto, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const introBody = pick(slots.home_solucion_texto, loremBodyLong());
  const aboutName = pick(slots.sobremi_nombre, "Lorem ipsum dolor");
  const aboutBio = pick(slots.sobremi_bio_corta, loremBody());
  const aboutBio2 = pick(slots.sobremi_diferencial, loremBody());
  const cta = pick(slots.home_hero_cta, "Lorem ipsum");
  const finalCta = pick(slots.servicio_cta, "Lorem ipsum");
  const testimonialText = pick(slots.home_testimonio_1_texto, loremBodyLong());
  const testimonialName = pick(slots.home_testimonio_1_nombre, "Lorem Ipsum");
  const chooseCards = [
    {
      image: "/assets/skin1 home/Mask group.png",
      eyebrow: "Lorem",
      title: pick(slots.home_beneficio_1, loremShort()),
      body: loremBody(),
    },
    {
      image: "/assets/skin1 home/Mask group-1.png",
      eyebrow: "Ipsum",
      title: pick(slots.home_beneficio_2, loremShort()),
      body: loremBody(),
    },
    {
      image: "/assets/skin1 home/Mask group-2.png",
      eyebrow: "Dolor",
      title: pick(slots.home_beneficio_3, loremShort()),
      body: loremBody(),
    },
  ];

  return (
    <>
      <Header slots={slots} />

      <section className="photo-home-hero" aria-label={heroTitle}>
        <div className="photo-home-hero-copy">
          <p className="photo-home-kicker">{pick(slots.negocio_sector, "Fotografía")}</p>
          <h1>{heroTitle}</h1>
        </div>
      </section>

      <section className="photo-home-section photo-home-intro">
        <h2>{introTitle}</h2>
        <p>{introBody}</p>
      </section>

      <section className="photo-home-section photo-home-reason">
        <EditImg src="/assets/skin1 home/image 31.png" alt="Detalle editorial de la sesión" imgKey="home_reason" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div>
          <h2>{pick(slots.servicio_subtitulo, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")}</h2>
          <p>{pick(slots.servicio_para_quien, loremBodyLong())}</p>
        </div>
      </section>

      <div className="photo-home-separator" />

      <section className="photo-home-section photo-home-about">
        <EditImg src="/assets/skin1 home/image 19.png" alt={aboutName} imgKey="home_about" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div>
          <h2>{aboutName}</h2>
          <p>{aboutBio}</p>
          <p>{aboutBio2}</p>
          <span className="photo-home-button">{cta}</span>
        </div>
      </section>

      <div className="photo-home-separator" />

      <section className="photo-home-section">
        <div className="photo-home-choose-title">
          <div className="photo-home-eyebrow">Lorem ipsum</div>
        </div>
        <div className="photo-home-choose-grid">
          {chooseCards.map((card, i) => (
            <article className="photo-home-choose-card" key={card.title}>
              <EditImg src={card.image} alt={card.title} imgKey={`home_card_${i}`} editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
              <div className="photo-home-eyebrow">{card.eyebrow}</div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="photo-home-section photo-home-services" aria-label="Servicios">
        <div className="photo-home-mosaic">
          <EditImg src="/assets/skin1 home/Mask group-3.png" alt="Sesiones de boda" imgKey="home_mosaic_0" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="photo-home-service-tile"><h3>Lorem ipsum<br />dolor sit</h3></div>
          <EditImg src="/assets/skin1 home/image 31-1.png" alt="Sesiones familiares" imgKey="home_mosaic_1" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="photo-home-service-tile"><h3>Lorem ipsum<br />amet elit</h3></div>
          <EditImg src="/assets/skin1 home/Mask group-2.png" alt="Sesiones infantiles" imgKey="home_mosaic_2" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
          <div className="photo-home-service-tile"><h3>Lorem ipsum<br />consectetur</h3></div>
        </div>
      </section>

      <section className="photo-home-section photo-home-testimonial">
        <h2>{pick(slots.home_testimonio_2_texto, "Lorem ipsum dolor sit amet")}</h2>
        <blockquote>&ldquo;{testimonialText}&rdquo;</blockquote>
        <div className="photo-home-name">{testimonialName}</div>
      </section>

      <section className="photo-home-quote-band">
        <p>&ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit.&rdquo;</p>
      </section>

      <section className="photo-home-section photo-home-lead">
        <div className="photo-home-lead-inner">
          <div>
            <h2>{pick(slots.contacto_mensaje_intro, "Lorem ipsum dolor sit amet consectetur")}</h2>
            <p>{loremBody()}</p>
          </div>
          <div>
            <div className="photo-home-form-intro">{loremBody()}</div>
            <div className="photo-home-field">Nombre</div>
            <div className="photo-home-field">Email</div>
            <div className="photo-home-submit">Lorem ipsum</div>
          </div>
        </div>
      </section>

      <section className="photo-home-final">
        <div className="photo-home-final-card">
          <h2>{pick(slots.servicio_nombre, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")}</h2>
          <p>{pick(slots.contacto_metodo, loremBody())}</p>
          <span className="photo-home-button">{finalCta}</span>
        </div>
      </section>

      <Footer slots={slots} />
    </>
  );
}

function AboutPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const name = pick(slots.sobremi_nombre, "Lorem ipsum dolor sit amet");
  const lead = pick(slots.sobremi_bio_corta, loremBodyLong());
  const body = pick(slots.sobremi_diferencial, loremBodyLong());
  const cta = pick(slots.sobremi_cta, "Lorem ipsum");
  const detailItemsLeft = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
    "Deserunt mollit anim id est laborum et integer posuere erat a ante.",
  ];
  const detailItemsRight = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    "Ut labore et dolore magna aliqua ut enim ad minim veniam quis.",
    "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.",
  ];

  return (
    <>
      <Header slots={slots} />

      <section className="photo-about-hero">
        <EditImg src="/assets/skin2 sobre mi/Imagen.png" alt={name} imgKey="about_hero" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div className="photo-about-copy">
          <div className="photo-about-eyebrow">Lorem ipsum dolor sit</div>
          <h1>{name}</h1>
          <p className="photo-about-lead">{lead}</p>
          <p className="photo-about-body">{body}</p>
        </div>
      </section>

      <section className="photo-about-quote">
        <p>{loremBodyLong()} {loremBody()}</p>
      </section>

      <section className="photo-about-story">
        <EditImg src="/assets/skin2 sobre mi/image 32.png" alt="Polaroids de una boda" imgKey="about_story" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div>
          <p>{body}</p>
          <p>{loremBody()}</p>
          <img className="photo-about-signature" src="/assets/skin2 sobre mi/image 34.png" alt="Firma" />
        </div>
      </section>

      <section className="photo-about-bio">
        <h2>Lorem ipsum</h2>
        <p>{body}</p>
        <p>{lead}</p>
        <p>{loremBody()}</p>
      </section>

      <section className="photo-about-details-wrap">
        <div className="photo-about-details">
          <h2>Lorem ipsum<br />dolor sit</h2>
          <div className="photo-about-details-grid">
            <ol>
              {detailItemsLeft.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <ol>
              {detailItemsRight.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <section className="photo-home-section photo-home-lead">
        <div className="photo-home-lead-inner">
          <div>
            <div className="photo-about-small">Lorem ipsum</div>
            <h2>Lorem ipsum dolor sit amet consectetur</h2>
            <p>{loremBody()}</p>
          </div>
          <div>
            <div className="photo-home-form-intro">{loremBody()}</div>
            <div className="photo-home-field">Nombre</div>
            <div className="photo-home-field">Email</div>
            <div className="photo-home-submit">Lorem ipsum</div>
          </div>
        </div>
      </section>

      <section className="photo-about-final">
        <div className="photo-about-final-card">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>{loremBody()}</p>
          <span className="photo-home-button">{cta}</span>
        </div>
      </section>

      <Footer slots={slots} />
    </>
  );
}

function SessionsPage({ slots, editMode, overrides, onImageClick }: { slots: WebSlots } & EditProps) {
  const sessionTitle = pick(slots.servicio_nombre, "Lorem ipsum");
  const subtitle = pick(slots.servicio_subtitulo, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
  const paraQuien = pick(slots.servicio_para_quien, loremBodyLong());
  const featureOne = pick(slots.servicio_beneficio_1, loremShort());
  const featureTwo = pick(slots.servicio_beneficio_2, loremShort());
  const featureThree = pick(slots.servicio_beneficio_3, loremShort());
  const featureFour = pick(slots.servicio_caracteristicas, loremShort());
  const faq1 = pick(slots.servicio_faq_1_pregunta, "Lorem ipsum dolor sit amet?");
  const faq1b = pick(slots.servicio_faq_1_respuesta, "Consectetur adipiscing elit?");
  const faq2 = pick(slots.servicio_faq_2_pregunta, "Sed do eiusmod tempor?");
  const faq2b = pick(slots.servicio_faq_2_respuesta, "Ut labore et dolore magna?");
  const testimonial = pick(slots.servicio_testimonio_1_texto, loremBodyLong());
  const testimonialName = pick(slots.servicio_testimonio_1_nombre, "Lorem Ipsum");

  return (
    <>
      <Header slots={slots} />

      <section className="photo-sessions-hero">
        <div className="photo-sessions-hero-copy">
          <div className="photo-sessions-overline">Sesiones</div>
          <h1>{sessionTitle}</h1>
        </div>
      </section>

      <section className="photo-sessions-intro">
        <div className="photo-sessions-overline">Sesiones</div>
        <h2>{subtitle}</h2>
        <div className="photo-sessions-copy-grid">
          <p>{paraQuien}</p>
          <p>{loremBodyLong()}</p>
        </div>
      </section>

      <section className="photo-sessions-gallery">
        <EditImg src="/assets/skin1 sesiones/image 25.png" alt="Madre abrazando a su hija" imgKey="sessions_gallery_0" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <EditImg src="/assets/skin1 sesiones/image 26.png" alt="Niño leyendo en casa" imgKey="sessions_gallery_1" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
      </section>

      <div className="photo-sessions-button-row">
        <span className="photo-home-button">Ver más fotos de familias</span>
      </div>

      <section className="photo-sessions-features">
        <h2>¿Por qué elegir mis sesiones?</h2>
        <div className="photo-sessions-features-grid">
          <article><h3>{featureOne}</h3><p>{loremBody()}</p></article>
          <article><h3>{featureTwo}</h3><p>{loremBody()}</p></article>
          <article><h3>{featureThree}</h3><p>{loremBody()}</p></article>
          <article><h3>{featureFour}</h3><p>{loremBody()}</p></article>
        </div>
      </section>

      <section className="photo-sessions-info-wrap">
        <div className="photo-sessions-info">
          <h2>Lo que necesitas saber</h2>
          <p className="photo-sessions-script">Algunos detalles de la sesión</p>

          <div className="photo-sessions-info-grid">
            <article>
              <h3>Lugar</h3>
              <p>{loremBody()}</p>
            </article>
            <article>
              <h3>Vestuario</h3>
              <p>{loremBody()}</p>
            </article>
            <article>
              <h3>Duración</h3>
              <p>{loremBody()}</p>
            </article>
          </div>

          <div className="photo-sessions-info-divider" />

          <div className="photo-sessions-meta">
            <div>
              <h4>Inversión</h4>
              <div className="photo-sessions-price">400€</div>
              <p>Sesión familiar</p>
            </div>
            <div>
              <h4>Qué incluye</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet</li>
                <li>Consectetur adipiscing elit</li>
                <li>Sed do eiusmod tempor</li>
                <li>Ut labore et dolore magna</li>
              </ul>
            </div>
          </div>

          <span className="photo-home-button">Reserva tu sesión</span>
        </div>
      </section>

      <section className="photo-sessions-band">
        <div className="photo-sessions-band-card">
          <div className="photo-sessions-overline">Lorem ipsum</div>
          <h2>Lorem ipsum dolor sit amet</h2>
          <p>{loremBody()}</p>
          <span className="photo-home-button">Lorem ipsum</span>
        </div>
      </section>

      <section className="photo-sessions-fit">
        <div>
          <h3>Esta sesión es para ti si...</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</li>
            <li>Duis aute irure dolor in reprehenderit in voluptate velit.</li>
          </ul>
        </div>
        <div>
          <h3>Esta sesión no es para ti si...</h3>
          <ul>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</li>
            <li>Duis aute irure dolor in reprehenderit in voluptate velit.</li>
          </ul>
        </div>
      </section>

      <section className="photo-sessions-testimonial">
        <EditImg src="/assets/skin1 sesiones/image 30.png" alt="Niño mirando por una ventana" imgKey="sessions_testimonial" editMode={editMode} overrides={overrides} onImageClick={onImageClick} />
        <div>
          <h2>Lo que cuentan...</h2>
          <blockquote>&ldquo;{testimonial}&rdquo;</blockquote>
          <div className="photo-home-name">{testimonialName}</div>
        </div>
      </section>

      <section className="photo-sessions-faq">
        <h2>Preguntas frecuentes</h2>
        <div className="photo-sessions-faq-grid">
          {[faq1, faq1b, faq2, faq2b, "¿Cuántas fotos recibiré y en qué formato?", "¿Ofreces paquetes o sesiones personalizadas?"].map((item) => (
            <div className="photo-sessions-faq-item" key={item}>
              <span>{item}</span>
              <span className="photo-sessions-plus" />
            </div>
          ))}
        </div>
      </section>

      <section className="photo-home-section photo-home-lead">
        <div className="photo-home-lead-inner">
          <div>
            <div className="photo-about-small">Lorem ipsum</div>
            <h2>Lorem ipsum dolor sit amet consectetur</h2>
            <p>{loremBody()}</p>
          </div>
          <div>
            <div className="photo-home-form-intro">{loremBody()}</div>
            <div className="photo-home-field">Nombre</div>
            <div className="photo-home-field">Email</div>
            <div className="photo-home-submit">Lorem ipsum</div>
          </div>
        </div>
      </section>

      <section className="photo-sessions-final">
        <div className="photo-about-final-card">
          <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
          <p>{loremBody()}</p>
          <span className="photo-home-button">Lorem ipsum</span>
        </div>
      </section>

      <Footer slots={slots} />
    </>
  );
}

export default function Skin1({ slots, mobile, page = "home", editMode, onImageClick, imageOverrides }: Props) {
  return (
    <div className={`photo-home ${mobile ? "photo-home-preview-mobile" : ""}`}>
      <div className="photo-home-shell">
        {page === "home" && <HomePage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
        {page === "about" && <AboutPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
        {page === "sessions" && <SessionsPage slots={slots} editMode={editMode} overrides={imageOverrides} onImageClick={onImageClick} />}
      </div>
    </div>
  );
}
