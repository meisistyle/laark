"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProject, createNewProject } from "@/lib/storage";
import { CreationStep } from "@/lib/slots";

const TOOLTIP_KEY = "laark_tooltip_seen";

const STEP_ORDER: CreationStep[] = [
  "onboarding", "chat", "photos", "generating", "reveal", "dominio", "edit", "done",
];

const RESUME_URL: Partial<Record<CreationStep, string>> = {
  chat:       "/chat",
  photos:     "/photos",
  generating: "/generating",
  reveal:     "/reveal",
  dominio:    "/dominio",
  edit:       "/edit",
};

const PAGES = [
  { name: "Inicio",    status: "ready"   },
  { name: "Sobre mí", status: "missing" },
  { name: "Servicios", status: "ready"   },
  { name: "Contacto",  status: "ready"   },
];

function stepIndex(s: CreationStep) { return STEP_ORDER.indexOf(s); }

export default function DashboardHome() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("Casa Oliva Studio");
  const [currentStep, setCurrentStep]   = useState<CreationStep>("onboarding");
  const [showTooltip, setShowTooltip]   = useState(false);

  useEffect(() => {
    const p = getProject();
    if (p.slots.negocio_nombre) setBusinessName(p.slots.negocio_nombre);
    setCurrentStep(p.currentStep);

    // Show tooltip only on first visit
    if (!localStorage.getItem(TOOLTIP_KEY)) setShowTooltip(true);
  }, []);

  function dismissTooltip() {
    localStorage.setItem(TOOLTIP_KEY, "true");
    // Supabase: update users set first_login_seen = true where id = user.id
    setShowTooltip(false);
  }

  function handleCreateWeb() {
    // If project hasn't started yet, reuse it; otherwise create a new one
    const p = getProject();
    if (p.currentStep !== "onboarding") createNewProject();
    router.push("/onboarding");
  }

  const notStarted = currentStep === "onboarding";
  const idx        = stepIndex(currentStep);
  const step1Done  = idx > stepIndex("chat");
  const step2Done  = idx > stepIndex("photos");
  const step3Done  = idx > stepIndex("reveal");
  const step4Done  = currentStep === "done";
  const step1Curr  = currentStep === "chat";
  const step2Curr  = currentStep === "photos";
  const step3Curr  = currentStep === "generating" || currentStep === "reveal";
  const step4Curr  = currentStep === "dominio" || currentStep === "edit";
  const resumeUrl  = RESUME_URL[currentStep] ?? null;

  return (
    <>
      {/* ── Welcome tooltip overlay ── */}
      {showTooltip && (
        <div className="db-tooltip-overlay" onClick={dismissTooltip}>
          <div className="db-tooltip-card" onClick={e => e.stopPropagation()}>
            <p className="db-tooltip-eyebrow">Bienvenida a LAARK</p>
            <h2 className="db-tooltip-title">Este es tu espacio.</h2>
            <p className="db-tooltip-body">
              Desde aquí controlas todo — tu web, tu contenido, tu dominio y tu diseño.
              Cuando estés lista, pulsa <strong>Crear mi web</strong> para empezar.
            </p>
            <button className="db-tooltip-btn" onClick={dismissTooltip}>
              Entendido
            </button>
          </div>
        </div>
      )}

      <section className="dashboard-preview" aria-label="Panel inicial LAARK">
        <section className="preview-visual-panel" aria-label="Bienvenida">
          <img className="preview-hero-image" src="/assets/DASHBOARD/image-112.jpg" alt="" />
          <img className="preview-logo-main"  src="/assets/DASHBOARD/LAARK logo horiz 2.png" alt="LAARK" />
          <h1 className="preview-hello">Hola,<br />Laura</h1>
        </section>

        <section className="preview-panel" aria-label="Panel de control LAARK">

          {/* ── Empty state: no project started yet ── */}
          {notStarted ? (
            <div className="db-empty-state">
              <p className="db-empty-eyebrow">Tu web</p>
              <h2 className="db-empty-title">Aún no has<br />creado tu web.</h2>
              <p className="db-empty-desc">
                En 15 minutos tienes una web publicada y lista para compartir.
                Solo necesitas contarme sobre tu trabajo.
              </p>
              <button className="db-create-btn" onClick={handleCreateWeb}>
                Crear mi web
              </button>
            </div>
          ) : (
            <>
              <article className="preview-project-card">
                <img className="preview-project-thumb" src="/assets/DASHBOARD/image 113.png" alt={businessName} />
                <div className="preview-project-info">
                  <div className="preview-eyebrow">Proyectos</div>
                  <div className="preview-project-name">{businessName}</div>
                  <div className="preview-project-status">
                    {step4Done ? "Publicada" : "En proceso"}
                  </div>
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
                    <div className={`preview-step-dot${step1Done ? " is-done" : step1Curr ? " is-current" : ""}`}>
                      <div className="preview-dot">1</div>
                      <div className="preview-step-label">Texto</div>
                    </div>
                    <div className={`preview-step-dot${step2Done ? " is-done" : step2Curr ? " is-current" : ""}`}>
                      <div className="preview-dot">2</div>
                      <div className="preview-step-label">Fotos</div>
                    </div>
                    <div className={`preview-step-dot${step3Done ? " is-done" : step3Curr ? " is-current" : ""}`}>
                      <div className="preview-dot">3</div>
                      <div className="preview-step-label">Diseño</div>
                    </div>
                    <div className={`preview-step-dot${step4Done ? " is-done" : step4Curr ? " is-current" : ""}`}>
                      <div className="preview-dot">4</div>
                      <div className="preview-step-label">Publicar</div>
                    </div>
                  </div>

                  {resumeUrl && (
                    <Link
                      href={resumeUrl}
                      style={{
                        display: "inline-block",
                        marginTop: 16,
                        padding: "10px 20px",
                        background: "#1A140A",
                        color: "#F2EDE3",
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        borderRadius: 1,
                      }}
                    >
                      Continuar donde lo dejé →
                    </Link>
                  )}

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
                    <img className="preview-skin-badge" src="/assets/DASHBOARD/Frame2.png"      alt="Seleccionado" />
                    <img className="preview-skin-img"   src="/assets/DASHBOARD/RENACIMIENTO76.png" alt="Diseño Luminoso" />
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
            </>
          )}
        </section>
      </section>
    </>
  );
}
