"use client";
import './onboarding.css';

import { usePathname } from "next/navigation";

const STEPS = [
  "/onboarding",
  "/onboarding/info",
  "/onboarding/diseno",
  "/onboarding/listo",
];

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current  = STEPS.indexOf(pathname);

  return (
    <div className="ob-root">
      <div className="ob-progress">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`ob-seg${i === current ? " ob-seg--active" : i < current ? " ob-seg--done" : ""}`}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
