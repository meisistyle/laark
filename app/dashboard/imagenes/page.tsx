"use client";
import './imagenes.css';

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/storage";
import { LaarkProject } from "@/lib/slots";

const PROJECT_IMAGES = [
  "/assets/IMÁGENES/Mask group.png",
  "/assets/IMÁGENES/Mask group-2.png",
  "/assets/IMÁGENES/Mask group-4.png",
  "/assets/IMÁGENES/Mask group-6.png",
];

export default function ImagenesPage() {
  const [projects, setProjects] = useState<LaarkProject[]>([]);

  useEffect(() => {
    setProjects(getAllProjects());
  }, []);

  return (
    <section className="imgs-screen" aria-label="Imágenes">
      <header className="imgs-header">
        <h1 className="imgs-title">Imágenes</h1>
      </header>

      <div className="imgs-grid">
        {projects.map((p, i) => {
          const name  = p.slots.negocio_nombre || "Mi proyecto";
          const thumb = PROJECT_IMAGES[i % PROJECT_IMAGES.length];
          return (
            <Link
              key={p.project_id}
              href="/dashboard/imagenes_abiertas"
              className="imgs-card"
            >
              <div className="imgs-card-photo">
                <img src={thumb} alt={name} />
              </div>
              <div className="imgs-card-info">
                <h2 className="imgs-card-name">{name}</h2>
                <span className="imgs-card-count">Ver galería →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
