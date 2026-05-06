export type IconName =
  | "home" | "chat" | "palette" | "image" | "globe" | "user"
  | "external" | "monitor" | "phone" | "check" | "arrow"
  | "upload" | "download" | "chevronLeft" | "chevronRight";

export function Icon({ name }: { name: IconName }) {
  const c = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg className="dashboard-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "home"         && <><path {...c} d="M4 10.5 12 4l8 6.5" /><path {...c} d="M6.5 9.5V20h11V9.5" /><path {...c} d="M10 20v-6h4v6" /></>}
      {name === "chat"         && <><path {...c} d="M5 6.5h14v9H9l-4 3v-12Z" /><path {...c} d="M8 10h8" /><path {...c} d="M8 13h5" /></>}
      {name === "palette"      && <><path {...c} d="M12 4a8 8 0 0 0 0 16h1.2a1.8 1.8 0 0 0 1.3-3.1 1.8 1.8 0 0 1 1.3-3.1H18a2 2 0 0 0 2-2A8 8 0 0 0 12 4Z" /><path {...c} d="M8.5 10h.01M11 7.5h.01M15 8.5h.01" /></>}
      {name === "image"        && <><rect {...c} x="4" y="5" width="16" height="14" rx="1" /><path {...c} d="m7 16 3.5-4 3 3 2-2.5L18 16" /><path {...c} d="M8.5 8.5h.01" /></>}
      {name === "globe"        && <><circle {...c} cx="12" cy="12" r="8" /><path {...c} d="M4 12h16" /><path {...c} d="M12 4a11 11 0 0 1 0 16 11 11 0 0 1 0-16Z" /></>}
      {name === "user"         && <><circle {...c} cx="12" cy="8" r="3.2" /><path {...c} d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>}
      {name === "external"     && <><path {...c} d="M10 6H6v12h12v-4" /><path {...c} d="M13 5h6v6" /><path {...c} d="m11 13 8-8" /></>}
      {name === "monitor"      && <><rect {...c} x="4" y="5" width="16" height="11" rx="1" /><path {...c} d="M9 20h6" /><path {...c} d="M12 16v4" /></>}
      {name === "phone"        && <><rect {...c} x="8" y="3.5" width="8" height="17" rx="2" /><path {...c} d="M11 17.5h2" /></>}
      {name === "check"        && <path {...c} d="m5 12 4 4 10-10" />}
      {name === "arrow"        && <><path {...c} d="M5 12h14" /><path {...c} d="m13 6 6 6-6 6" /></>}
      {name === "upload"       && <><path {...c} d="M12 16V5" /><path {...c} d="m8 9 4-4 4 4" /><path {...c} d="M5 17v2h14v-2" /></>}
      {name === "download"     && <><path {...c} d="M12 5v11" /><path {...c} d="m8 12 4 4 4-4" /><path {...c} d="M5 19h14" /></>}
      {name === "chevronLeft"  && <path {...c} d="m15 5-7 7 7 7" />}
      {name === "chevronRight" && <path {...c} d="m9 5 7 7-7 7" />}
    </svg>
  );
}

export function SectionHeader({ title, eyebrow, action }: { title: string; eyebrow?: string; action?: React.ReactNode }) {
  return (
    <header className="dashboard-topbar">
      <div>
        {eyebrow && <p className="dashboard-eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
      {action && <div className="dashboard-topbar-action">{action}</div>}
    </header>
  );
}
