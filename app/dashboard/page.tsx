"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { WebSlots, SkinName, countFilledSlots, totalSlots } from "@/lib/slots";
import { getProject, setSkin } from "@/lib/storage";
import ChatPanel from "@/components/ChatPanel";
import SkinPreview from "@/components/SkinPreview";

type Section = "mi-web" | "contenido" | "disenos" | "imagenes" | "dominio" | "cuenta";
type IconName = "home" | "chat" | "palette" | "image" | "globe" | "user" | "external" | "monitor" | "phone" | "check" | "arrow" | "upload" | "download" | "chevronLeft" | "chevronRight";

const NAV: { id: Section; icon: IconName; label: string; hint: string }[] = [
  { id: "mi-web", icon: "home", label: "Mi web", hint: "Resumen y próximos pasos" },
  { id: "contenido", icon: "chat", label: "Contenido", hint: "Conversación con la IA" },
  { id: "disenos", icon: "palette", label: "Diseños", hint: "Skins disponibles" },
  { id: "imagenes", icon: "image", label: "Imágenes", hint: "Fotos y logo" },
  { id: "dominio", icon: "globe", label: "Dominio", hint: "URL y dominio propio" },
  { id: "cuenta", icon: "user", label: "Cuenta", hint: "Plan y datos" },
];

const SKINS: { name: SkinName; desc: string; bg: string; color: string }[] = [
  { name: "Luminous", desc: "Cálido, editorial, orgánico", bg: "linear-gradient(160deg,#F0EBE3,#D4C5B5)", color: "#4A3728" },
  { name: "Fresco", desc: "Limpio, fresco, profesional", bg: "linear-gradient(160deg,#E8EDF0,#B5C9D4)", color: "#2B3E4A" },
  { name: "Calma", desc: "Neutro, elegante, atemporal", bg: "linear-gradient(160deg,#F0EDE8,#C9C4B4)", color: "#3A3528" },
];

const IMAGE_GALLERY = [
  { src: "/assets/IMÁGENES/Mask group.png", alt: "Imagen vertical del proyecto", shape: "tall" },
  { src: "/assets/IMÁGENES/Mask group-1.png", alt: "Imagen horizontal del proyecto", shape: "short" },
  { src: "/assets/IMÁGENES/Mask group-2.png", alt: "Imagen del proyecto", shape: "medium" },
  { src: "/assets/IMÁGENES/Mask group-3.png", alt: "Imagen vertical del proyecto", shape: "mid" },
  { src: "/assets/IMÁGENES/Mask group-4.png", alt: "Imagen vertical del proyecto", shape: "tall" },
  { src: "/assets/IMÁGENES/Mask group-5.png", alt: "Imagen del proyecto", shape: "short" },
  { src: "/assets/IMÁGENES/Mask group-6.png", alt: "Imagen del proyecto", shape: "medium" },
  { src: "/assets/IMÁGENES/Mask group-7.png", alt: "Imagen horizontal del proyecto", shape: "short" },
  { src: "/assets/IMÁGENES/Mask group-8.png", alt: "Imagen del proyecto", shape: "mid" },
  { src: "/assets/IMÁGENES/Mask group-9.png", alt: "Imagen horizontal del proyecto", shape: "short" },
  { src: "/assets/IMÁGENES/Mask group-10.png", alt: "Imagen horizontal del proyecto", shape: "short" },
  { src: "/assets/IMÁGENES/Mask group-11.png", alt: "Imagen horizontal del proyecto", shape: "short" },
];

const DASHBOARD_PAGES = [
  { name: "Inicio", status: "ready" },
  { name: "Sobre mí", status: "missing" },
  { name: "Servicios", status: "ready" },
  { name: "Contacto", status: "ready" },
];

function Icon({ name }: { name: IconName }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  return (
    <svg className="dashboard-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "home" && <><path {...common} d="M4 10.5 12 4l8 6.5" /><path {...common} d="M6.5 9.5V20h11V9.5" /><path {...common} d="M10 20v-6h4v6" /></>}
      {name === "chat" && <><path {...common} d="M5 6.5h14v9H9l-4 3v-12Z" /><path {...common} d="M8 10h8" /><path {...common} d="M8 13h5" /></>}
      {name === "palette" && <><path {...common} d="M12 4a8 8 0 0 0 0 16h1.2a1.8 1.8 0 0 0 1.3-3.1 1.8 1.8 0 0 1 1.3-3.1H18a2 2 0 0 0 2-2A8 8 0 0 0 12 4Z" /><path {...common} d="M8.5 10h.01M11 7.5h.01M15 8.5h.01" /></>}
      {name === "image" && <><rect {...common} x="4" y="5" width="16" height="14" rx="1" /><path {...common} d="m7 16 3.5-4 3 3 2-2.5L18 16" /><path {...common} d="M8.5 8.5h.01" /></>}
      {name === "globe" && <><circle {...common} cx="12" cy="12" r="8" /><path {...common} d="M4 12h16" /><path {...common} d="M12 4a11 11 0 0 1 0 16 11 11 0 0 1 0-16Z" /></>}
      {name === "user" && <><circle {...common} cx="12" cy="8" r="3.2" /><path {...common} d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>}
      {name === "external" && <><path {...common} d="M10 6H6v12h12v-4" /><path {...common} d="M13 5h6v6" /><path {...common} d="m11 13 8-8" /></>}
      {name === "monitor" && <><rect {...common} x="4" y="5" width="16" height="11" rx="1" /><path {...common} d="M9 20h6" /><path {...common} d="M12 16v4" /></>}
      {name === "phone" && <><rect {...common} x="8" y="3.5" width="8" height="17" rx="2" /><path {...common} d="M11 17.5h2" /></>}
      {name === "check" && <path {...common} d="m5 12 4 4 10-10" />}
      {name === "arrow" && <><path {...common} d="M5 12h14" /><path {...common} d="m13 6 6 6-6 6" /></>}
      {name === "upload" && <><path {...common} d="M12 16V5" /><path {...common} d="m8 9 4-4 4 4" /><path {...common} d="M5 17v2h14v-2" /></>}
      {name === "download" && <><path {...common} d="M12 5v11" /><path {...common} d="m8 12 4 4 4-4" /><path {...common} d="M5 19h14" /></>}
      {name === "chevronLeft" && <path {...common} d="m15 5-7 7 7 7" />}
      {name === "chevronRight" && <path {...common} d="m9 5 7 7-7 7" />}
    </svg>
  );
}

function SectionHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <header className="dashboard-topbar">
      <div>
        {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
      {action && <div className="dashboard-topbar-action">{action}</div>}
    </header>
  );
}

export default function Dashboard() {
  const [section, setSection] = useState<Section>("mi-web");
  const [mobile, setMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<(typeof IMAGE_GALLERY)[number] | null>(null);
  const [slots, setSlots] = useState<WebSlots | null>(null);
  const [skin, setSkinState] = useState<SkinName>("Luminous");
  const [chatCount, setChatCount] = useState(0);

  useEffect(() => {
    const project = getProject();
    setSlots(project.slots);
    setSkinState(project.skin);
    setChatCount(project.chatHistory.length);
  }, []);

  function handleSlotsUpdate(partial: Partial<WebSlots>) {
    setSlots(prev => prev ? { ...prev, ...partial } : prev);
  }

  function handleSkinChange(nextSkin: SkinName) {
    setSkinState(nextSkin);
    setSkin(nextSkin);
  }

  const filledSlots = slots ? countFilledSlots(slots) : 0;
  const totalActiveSlots = totalSlots();
  const progress = totalActiveSlots ? Math.round((filledSlots / totalActiveSlots) * 100) : 0;
  const businessName = slots?.negocio_nombre || "Tu proyecto";
  const subdomain = (businessName.toLowerCase().replace(/\s/g, "") || "tunegocio") + ".laark.io";
  const nextSection: Section = progress < 20 ? "contenido" : progress < 55 ? "disenos" : progress < 80 ? "imagenes" : "dominio";
  const selectedImageIndex = selectedImage ? IMAGE_GALLERY.findIndex((image) => image.src === selectedImage.src) : -1;

  function showAdjacentImage(direction: -1 | 1) {
    if (selectedImageIndex < 0) return;
    const nextIndex = (selectedImageIndex + direction + IMAGE_GALLERY.length) % IMAGE_GALLERY.length;
    setSelectedImage(IMAGE_GALLERY[nextIndex]);
  }

  return (
    <div className={"laark-dashboard " + (section === "mi-web" ? "is-home" : "")}>
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" href="/" aria-label="Volver a la home de LAARK">
          <img src="/assets/LAARK logo horiz.png" alt="LAARK" />
        </Link>

        <div className="dashboard-account-card">
          <div>
            <p>Proyecto activo</p>
            <strong>{businessName}</strong>
          </div>
          <span>{progress}%</span>
        </div>

        <div className="dashboard-cache-note">
          <small>{filledSlots} campos · {chatCount} mensajes</small>
        </div>

        <nav className="dashboard-nav" aria-label="Navegación del dashboard">
          <p className="dashboard-nav-label">Tu web</p>
          {NAV.map(item => (
            <button
              key={item.id}
              className={"dashboard-nav-item " + (section === item.id ? "is-active" : "")}
              onClick={() => setSection(item.id)}
              type="button"
            >
              <Icon name={item.icon} />
              <span>
                <strong>{item.label}</strong>
                <small>{item.hint}</small>
              </span>
            </button>
          ))}
        </nav>

        <Link className="dashboard-exit" href="/">
          <Icon name="arrow" />
          Salir a la home
        </Link>
      </aside>

      <main className="dashboard-main">
        {section === "contenido" && (
          <section className="dashboard-workspace dashboard-workspace-chat">
            <div className="dashboard-chat-shell">
              <div className="dashboard-flow-note">
                <span>Paso 1</span>
                <strong>Contenido</strong>
                <small>Empieza por la conversación inicial para crear la estructura y los textos.</small>
              </div>
              <ChatPanel onSlotsUpdate={handleSlotsUpdate} />
            </div>

            <div className="dashboard-preview-shell">
              <div className="dashboard-preview-bar">
                <div>
                  <p className="dashboard-eyebrow">Preview en tiempo real</p>
                  <h1>{businessName}</h1>
                </div>
                <div className="dashboard-preview-actions">
                  <span className="dashboard-live-status"><span /> En vivo</span>
                  <div className="dashboard-device-toggle" aria-label="Formato de preview">
                    <button className={!mobile ? "is-active" : ""} onClick={() => setMobile(false)} type="button"><Icon name="monitor" /> Escritorio</button>
                    <button className={mobile ? "is-active" : ""} onClick={() => setMobile(true)} type="button"><Icon name="phone" /> Móvil</button>
                  </div>
                </div>
              </div>
              <div className="dashboard-preview-canvas">
                {slots && <div className={mobile ? "dashboard-preview-mobile" : "dashboard-preview-desktop"}>
                  <SkinPreview slots={slots} skin={skin} mobile={mobile} />
                </div>}
              </div>
            </div>
          </section>
        )}

        {section === "mi-web" && (
          <section className="dashboard-preview" aria-label="Panel inicial LAARK">
            <section className="preview-visual-panel" aria-label="Bienvenida">
              <img
                className="preview-hero-image"
                src="/assets/DASHBOARD/image-112.jpg"
                alt="Escena luminosa de costa"
              />
              <img
                className="preview-logo-main"
                src="/assets/DASHBOARD/LAARK logo horiz 2.png"
                alt="LAARK"
              />
              <h1 className="preview-hello">
                Hola,
                <br />
                Laura
              </h1>
            </section>

            <section className="preview-panel" aria-label="Panel de control LAARK">
              <article className="preview-project-card">
                <img
                  className="preview-project-thumb"
                  src="/assets/DASHBOARD/image 113.png"
                  alt="Casa Oliva Studio"
                />
                <div className="preview-project-info">
                  <div className="preview-eyebrow">Proyectos</div>
                  <div className="preview-project-name">Casa Oliva Studio</div>
                  <div className="preview-project-status">En proceso</div>
                  <Link className="preview-arrow-next" href="/web-preview" aria-label="Ver la web generada" />
                </div>
              </article>

              <section className="preview-status-area">
                <div className="preview-status-left">
                  <div className="preview-progress-heading">
                    <div className="preview-progress-number">4</div>
                    <div className="preview-eyebrow preview-progress-word">Pasos</div>
                  </div>

                  <div className="preview-steps-line" aria-label="Progreso de creación">
                    <div className="preview-step-dot is-done">
                      <div className="preview-dot">1</div>
                      <div className="preview-step-label">Texto</div>
                    </div>
                    <div className="preview-step-dot is-current">
                      <div className="preview-dot">2</div>
                      <div className="preview-step-label">Fotos</div>
                    </div>
                    <div className="preview-step-dot">
                      <div className="preview-dot">3</div>
                      <div className="preview-step-label">Diseño</div>
                    </div>
                    <div className="preview-step-dot">
                      <div className="preview-dot">4</div>
                      <div className="preview-step-label">Publicar</div>
                    </div>
                  </div>

                  <div className="preview-section-rule" />

                  <nav className="preview-menu-grid" aria-label="Secciones del proyecto">
                    <button className="preview-menu-item" type="button" onClick={() => setSection("contenido")}>
                      <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame.png" alt="" />
                      Contenido
                    </button>
                    <button className="preview-menu-item" type="button" onClick={() => setSection("dominio")}>
                      <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-2.png" alt="" />
                      Dominio
                    </button>
                    <button className="preview-menu-item" type="button" onClick={() => setSection("imagenes")}>
                      <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-1.png" alt="" />
                      Imágenes
                    </button>
                    <button className="preview-menu-item" type="button" onClick={() => setSection("cuenta")}>
                      <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-3.png" alt="" />
                      Cuenta
                    </button>
                  </nav>

                  <div className="preview-section-rule" />
                </div>

                <aside className="preview-design-card-wrap" aria-label="Diseño seleccionado">
                  <div className="preview-eyebrow preview-design-title">Tu diseño</div>
                  <article className="preview-skin-card">
                    <img className="preview-skin-badge" src="/assets/DASHBOARD/Frame2.png" alt="Seleccionado" />
                    <img className="preview-skin-img" src="/assets/DASHBOARD/RENACIMIENTO76.png" alt="Diseño Luminoso" />
                    <div className="preview-skin-name">Luminoso</div>
                  </article>
                </aside>
              </section>

              <section className="preview-pages-area" aria-label="Páginas de la web">
                <div className="preview-eyebrow preview-pages-title">Páginas</div>
                <div className="preview-pages-list">
                  {DASHBOARD_PAGES.map((page) => (
                    <article className="preview-page-item" key={page.name}>
                      <div className="preview-page-status">
                        {page.status === "ready" ? (
                          <span className="preview-page-check">✓</span>
                        ) : (
                          <span className="preview-page-dots"><i /><i /><i /></span>
                        )}
                      </div>
                      <div className="preview-page-name">{page.name}</div>
                      {page.status === "missing" && <div className="preview-missing-pill">Faltan fotos</div>}
                    </article>
                  ))}
                </div>
              </section>
            </section>
          </section>
        )}

        {section === "disenos" && (
          <section className="dashboard-section">
            <SectionHeader title="Diseños" eyebrow="Skins" />
            <div className="dashboard-skin-grid">
              {SKINS.map(option => (
                <article key={option.name} className={"dashboard-skin-card " + (skin === option.name ? "is-active" : "")}>
                  <button type="button" onClick={() => handleSkinChange(option.name)}>
                    <span className="dashboard-skin-preview" style={{ background: option.bg, color: option.color }}>{option.name}</span>
                    <span className="dashboard-skin-copy">
                      <strong>{option.name}</strong>
                      <small>{option.desc}</small>
                    </span>
                    {skin === option.name && <span className="dashboard-status-pill">Activo</span>}
                  </button>
                </article>
              ))}
            </div>
            <article className="dashboard-card dashboard-preview-card">
              {slots && <SkinPreview slots={slots} skin={skin} />}
            </article>
          </section>
        )}

        {section === "imagenes" && (
          <section className="dashboard-images-screen" aria-label="Imágenes del proyecto">
            <header className="dashboard-images-header">
              <div>
                <p>Imágenes</p>
              </div>
              <button className="dashboard-images-upload" type="button">
                <Icon name="upload" />
                Subir fotos
              </button>
            </header>

            <article className="dashboard-photo-dropzone">
              <div>
                <span>Paso 2</span>
                <h2>Sube todas tus fotos juntas</h2>
                <p>LAARK las guardará como biblioteca visual del proyecto. Después se podrán asignar, recortar y adaptar a las secciones de la web.</p>
              </div>
              <button className="dashboard-photo-dropzone-action" type="button">
                <Icon name="upload" />
                Elegir fotos
              </button>
            </article>

            <div className="dashboard-images-grid">
              {IMAGE_GALLERY.map((image) => (
                <figure className={`dashboard-image-tile is-${image.shape}`} key={image.src}>
                  <button type="button" onClick={() => setSelectedImage(image)}>
                    <img src={image.src} alt={image.alt} />
                  </button>
                </figure>
              ))}
            </div>

            {selectedImage && (
              <div className="dashboard-image-modal" role="dialog" aria-modal="true" aria-label="Vista de imagen">
                <button className="dashboard-image-modal-backdrop" type="button" onClick={() => setSelectedImage(null)} aria-label="Cerrar" />
                <article className="dashboard-image-modal-card">
                  <button className="dashboard-image-modal-close" type="button" onClick={() => setSelectedImage(null)} aria-label="Cerrar">×</button>
                  <button className="dashboard-image-modal-arrow is-prev" type="button" onClick={() => showAdjacentImage(-1)} aria-label="Imagen anterior">
                    <Icon name="chevronLeft" />
                  </button>
                  <button className="dashboard-image-modal-arrow is-next" type="button" onClick={() => showAdjacentImage(1)} aria-label="Imagen siguiente">
                    <Icon name="chevronRight" />
                  </button>
                  <a className="dashboard-image-download" href={selectedImage.src} download aria-label="Descargar imagen">
                    <Icon name="download" />
                  </a>
                  <img src={selectedImage.src} alt={selectedImage.alt} />
                </article>
              </div>
            )}
          </section>
        )}

        {section === "dominio" && (
          <section className="dashboard-section dashboard-section-narrow">
            <SectionHeader title="Dominio" eyebrow="Publicación" />
            <article className="dashboard-card dashboard-domain-card">
              <span className="dashboard-live-status"><span /> Online</span>
              <h2>{subdomain}</h2>
              <p>Tu web nace en un subdominio LAARK. Cuando quieras, puedes conectar tu propio dominio.</p>
              <button className="dashboard-button dashboard-button-outline"><Icon name="external" /> Ver web</button>
            </article>
            <article className="dashboard-card">
              <p className="dashboard-eyebrow">Dominio propio</p>
              <h2>Conectar un .com</h2>
              <p className="dashboard-muted-text">Cuando tengas tu dominio, lo apuntamos desde aquí. El tutorial está pensado para hacerlo en unos 10 minutos.</p>
              <div className="dashboard-form-row">
                <input type="text" placeholder="tunegocio.com" />
                <button className="dashboard-button" type="button">Conectar</button>
              </div>
            </article>
          </section>
        )}

        {section === "cuenta" && (
          <section className="dashboard-section dashboard-section-narrow">
            <SectionHeader title="Mi cuenta" eyebrow="Ajustes" />
            <article className="dashboard-card">
              <p className="dashboard-eyebrow">Plan</p>
              <h2>Estándar · 1 web</h2>
              <p className="dashboard-muted-text">Pago único realizado · acceso de por vida.</p>
            </article>
            <article className="dashboard-card">
              <p className="dashboard-eyebrow">Datos personales</p>
              <div className="dashboard-form-grid">
                <label>Nombre<input type="text" placeholder="Tu nombre" /></label>
                <label>Email<input type="email" placeholder="tu@email.com" /></label>
              </div>
              <button className="dashboard-button dashboard-button-outline" type="button">Guardar cambios</button>
            </article>
          </section>
        )}
      </main>
    </div>
  );
}
