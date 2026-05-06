"use client";

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

export default function ImagenesPage() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const selectedIndex = selected ? IMAGE_GALLERY.findIndex(i => i.src === selected.src) : -1;

  function showAdjacent(dir: -1 | 1) {
    if (selectedIndex < 0) return;
    const next = (selectedIndex + dir + IMAGE_GALLERY.length) % IMAGE_GALLERY.length;
    setSelected(IMAGE_GALLERY[next]);
  }

  return (
    <section className="dashboard-images-screen" aria-label="Imágenes del proyecto">
      <header className="dashboard-images-header">
        <div><p>Imágenes</p></div>
        <button className="dashboard-images-upload" type="button">
          <Icon name="upload" />
          Subir fotos
        </button>
      </header>

      <article className="dashboard-photo-dropzone">
        <div>
          <span>Paso 2</span>
          <h2>Sube todas tus fotos juntas</h2>
          <p>LAARK las guardará como biblioteca visual del proyecto. Después se podrán asignar, recortar y adaptar a las secciones de la web.</p>
        </div>
        <button className="dashboard-photo-dropzone-action" type="button">
          <Icon name="upload" />
          Elegir fotos
        </button>
      </article>

      <div className="dashboard-images-grid">
        {IMAGE_GALLERY.map(image => (
          <figure className={`dashboard-image-tile is-${image.shape}`} key={image.src}>
            <button type="button" onClick={() => setSelected(image)}>
              <img src={image.src} alt={image.alt} />
            </button>
          </figure>
        ))}
      </div>

      {selected && (
        <div className="dashboard-image-modal" role="dialog" aria-modal="true" aria-label="Vista de imagen">
          <button className="dashboard-image-modal-backdrop" type="button" onClick={() => setSelected(null)} aria-label="Cerrar" />
          <article className="dashboard-image-modal-card">
            <button className="dashboard-image-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Cerrar">×</button>
            <button className="dashboard-image-modal-arrow is-prev" type="button" onClick={() => showAdjacent(-1)} aria-label="Imagen anterior">
              <Icon name="chevronLeft" />
            </button>
            <button className="dashboard-image-modal-arrow is-next" type="button" onClick={() => showAdjacent(1)} aria-label="Imagen siguiente">
              <Icon name="chevronRight" />
            </button>
            <a className="dashboard-image-download" href={selected.src} download aria-label="Descargar imagen">
              <Icon name="download" />
            </a>
            <img src={selected.src} alt={selected.alt} />
          </article>
        </div>
      )}
    </section>
  );
}
