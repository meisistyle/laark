export interface WebSlots {
  // Datos generales
  negocio_nombre: string;
  negocio_sector: string;
  negocio_publico: string;
  negocio_contacto_preferido: string;
  negocio_horario: string;

  // Home — Hero
  home_hero_titular: string;
  home_hero_subtitular: string;
  home_hero_cta: string;

  // Home — Problema/Solución
  home_problema_texto: string;
  home_solucion_texto: string;

  // Home — Beneficios
  home_beneficio_1: string;
  home_beneficio_2: string;
  home_beneficio_3: string;

  // Home — Testimonios
  home_testimonio_1_texto: string;
  home_testimonio_1_nombre: string;
  home_testimonio_2_texto: string;
  home_testimonio_2_nombre: string;

  // Home — Características
  home_caracteristicas: string;

  // Home — FAQs
  home_faq_1_pregunta: string;
  home_faq_1_respuesta: string;
  home_faq_2_pregunta: string;
  home_faq_2_respuesta: string;
  home_faq_3_pregunta: string;
  home_faq_3_respuesta: string;

  // Sobre mí
  sobremi_diferencial: string;
  sobremi_nombre: string;
  sobremi_bio_corta: string;
  sobremi_cta: string;

  // Servicio
  servicio_nombre: string;
  servicio_subtitulo: string;
  servicio_beneficio_1: string;
  servicio_beneficio_2: string;
  servicio_beneficio_3: string;
  servicio_caracteristicas: string;
  servicio_para_quien: string;
  servicio_faq_1_pregunta: string;
  servicio_faq_1_respuesta: string;
  servicio_faq_2_pregunta: string;
  servicio_faq_2_respuesta: string;
  servicio_testimonio_1_texto: string;
  servicio_testimonio_1_nombre: string;
  servicio_cta: string;

  // Contacto
  contacto_mensaje_intro: string;
  contacto_metodo: string;
  contacto_email: string;
  contacto_whatsapp: string;

  // SEO (generado por IA)
  seo_titulo_home: string;
  seo_descripcion_home: string;
  seo_titulo_sobremi: string;
  seo_titulo_servicio: string;
}

export const emptySlots = (): WebSlots => ({
  negocio_nombre: "",
  negocio_sector: "",
  negocio_publico: "",
  negocio_contacto_preferido: "",
  negocio_horario: "",
  home_hero_titular: "",
  home_hero_subtitular: "",
  home_hero_cta: "",
  home_problema_texto: "",
  home_solucion_texto: "",
  home_beneficio_1: "",
  home_beneficio_2: "",
  home_beneficio_3: "",
  home_testimonio_1_texto: "",
  home_testimonio_1_nombre: "",
  home_testimonio_2_texto: "",
  home_testimonio_2_nombre: "",
  home_caracteristicas: "",
  home_faq_1_pregunta: "",
  home_faq_1_respuesta: "",
  home_faq_2_pregunta: "",
  home_faq_2_respuesta: "",
  home_faq_3_pregunta: "",
  home_faq_3_respuesta: "",
  sobremi_diferencial: "",
  sobremi_nombre: "",
  sobremi_bio_corta: "",
  sobremi_cta: "",
  servicio_nombre: "",
  servicio_subtitulo: "",
  servicio_beneficio_1: "",
  servicio_beneficio_2: "",
  servicio_beneficio_3: "",
  servicio_caracteristicas: "",
  servicio_para_quien: "",
  servicio_faq_1_pregunta: "",
  servicio_faq_1_respuesta: "",
  servicio_faq_2_pregunta: "",
  servicio_faq_2_respuesta: "",
  servicio_testimonio_1_texto: "",
  servicio_testimonio_1_nombre: "",
  servicio_cta: "",
  contacto_mensaje_intro: "",
  contacto_metodo: "",
  contacto_email: "",
  contacto_whatsapp: "",
  seo_titulo_home: "",
  seo_descripcion_home: "",
  seo_titulo_sobremi: "",
  seo_titulo_servicio: "",
});

export type SkinName = "Luminous" | "Fresco" | "Calma";

export interface LaarkProject {
  slots: WebSlots;
  skin: SkinName;
  chatHistory: ChatMessage[];
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
