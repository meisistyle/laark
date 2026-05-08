"use client";
import './skin1.css';
import { WebSlots } from "@/lib/slots";

type PageKind = "home" | "about" | "sessions";

interface Props {
  slots: WebSlots;
  mobile?: boolean;
  page?: PageKind;
  editMode?: boolean;
  onImageClick?: (imageKey: string) => void;
  imageOverrides?: Record<string, string>;
}

export default function Skin1({ page = "home" }: Props) {
  return (
    <div className="s1-placeholder">
      <p>Skin1 · {page} · en construcción</p>
    </div>
  );
}
