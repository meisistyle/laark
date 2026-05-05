"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function PhotosPage() {
  const router = useRouter();
  const [files, setFiles]     = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr    = Array.from(incoming);
    const merged = [...files, ...arr];
    setFiles(merged);

    arr.forEach(f => {
      const reader = new FileReader();
      reader.onload = e => {
        if (e.target?.result) {
          setPreviews(prev => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(f);
    });
  }, [files]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const goGenerating = () => {
    // TODO: upload files to Supabase Storage before navigating
    // const uploads = await Promise.all(files.map(f => supabase.storage.from('user-photos').upload(...)));
    router.push("/generating");
  };

  const visiblePreviews = previews.slice(0, 18);
  const extra           = files.length > 18 ? files.length - 18 : 0;
  const hasFiles        = files.length > 0;

  return (
    <div className="photos-root">
      <div className="photos-top">
        <span className="photos-top-logo">LAARK</span>
        <span className="photos-top-step">· Paso 2 de 4 · Imágenes</span>
      </div>

      <div className="photos-body">
        <p className="photos-eyebrow">Tus fotos</p>
        <h1 className="photos-title">Súbelas como las tengas.</h1>
        <p className="photos-desc">
          No hace falta que estén recortadas, editadas ni ordenadas. Súbelas todas juntas — la IA
          selecciona las mejores, las adapta y decide dónde va cada una.
        </p>

        <div className="photos-notice">
          <p>
            <strong>Cuantas más, mejor.</strong> Si tienes fotos de distintos momentos o contextos,
            inclúyelas todas. La IA elige las que mejor encajan con cada sección de tu web.
          </p>
        </div>

        <div
          className={`photos-drop${dragging ? " over" : ""}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={e => e.target.files && addFiles(e.target.files)}
          />
          <div className="photos-drop-title">
            {hasFiles ? "Añadir más fotos" : "Arrastra tus fotos aquí"}
          </div>
          <p className="photos-drop-sub">
            o haz clic para seleccionarlas desde tu ordenador o móvil
          </p>
          <button className="photos-drop-btn" onClick={e => e.stopPropagation()}>
            Seleccionar fotos
          </button>
          <p className="photos-drop-formats">JPG, PNG, HEIC, WEBP · Sin límite de tamaño</p>
        </div>

        {hasFiles && (
          <>
            <div className="photos-thumbs">
              {visiblePreviews.map((src, i) => (
                <div
                  key={i}
                  className="photos-thumb"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
              {extra > 0 && (
                <div className="photos-thumb photos-thumb-more">+{extra}</div>
              )}
            </div>
            <p className="photos-count">
              <span>{files.length}</span> {files.length === 1 ? "foto seleccionada" : "fotos seleccionadas"} · puedes añadir más
            </p>
          </>
        )}
      </div>

      <div className="photos-bottom">
        <button
          className={`photos-continue-btn${hasFiles ? " ready" : ""}`}
          onClick={goGenerating}
          disabled={!hasFiles}
        >
          Crear mi web
        </button>
        <button className="photos-later-btn" onClick={() => router.push("/dashboard?photos=pending")}>
          Lo hago más tarde
        </button>
        <span className="photos-hint">Tu progreso se guarda</span>
      </div>
    </div>
  );
}
