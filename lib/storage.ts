"use client";
import { LaarkProject, emptySlots, SkinName } from "./slots";

const KEY = "laark_project";

export function getProject(): LaarkProject {
  if (typeof window === "undefined") return defaultProject();
  const raw = localStorage.getItem(KEY);
  if (!raw) return defaultProject();
  try {
    return JSON.parse(raw);
  } catch {
    return defaultProject();
  }
}

export function saveProject(p: LaarkProject): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify({ ...p, updatedAt: new Date().toISOString() }));
}

export function updateSlots(partial: Partial<LaarkProject["slots"]>): LaarkProject {
  const p = getProject();
  p.slots = { ...p.slots, ...partial };
  saveProject(p);
  return p;
}

export function setSkin(skin: SkinName): void {
  const p = getProject();
  p.skin = skin;
  saveProject(p);
}

export function addChatMessage(role: "user" | "assistant", content: string): void {
  const p = getProject();
  p.chatHistory.push({ role, content, timestamp: new Date().toISOString() });
  saveProject(p);
}

export function clearProject(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

function defaultProject(): LaarkProject {
  return {
    slots: emptySlots(),
    skin: "Luminous",
    chatHistory: [],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
