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

  // Home — Claridad
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

  // Home — Apoyos
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

  // SEO
  seo_titulo_home: string;
  seo_descripcion_home: string;
  seo_titulo_sobremi: string;
  seo_titulo_servicio: string;
}

export type SlotKey = keyof WebSlots;

export type SlotPage =
  | "negocio"
  | "home"
  | "sobremi"
  | "servicio"
  | "contacto"
  | "seo";

export interface SlotDefinition {
  key: SlotKey;
  page: SlotPage;
  block: string;
  label: string;
  source: "ia" | "manual" | "mixto";
  phase: "base" | "future";
  notes?: string;
}

export const SLOT_DEFINITIONS: SlotDefinition[] = [
  { key: "negocio_nombre", page: "negocio", block: "Identidad", label: "Nombre del negocio", source: "mixto", phase: "base" },
  { key: "negocio_sector", page: "negocio", block: "Identidad", label: "Sector o categoría", source: "ia", phase: "base" },
  { key: "negocio_publico", page: "negocio", block: "Identidad", label: "Público principal", source: "ia", phase: "base" },
  { key: "negocio_contacto_preferido", page: "negocio", block: "Identidad", label: "Método de contacto preferido", source: "mixto", phase: "base" },
  { key: "negocio_horario", page: "negocio", block: "Identidad", label: "Horario o disponibilidad", source: "manual", phase: "future" },

  { key: "home_hero_titular", page: "home", block: "Hero", label: "Titular principal", source: "ia", phase: "base" },
  { key: "home_hero_subtitular", page: "home", block: "Hero", label: "Subtítulo principal", source: "ia", phase: "future" },
  { key: "home_hero_cta", page: "home", block: "Hero", label: "CTA del hero", source: "ia", phase: "base" },
  { key: "home_problema_texto", page: "home", block: "Claridad", label: "Texto de claridad", source: "ia", phase: "base" },
  { key: "home_solucion_texto", page: "home", block: "Valor emocional", label: "Texto emocional o de solución", source: "ia", phase: "base" },
  { key: "home_beneficio_1", page: "home", block: "Beneficios", label: "Beneficio 1", source: "ia", phase: "base" },
  { key: "home_beneficio_2", page: "home", block: "Beneficios", label: "Beneficio 2", source: "ia", phase: "base" },
  { key: "home_beneficio_3", page: "home", block: "Beneficios", label: "Beneficio 3", source: "ia", phase: "base" },
  { key: "home_caracteristicas", page: "home", block: "Beneficios", label: "Características o soporte", source: "ia", phase: "future" },
  { key: "home_testimonio_1_texto", page: "home", block: "Prueba", label: "Testimonio 1 · texto", source: "mixto", phase: "base" },
  { key: "home_testimonio_1_nombre", page: "home", block: "Prueba", label: "Testimonio 1 · nombre", source: "mixto", phase: "base" },
  { key: "home_testimonio_2_texto", page: "home", block: "Prueba", label: "Testimonio 2 · texto", source: "mixto", phase: "base" },
  { key: "home_testimonio_2_nombre", page: "home", block: "Prueba", label: "Testimonio 2 · nombre", source: "mixto", phase: "base" },
  { key: "home_faq_1_pregunta", page: "home", block: "FAQ", label: "FAQ 1 · pregunta", source: "ia", phase: "base" },
  { key: "home_faq_1_respuesta", page: "home", block: "FAQ", label: "FAQ 1 · respuesta", source: "ia", phase: "base" },
  { key: "home_faq_2_pregunta", page: "home", block: "FAQ", label: "FAQ 2 · pregunta", source: "ia", phase: "base" },
  { key: "home_faq_2_respuesta", page: "home", block: "FAQ", label: "FAQ 2 · respuesta", source: "ia", phase: "base" },
  { key: "home_faq_3_pregunta", page: "home", block: "FAQ", label: "FAQ 3 · pregunta", source: "ia", phase: "base" },
  { key: "home_faq_3_respuesta", page: "home", block: "FAQ", label: "FAQ 3 · respuesta", source: "ia", phase: "base" },

  { key: "sobremi_nombre", page: "sobremi", block: "Hero", label: "Nombre o apertura", source: "mixto", phase: "base" },
  { key: "sobremi_bio_corta", page: "sobremi", block: "Presentación", label: "Bio corta o presentación", source: "ia", phase: "base" },
  { key: "sobremi_diferencial", page: "sobremi", block: "Relato principal", label: "Diferencial o criterio", source: "ia", phase: "base" },
  { key: "sobremi_cta", page: "sobremi", block: "Cierre", label: "CTA de cierre", source: "ia", phase: "base" },

  { key: "servicio_nombre", page: "servicio", block: "Hero", label: "Nombre del servicio", source: "mixto", phase: "base" },
  { key: "servicio_subtitulo", page: "servicio", block: "Hero", label: "Subtítulo del servicio", source: "ia", phase: "base" },
  { key: "servicio_para_quien", page: "servicio", block: "Contexto", label: "Para quién es", source: "ia", phase: "base" },
  { key: "servicio_beneficio_1", page: "servicio", block: "Beneficios", label: "Beneficio 1", source: "ia", phase: "base" },
  { key: "servicio_beneficio_2", page: "servicio", block: "Beneficios", label: "Beneficio 2", source: "ia", phase: "base" },
  { key: "servicio_beneficio_3", page: "servicio", block: "Beneficios", label: "Beneficio 3", source: "ia", phase: "base" },
  { key: "servicio_caracteristicas", page: "servicio", block: "Lo que necesitas saber", label: "Características, incluye o detalle clave", source: "ia", phase: "base" },
  { key: "servicio_faq_1_pregunta", page: "servicio", block: "FAQ", label: "FAQ 1 · pregunta", source: "ia", phase: "base" },
  { key: "servicio_faq_1_respuesta", page: "servicio", block: "FAQ", label: "FAQ 1 · respuesta", source: "ia", phase: "base" },
  { key: "servicio_faq_2_pregunta", page: "servicio", block: "FAQ", label: "FAQ 2 · pregunta", source: "ia", phase: "base" },
  { key: "servicio_faq_2_respuesta", page: "servicio", block: "FAQ", label: "FAQ 2 · respuesta", source: "ia", phase: "base" },
  { key: "servicio_testimonio_1_texto", page: "servicio", block: "Prueba", label: "Testimonio del servicio · texto", source: "mixto", phase: "base" },
  { key: "servicio_testimonio_1_nombre", page: "servicio", block: "Prueba", label: "Testimonio del servicio · nombre", source: "mixto", phase: "base" },
  { key: "servicio_cta", page: "servicio", block: "Cierre", label: "CTA del servicio", source: "ia", phase: "base" },

  { key: "contacto_mensaje_intro", page: "contacto", block: "Hero", label: "Mensaje de bienvenida", source: "ia", phase: "base" },
  { key: "contacto_metodo", page: "contacto", block: "Contacto", label: "Explicación del método de contacto", source: "ia", phase: "base" },
  { key: "contacto_email", page: "contacto", block: "Contacto", label: "Email", source: "manual", phase: "base" },
  { key: "contacto_whatsapp", page: "contacto", block: "Contacto", label: "WhatsApp o teléfono", source: "manual", phase: "base" },

  { key: "seo_titulo_home", page: "seo", block: "Home", label: "SEO título Home", source: "ia", phase: "base" },
  { key: "seo_descripcion_home", page: "seo", block: "Home", label: "SEO descripción Home", source: "ia", phase: "base" },
  { key: "seo_titulo_sobremi", page: "seo", block: "Sobre mí", label: "SEO título Sobre mí", source: "ia", phase: "future" },
  { key: "seo_titulo_servicio", page: "seo", block: "Servicio", label: "SEO título Servicio", source: "ia", phase: "future" },
];

export const SLOT_KEYS = SLOT_DEFINITIONS.map((slot) => slot.key) as SlotKey[];

export const SLOT_GROUPS = {
  negocio: SLOT_DEFINITIONS.filter((slot) => slot.page === "negocio"),
  home: SLOT_DEFINITIONS.filter((slot) => slot.page === "home"),
  sobremi: SLOT_DEFINITIONS.filter((slot) => slot.page === "sobremi"),
  servicio: SLOT_DEFINITIONS.filter((slot) => slot.page === "servicio"),
  contacto: SLOT_DEFINITIONS.filter((slot) => slot.page === "contacto"),
  seo: SLOT_DEFINITIONS.filter((slot) => slot.page === "seo"),
} as const;

export const ACTIVE_SLOT_KEYS = SLOT_DEFINITIONS
  .filter((slot) => slot.phase === "base")
  .map((slot) => slot.key) as SlotKey[];

export function emptySlots(): WebSlots {
  return SLOT_KEYS.reduce((acc, key) => {
    acc[key] = "";
    return acc;
  }, {} as WebSlots);
}

export function getSlotDefinition(key: SlotKey): SlotDefinition | undefined {
  return SLOT_DEFINITIONS.find((slot) => slot.key === key);
}

export function countFilledSlots(slots: WebSlots, mode: "all" | "active" = "active"): number {
  const keys = mode === "all" ? SLOT_KEYS : ACTIVE_SLOT_KEYS;
  return keys.filter((key) => Boolean(slots[key]?.trim())).length;
}

export function totalSlots(mode: "all" | "active" = "active"): number {
  return mode === "all" ? SLOT_KEYS.length : ACTIVE_SLOT_KEYS.length;
}

export type SkinName = "Skin1" | "Fresco" | "Calma";

export type CreationStep =
  | "onboarding"   // not started yet
  | "chat"         // in conversation
  | "photos"       // uploading photos
  | "generating"   // generating
  | "reveal"       // viewing reveal
  | "dominio"      // choosing domain
  | "edit"         // editing content
  | "done";        // published

export interface LaarkProject {
  project_id:     string;       // UUID — key for Supabase projects table
  slots:          WebSlots;
  skin:           SkinName;
  chatHistory:    ChatMessage[];
  progress:       number;
  currentStep:    CreationStep;
  onboardingDone: boolean;
  domain:         string | null; // e.g. "casaolivastudio.com" — Supabase: projects.domain
  domain_status:  "pending" | "confirmed"; // Supabase: projects.domain_status
  createdAt:      string;
  updatedAt:      string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}
