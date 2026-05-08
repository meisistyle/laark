"use client";
import './web-preview.css';

import SkinPreview from "@/components/SkinPreview";
import { emptySlots } from "@/lib/slots";
import Link from "next/link";
import { useMemo, useState } from "react";

const PREVIEW_PAGES = [
  { id: "home", label: "Home" },
  { id: "about", label: "Sobre mí" },
  { id: "sessions", label: "Sesiones" },
] as const;

type PreviewPageId = (typeof PREVIEW_PAGES)[number]["id"];

export default function WebPreviewPage() {
  const [activeId, setActiveId] = useState<PreviewPageId>("home");

  const slots = useMemo(() => {
    const base = emptySlots();

    return {
      ...base,
      negocio_nombre: "Silvia Lebrero Photography",
      negocio_sector: "Fotografía",
      home_hero_titular: "Capturando momentos únicos y llenos de emoción",
      home_problema_texto: "Cada historia merece ser contada con luz, sensibilidad y elegancia.",
      home_solucion_texto: "Capturo momentos auténticos que reflejan la esencia de cada historia. Cada imagen es una ventana a los sentimientos y detalles más especiales de tu gran día.",
      home_hero_cta: "Conóceme",
      home_beneficio_1: "Enfoque personalizado para cada pareja",
      home_beneficio_2: "Estilo natural, elegante y atemporal",
      home_beneficio_3: "Experiencia en fotografía de bodas",
      home_testimonio_1_texto: "Cada imagen capturó la esencia de nuestra historia. No podríamos haber pedido una experiencia más auténtica, cercana y llena de sensibilidad.",
      home_testimonio_1_nombre: "Ana y Samuel",
      home_testimonio_2_texto: "Historias reales, recuerdos inolvidables",
      sobremi_nombre: "¡Hola! Soy Silvia Lebrero",
      sobremi_bio_corta: "Soy fotógrafa especializada en capturar momentos auténticos y llenos de emoción. Mi misión es transformar instantes en recuerdos inolvidables, reflejando la belleza natural de cada historia.",
      sobremi_diferencial: "Creo en la fotografía espontánea, donde las sonrisas genuinas, los abrazos sinceros y las miradas cómplices son los verdaderos protagonistas. A través de mi lente, busco que cada imagen cuente una historia única y especial.",
      sobremi_cta: "Reserva tu sesión",
      servicio_nombre: "Familias",
      servicio_subtitulo: "Inmortaliza los momentos más especiales en familia.",
      servicio_beneficio_1: "Captura momentos auténticos",
      servicio_beneficio_2: "Experiencia relajada y divertida",
      servicio_beneficio_3: "Sesiones personalizadas",
      servicio_caracteristicas: "Recuerdos para toda la vida",
      servicio_para_quien: "Cada familia tiene una historia única, llena de risas, abrazos y momentos inolvidables. Mis sesiones están diseñadas para capturar la esencia de tu hogar.",
      servicio_faq_1_pregunta: "¿Cuánto dura la sesión de fotos?",
      servicio_faq_1_respuesta: "¿Cuánto tiempo tarda la entrega de las fotos?",
      servicio_faq_2_pregunta: "¿Dónde se pueden realizar las sesiones?",
      servicio_faq_2_respuesta: "¿Qué debo llevar o preparar para la sesión?",
      servicio_testimonio_1_texto: "Cada imagen capturó la esencia de nuestra familia de una manera única y especial. Nos sentimos completamente cómodos durante la sesión y el resultado superó todas nuestras expectativas.",
      servicio_testimonio_1_nombre: "María",
      servicio_cta: "Reserva tu sesión",
      contacto_mensaje_intro: "Guía esencial para fotos de boda perfectas",
      contacto_metodo: "Asegura tu fecha y deja que cada momento especial sea capturado con elegancia y emoción.",
    };
  }, []);

  return (
    <main className="generated-preview-shell">
      <header className="generated-preview-toolbar">
        <Link className="generated-preview-brand" href="/dashboard">
          LAARK
        </Link>

        <nav className="generated-preview-tabs" aria-label="Páginas de la web generada">
          {PREVIEW_PAGES.map((page) => (
            <button
              key={page.id}
              className={page.id === activeId ? "is-active" : ""}
              type="button"
              onClick={() => setActiveId(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <span className="generated-preview-note">Preview real</span>
      </header>

      <section className="generated-preview-frame-wrap" aria-label={`Preview de ${activeId}`}>
        <SkinPreview page={activeId} slots={slots} skin="Skin1" />
      </section>
    </main>
  );
}
