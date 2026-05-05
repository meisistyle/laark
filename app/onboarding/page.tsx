"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SKINS = [
  {
    id: "Luminous",
    label: "Luminoso",
    badge: "L",
    desc: "Limpio, claro, con mucho espacio. Para quienes trabajan con luz y calma.",
  },
  {
    id: "Fresco",
    label: "Fresco",
    badge: "F",
    desc: "Tonos neutros, tipografía elegante. Para marcas sofisticadas y atemporales.",
  },
  {
    id: "Calma",
    label: "Calma",
    badge: "C",
    desc: "Más color, más presencia. Para quienes no pasan desapercibidas.",
  },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [skin, setSkin] = useState("Luminous");
  const router = useRouter();

  const goTo = (i: number) => setStep(Math.max(0, Math.min(3, i)));

  const startConversation = () => {
    try {
      const raw  = localStorage.getItem("laark_project");
      const data = raw ? JSON.parse(raw) : {};
      data.skin            = skin;
      data.onboardingDone  = true;
      localStorage.setItem("laark_project", JSON.stringify(data));
    } catch {}
    router.push("/dashboard");
  };

  const Photo = ({ n }: { n: 1 | 2 | 3 | 4 }) => (
    <div className={`ob-photo ob-photo--${n}`}>
      <div className="ob-photo-logo">
        <img src="/assets/LAARK logo vert.png" alt="LAARK" />
      </div>
    </div>
  );

  const Dots = () => (
    <div className="ob-dots">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`ob-dot${i === step ? " ob-dot--active" : ""}`} />
      ))}
    </div>
  );

  return (
    <div className="ob-root">

      {/* ── Progress bar ── */}
      <div className="ob-progress">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`ob-seg${i === step ? " ob-seg--active" : i < step ? " ob-seg--done" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* ── Sliding track ── */}
      <div className="ob-track" style={{ transform: `translateX(-${step * 25}%)` }}>

        {/* ─── Pantalla 1: Bienvenida ─── */}
        <div className="ob-screen">
          <Photo n={1} />
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
              <button className="ob-btn-primary" onClick={() => goTo(1)}>Empezar</button>
              <button className="ob-btn-secondary" onClick={() => router.push("/dashboard")}>
                Empezar más tarde
              </button>
            </div>
            <Dots />
          </div>
        </div>

        {/* ─── Pantalla 2: Antes de empezar ─── */}
        <div className="ob-screen">
          <Photo n={2} />
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
              <button className="ob-btn-primary" onClick={() => goTo(2)}>Entendido, vamos</button>
              <button className="ob-btn-secondary" onClick={() => goTo(0)}>Atrás</button>
            </div>
            <Dots />
          </div>
        </div>

        {/* ─── Pantalla 3: Elige diseño ─── */}
        <div className="ob-screen">
          <Photo n={3} />
          <div className="ob-content">
            <p className="ob-eyebrow">Tu diseño</p>
            <h1 className="ob-title">Elige cómo<br />quieres verte.</h1>
            <p className="ob-desc">
              Cada diseño está pensado para un tipo de profesional.
              Puedes cambiarlo después — elige el que más se parezca a ti ahora.
            </p>
            <div className="ob-skins">
              {SKINS.map((s) => (
                <div
                  key={s.id}
                  className={`ob-skin-option${skin === s.id ? " ob-skin-option--selected" : ""}`}
                  onClick={() => setSkin(s.id)}
                >
                  <div className="ob-skin-badge">{s.badge}</div>
                  <div>
                    <div className="ob-skin-label">{s.label}</div>
                    <div className="ob-skin-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ob-btn-row">
              <button className="ob-btn-primary" onClick={() => goTo(3)}>Continuar</button>
              <button className="ob-btn-secondary" onClick={() => goTo(1)}>Atrás</button>
            </div>
            <Dots />
          </div>
        </div>

        {/* ─── Pantalla 4: Todo listo ─── */}
        <div className="ob-screen">
          <Photo n={4} />
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
              <button className="ob-btn-secondary" onClick={() => goTo(2)}>Atrás</button>
            </div>
            <Dots />
          </div>
        </div>

      </div>
    </div>
  );
}
