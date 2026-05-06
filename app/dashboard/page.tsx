"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProject } from "@/lib/storage";

const PAGES = [
  { name: "Inicio",    status: "ready"   },
  { name: "Sobre mí", status: "missing" },
  { name: "Servicios", status: "ready"   },
  { name: "Contacto",  status: "ready"   },
];

export default function DashboardHome() {
  const [businessName, setBusinessName] = useState("Casa Oliva Studio");

  useEffect(() => {
    const p = getProject();
    if (p.slots.negocio_nombre) setBusinessName(p.slots.negocio_nombre);
  }, []);

  return (
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
            alt={businessName}
          />
          <div className="preview-project-info">
            <div className="preview-eyebrow">Proyectos</div>
            <div className="preview-project-name">{businessName}</div>
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
              <Link className="preview-menu-item" href="/dashboard/contenido">
                <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame.png" alt="" />
                Contenido
              </Link>
              <Link className="preview-menu-item" href="/dashboard/dominio">
                <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-2.png" alt="" />
                Dominio
              </Link>
              <Link className="preview-menu-item" href="/dashboard/imagenes">
                <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-1.png" alt="" />
                Imágenes
              </Link>
              <Link className="preview-menu-item" href="/dashboard/cuenta">
                <img className="preview-menu-icon" src="/assets/DASHBOARD/Frame-3.png" alt="" />
                Cuenta
              </Link>
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
            {PAGES.map(page => (
              <article className="preview-page-item" key={page.name}>
                <div className="preview-page-status">
                  {page.status === "ready"
                    ? <span className="preview-page-check">✓</span>
                    : <span className="preview-page-dots"><i /><i /><i /></span>
                  }
                </div>
                <div className="preview-page-name">{page.name}</div>
                {page.status === "missing" && <div className="preview-missing-pill">Faltan fotos</div>}
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}
