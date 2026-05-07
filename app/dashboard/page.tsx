"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProject, getAllProjects, createNewProject } from "@/lib/storage";
import { LaarkProject, CreationStep } from "@/lib/slots";

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

const PROJECT_IMAGES = [
  "/assets/IMÁGENES/Mask group.png",
  "/assets/IMÁGENES/Mask group-2.png",
  "/assets/IMÁGENES/Mask group-4.png",
  "/assets/IMÁGENES/Mask group-6.png",
];

function stepIndex(s: CreationStep) { return STEP_ORDER.indexOf(s); }

function isOnline(p: LaarkProject) {
  return stepIndex(p.currentStep) >= stepIndex("done");
}

export default function DashboardHome() {
  const router = useRouter();
  const [projects, setProjects]   = useState<LaarkProject[]>([]);
  const [currentStep, setCurrentStep] = useState<CreationStep>("onboarding");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const p   = getProject();
    const all = getAllProjects();
    setProjects(all);
    setCurrentStep(p.currentStep);
    if (!localStorage.getItem(TOOLTIP_KEY)) setShowTooltip(true);
  }, []);

  function dismissTooltip() {
    localStorage.setItem(TOOLTIP_KEY, "true");
    setShowTooltip(false);
  }

  function handleCreateWeb() {
    const p = getProject();
    if (p.currentStep !== "onboarding") createNewProject();
    router.push("/onboarding");
  }

  const notStarted = currentStep === "onboarding";
  const resumeUrl  = RESUME_URL[currentStep] ?? null;

  return (
    <>
      {/* ── Welcome tooltip ── */}
      {showTooltip && (
        <div className="db-tooltip-overlay" onClick={dismissTooltip}>
          <div className="db-tooltip-card" onClick={e => e.stopPropagation()}>
            <p className="db-tooltip-eyebrow">Bienvenida a LAARK</p>
            <h2 className="db-tooltip-title">Este es tu espacio.</h2>
            <p className="db-tooltip-body">
              Desde aquí controlas todo — tu web, tu contenido, tu dominio y tu diseño.
              Cuando estés lista, pulsa <strong>Crear mi web</strong> para empezar.
            </p>
            <button className="db-tooltip-btn" onClick={dismissTooltip}>Entendido</button>
          </div>
        </div>
      )}

      <div className="dbhome-layout">
        {/* ── Left: photo panel ── */}
        <div className="dbhome-visual">
          <img
            className="dbhome-visual-img"
            src="/assets/DASHBOARD/image-112.jpg"
            alt=""
          />
          <div className="dbhome-hello">
            <span>Hola,</span>
          </div>
        </div>

        {/* ── Right: content ── */}
        <div className="dbhome-content">

          {/* Top bar */}
          <div className="dbhome-topbar">
            <h1 className="dbhome-title">Tus webs</h1>
            <button className="dbhome-new-btn" type="button" onClick={handleCreateWeb}>
              Nueva web
            </button>
          </div>

          {/* Empty state */}
          {notStarted ? (
            <div className="db-empty-state">
              <p className="db-empty-eyebrow">Tu web</p>
              <h2 className="db-empty-title">Aún no has<br />creado tu web.</h2>
              <p className="db-empty-desc">
                En 15 minutos tienes una web publicada y lista para compartir.
              </p>
              <button className="db-create-btn" onClick={handleCreateWeb}>
                Crear mi web
              </button>
            </div>
          ) : (
            <div className="dbhome-cards-grid">
              {projects.map((p, i) => {
                const name   = p.slots.negocio_nombre || "Mi proyecto";
                const online = isOnline(p);
                const thumb  = PROJECT_IMAGES[i % PROJECT_IMAGES.length];
                const isActive = p.currentStep !== "onboarding";
                return (
                  <article className="dbhome-card" key={p.project_id}>
                    {/* Photo */}
                    <div className="dbhome-card-photo">
                      {isActive && <img src={thumb} alt={name} />}
                      <div className="dbhome-status-badge">
                        <span className={`dbhome-status-dot${online ? " is-online" : ""}`} />
                        <span className="dbhome-status-label">
                          {online ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="dbhome-card-info">
                      <h2 className="dbhome-card-name">{name}</h2>
                      <nav className="dbhome-card-links">
                        <Link href="/dashboard/imagenes">Imágenes</Link>
                        <Link href="/dashboard/contenido">Contenidos</Link>
                        <Link href="/dashboard/dominio">Dominio</Link>
                      </nav>
                    </div>
                  </article>
                );
              })}

              {/* Resume CTA */}
              {resumeUrl && (
                <div className="dbhome-resume-row">
                  <Link href={resumeUrl} className="dbhome-resume-btn">
                    Continuar donde lo dejé →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
