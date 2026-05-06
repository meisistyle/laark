"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OnboardingBienvenida() {
  const router = useRouter();

  return (
    <div className="ob-page">
      <div className="ob-photo ob-photo--1">
        <div className="ob-photo-logo">
          <img src="/assets/LAARK logo vert.png" alt="LAARK" />
        </div>
      </div>

      <div className="ob-content">
        <p className="ob-eyebrow">Bienvenida</p>
        <h1 className="ob-title">Tu web se va a<br />hacer sola.</h1>
        <p className="ob-desc">
          En tres pasos y sin tocar código, LAARK convierte una conversación
          contigo en una web publicada y lista para compartir.
        </p>
        <ul className="ob-checklist">
          <li>
            <div className="ob-check-num">1</div>
            <div>
              <strong>Hablamos</strong>
              Te hago preguntas. Tú cuentas. La IA extrae el contenido de tu web.
            </div>
          </li>
          <li>
            <div className="ob-check-num">2</div>
            <div>
              <strong>Subes tus fotos</strong>
              Como estén. Las optimizamos nosotras.
            </div>
          </li>
          <li>
            <div className="ob-check-num">3</div>
            <div>
              <strong>Tu web aparece</strong>
              La revisas, la ajustas y la publicas.
            </div>
          </li>
        </ul>
        <div className="ob-btn-row">
          <Link className="ob-btn-primary" href="/onboarding/info">Empezar</Link>
          <button className="ob-btn-secondary" onClick={() => router.push("/dashboard")}>
            Empezar más tarde
          </button>
        </div>
      </div>
    </div>
  );
}
