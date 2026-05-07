"use client";
import './imagenes-abiertas.css';

import { useState } from "react";
import { Icon } from "../_shared";

const IMAGE_GALLERY = [
  { src: "/assets/IMÁGENES/Mask group.png",    alt: "Imagen vertical del proyecto",    shape: "tall"   },
  { src: "/assets/IMÁGENES/Mask group-1.png",  alt: "Imagen horizontal del proyecto",  shape: "short"  },
  { src: "/assets/IMÁGENES/Mask group-2.png",  alt: "Imagen del proyecto",             shape: "medium" },
  { src: "/assets/IMÁGENES/Mask group-3.png",  alt: "Imagen vertical del proyecto",    shape: "mid"    },
  { src: "/assets/IMÁGENES/Mask group-4.png",  alt: "Imagen vertical del proyecto",    shape: "tall"   },
  { src: "/assets/IMÁGENES/Mask group-5.png",  alt: "Imagen del proyecto",             shape: "short"  },
  { src: "/assets/IMÁGENES/Mask group-6.png",  alt: "Imagen del proyecto",             shape: "medium" },
  { src: "/assets/IMÁGENES/Mask group-7.png",  alt: "Imagen horizontal del proyecto",  shape: "short"  },
  { src: "/assets/IMÁGENES/Mask group-8.png",  alt: "Imagen del proyecto",             shape: "mid"    },
  { src: "/assets/IMÁGENES/Mask group-9.png",  alt: "Imagen horizontal del proyecto",  shape: "short"  },
  { src: "/assets/IMÁGENES/Mask group-10.png", alt: "Imagen horizontal del proyecto",  shape: "short"  },
  { src: "/assets/IMÁGENES/Mask group-11.png", alt: "Imagen horizontal del proyecto",  shape: "short"  },
];

type GalleryItem = (typeof IMAGE_GALLERY)[number];

export default function ImagenesAbiertasPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const selectedIndex = selected ? IMAGE_GALLERY.findIndex(i => i.src === selected.src) : -1;

  function showAdjacent(dir: -1 | 1) {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + IMAGE_GALLERY.length) % IMAGE_GALLERY.length;
    setSelected(IMAGE_GALLERY[next]);
  }

  return (
    <section className="imgab-screen" aria-label="Imágenes del proyecto">
      <header className="imgab-header">
        <div className="imgab-header-left">
          <h1 className="imgab-project-name">Cala Calma</h1>
          <span className="imgab-dropdown-arrow">&#8964;</span>
        </div>
        <div className="imgab-header-right">
          <button className="imgab-upload-btn" type="button">
            <Icon name="upload" />
            <span>Subir fotos</span>
          </button>
          <button className="imgab-upload-icon" type="button" aria-label="Subir fotos">
            <Icon name="upload" />
          </button>
        </div>
      </header>

      <div className="imgab-grid">
        {IMAGE_GALLERY.map(image => (
          <figure className={`imgab-tile is-${image.shape}`} key={image.src}>
            <button type="button" onClick={() => setSelected(image)}>
              <img src={image.src} alt={image.alt} />
            </button>
          </figure>
        ))}
      </div>

      {selected && (
        <div className="imgab-modal" role="dialog" aria-modal="true" aria-label="Vista de imagen">
          <button className="imgab-modal-backdrop" type="button" onClick={() => setSelected(null)} aria-label="Cerrar" />
          <article className="imgab-modal-card">
            <button className="imgab-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>
            <button className="imgab-modal-arrow is-prev" type="button" onClick={() => showAdjacent(-1)} aria-label="Imagen anterior">
              <Icon name="chevronLeft" />
            </button>
            <button className="imgab-modal-arrow is-next" type="button" onClick={() => showAdjacent(1)} aria-label="Imagen siguiente">
              <Icon name="chevronRight" />
            </button>
            <img src={selected.src} alt={selected.alt} />
          </article>
        </div>
      )}
    </section>
  );
}
