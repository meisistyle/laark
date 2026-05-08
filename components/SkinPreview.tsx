"use client";
import { WebSlots } from "@/lib/slots";
import { SkinName } from "@/lib/slots";
import dynamic from "next/dynamic";

const Skin1 = dynamic(() => import("./skins/Skin1"), { ssr: false });
const SkinFresko = dynamic(() => import("./skins/SkinFresko"), { ssr: false });
const SkinCalma = dynamic(() => import("./skins/SkinCalma"), { ssr: false });

interface Props {
  slots: WebSlots;
  skin: SkinName;
  mobile?: boolean;
  page?: "home" | "about" | "sessions";
  editMode?: boolean;
  onImageClick?: (key: string) => void;
  imageOverrides?: Record<string, string>;
}

export default function SkinPreview({ slots, skin, mobile, page = "home", editMode, onImageClick, imageOverrides }: Props) {
  const url = `${slots.negocio_nombre?.toLowerCase().replace(/\s/g, "") || "tunegocio"}.laark.io`;

  return (
    <div className={`skin-preview-frame ${mobile ? "is-mobile" : "is-desktop"}`}>
      <div className="skin-preview-browser-bar">
        <div className="skin-preview-browser-dots" aria-hidden="true">
          <div className="skin-preview-browser-dot is-red" />
          <div className="skin-preview-browser-dot is-yellow" />
          <div className="skin-preview-browser-dot is-green" />
        </div>
        <div className="skin-preview-url">
          {url}
        </div>
      </div>

      <div className="skin-preview-viewport">
        <div className={`skin-preview-stage ${mobile ? "is-mobile" : "is-desktop"}`}>
          {skin === "Skin1" && <Skin1 slots={slots} mobile={mobile} page={page} editMode={editMode} onImageClick={onImageClick} imageOverrides={imageOverrides} />}
          {skin === "Fresco" && <SkinFresko slots={slots} mobile={mobile} />}
          {skin === "Calma" && <SkinCalma slots={slots} mobile={mobile} />}
        </div>
      </div>
    </div>
  );
}
