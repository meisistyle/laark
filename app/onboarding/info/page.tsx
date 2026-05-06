"use client";

import Link from "next/link";

export default function OnboardingInfo() {
  return (
    <div className="ob-page">
      <div className="ob-photo ob-photo--2">
        <div className="ob-photo-logo">
          <img src="/assets/LAARK logo vert.png" alt="LAARK" />
        </div>
      </div>

      <div className="ob-content">
        <p className="ob-eyebrow">Antes de empezar</p>
        <h1 className="ob-title">Una cosa<br />importante.</h1>
        <p className="ob-desc">
          El proceso tiene dos momentos: primero hablamos, luego subes las fotos.
          Te avisamos cuando llegue ese momento — pero mejor que las tengas a mano.
        </p>
        <div className="ob-notice">
          <strong>Las fotos no necesitan ser perfectas.</strong> Pueden estar sin recortar,
          sin editar, como las tengas en el móvil o en cualquier carpeta.
          Nosotras nos encargamos del resto.
        </div>
        <p className="ob-desc" style={{ fontSize: "13px", marginBottom: 0 }}>
          Si en algún momento necesitas salir, puedes pausar y volver donde lo dejaste.
          Tu progreso se guarda automáticamente.
        </p>
        <div className="ob-btn-row" style={{ marginTop: "28px" }}>
          <Link className="ob-btn-primary" href="/onboarding/diseno">Entendido, vamos</Link>
          <Link className="ob-btn-secondary" href="/onboarding">Atrás</Link>
        </div>
      </div>
    </div>
  );
}
