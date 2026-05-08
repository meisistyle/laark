"use client";
import { LaarkProject, CreationStep, emptySlots, SkinName } from "./slots";

const LEGACY_KEY   = "laark_project";   // old single-project key
const PROJECTS_KEY = "laark_projects";  // array of all projects
const ACTIVE_KEY   = "laark_active_id"; // currently active project_id

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Run once: move old laark_project key into the new array format
function migrateIfNeeded(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(PROJECTS_KEY)) return;
  const legacy = localStorage.getItem(LEGACY_KEY);
  if (legacy) {
    try {
      const p = normalizeProject(JSON.parse(legacy) as Partial<LaarkProject>);
      localStorage.setItem(PROJECTS_KEY, JSON.stringify([p]));
      localStorage.setItem(ACTIVE_KEY, p.project_id);
      localStorage.removeItem(LEGACY_KEY);
    } catch {
      localStorage.removeItem(LEGACY_KEY);
    }
  }
}

// ─── Multi-project API ────────────────────────────────────────────────────────
export function getAllProjects(): LaarkProject[] {
  if (typeof window === "undefined") return [];
  migrateIfNeeded();
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) return [];
  try {
    return (JSON.parse(raw) as unknown[]).map(normalizeProject);
  } catch {
    return [];
  }
}

function saveAllProjects(projects: LaarkProject[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function getActiveProjectId(): string | null {
  if (typeof window === "undefined") return null;
  migrateIfNeeded();
  return localStorage.getItem(ACTIVE_KEY);
}

export function setActiveProjectId(id: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACTIVE_KEY, id);
}

export function createNewProject(): LaarkProject {
  const p   = defaultProject();
  const all = getAllProjects();
  all.push(p);
  saveAllProjects(all);
  localStorage.setItem(ACTIVE_KEY, p.project_id);
  return p;
}

// ─── Active-project API (used by all existing screens) ───────────────────────
export function getProject(): LaarkProject {
  if (typeof window === "undefined") return defaultProject();
  migrateIfNeeded();
  const all = getAllProjects();
  if (!all.length) {
    const p = defaultProject();
    saveAllProjects([p]);
    localStorage.setItem(ACTIVE_KEY, p.project_id);
    return p;
  }
  const activeId = getActiveProjectId();
  return (activeId ? all.find(p => p.project_id === activeId) : null) ?? all[0];
}

export function saveProject(p: LaarkProject): void {
  if (typeof window === "undefined") return;
  const normalized = normalizeProject({ ...p, updatedAt: new Date().toISOString() });
  const all        = getAllProjects();
  const idx        = all.findIndex(x => x.project_id === normalized.project_id);
  if (idx >= 0) all[idx] = normalized; else all.push(normalized);
  saveAllProjects(all);
  localStorage.setItem(ACTIVE_KEY, normalized.project_id);
}

export function updateSlots(partial: Partial<LaarkProject["slots"]>): LaarkProject {
  const p = getProject();
  p.slots = { ...p.slots, ...partial };
  saveProject(p);
  return p;
}

export function setSkin(skin: SkinName): void {
  const p = getProject();
  p.skin  = skin;
  saveProject(p);
}

export function setCurrentStep(step: CreationStep): void {
  const p       = getProject();
  p.currentStep = step;
  saveProject(p);
}

export function addChatMessage(role: "user" | "assistant", content: string): void {
  const p = getProject();
  p.chatHistory.push({ role, content, timestamp: new Date().toISOString() });
  saveProject(p);
}

export function clearProject(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(ACTIVE_KEY);
}

// ─── Internals ────────────────────────────────────────────────────────────────
function defaultProject(): LaarkProject {
  return {
    project_id:     generateId(),
    slots:          emptySlots(),
    skin:           "Skin1",
    chatHistory:    [],
    progress:       0,
    currentStep:    "onboarding",
    onboardingDone: false,
    domain:         null,
    domain_status:  "pending",
    createdAt:      new Date().toISOString(),
    updatedAt:      new Date().toISOString(),
  };
}

function normalizeProject(raw: unknown): LaarkProject {
  const base = defaultProject();
  if (!raw || typeof raw !== "object") return base;
  const c = raw as Partial<LaarkProject> & { slots?: Partial<LaarkProject["slots"]> };
  return {
    ...base,
    ...c,
    project_id:     c.project_id     || base.project_id,
    slots:          { ...base.slots, ...(c.slots || {}) },
    chatHistory:    Array.isArray(c.chatHistory) ? c.chatHistory : [],
    skin:           c.skin           || base.skin,
    currentStep:    c.currentStep    || base.currentStep,
    onboardingDone: c.onboardingDone ?? base.onboardingDone,
    domain:         c.domain         ?? base.domain,
    domain_status:  c.domain_status  || base.domain_status,
    createdAt:      c.createdAt      || base.createdAt,
    updatedAt:      c.updatedAt      || base.updatedAt,
  };
}
