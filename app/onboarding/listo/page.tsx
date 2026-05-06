"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProject, saveProject } from "@/lib/storage";

export default function OnboardingListo() {
  const router = useRouter();

  const startConversation = () => {
    const p          = getProject();
    p.onboardingDone = true;
    p.currentStep    = "chat";
    saveProject(p);
    router.push("/chat");
  };

  return (
    <div className="ob-page">
      <div className="ob-photo ob-photo--4">
        <div className="ob-photo-logo">
          <img src="/assets/LAARK logo vert.png" alt="LAARK" />
        </div>
      </div>

      <div className="ob-content">
        <p className="ob-eyebrow">Todo listo</p>
        <h1 className="ob-title">Estamos<br />preparadas.</h1>
        <p className="ob-desc">
          Vamos a hablar. Cuéntame sobre ti, tu trabajo y tus clientas como
          lo harías con una amiga que te está haciendo la web.
        </p>
        <p className="ob-desc" style={{ marginTop: "-10px" }}>
          No hay respuestas correctas ni incorrectas. Cuanto más natural, mejor.
        </p>
        <div className="ob-notice">
          <strong>Tiempo estimado:</strong> la conversación dura entre 15 y 25 minutos.
          Las fotos las subimos después — no las necesitas ahora.
        </div>
        <div className="ob-btn-row">
          <button className="ob-btn-primary" onClick={startConversation}>
            Empezar la conversación
          </button>
          <Link className="ob-btn-secondary" href="/onboarding/diseno">Atrás</Link>
        </div>
      </div>
    </div>
  );
}
