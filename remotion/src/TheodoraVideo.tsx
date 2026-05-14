import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from 'remotion';

// ─── Layout constants ─────────────────────────────────────────────────────────

const IMAGES = {
  theodora: staticFile('theodora/theodora.png'),
  car:      staticFile('theodora/car.png'),
  domeTray: staticFile('theodora/dome-tray.png'),
  pancakes: staticFile('theodora/pancakes.png'),
  cloche:   staticFile('theodora/cloche.png'),
  smoothie: staticFile('theodora/smoothie.png'),
  macaron:  staticFile('theodora/macaron.png'),
} as const;

type ImageKey = keyof typeof IMAGES;

// Final grid: 1080 × 1920 canvas, 12px padding, 8px gap
//
//  ┌──────────────────────────────────┐
//  │           theodora               │ h=790
//  ├──────────┬───────┬───────┬───────┤ ← y=810
//  │          │ dome  │ pancak│cloche │ h=340
//  │   car    ├───────┴───────┴───────┤ ← y=1158
//  │          │ smoothie  │  macaron  │ h=750
//  └──────────┴───────────┴───────────┘

const FINAL: Record<ImageKey, { x: number; y: number; w: number; h: number }> = {
  theodora: { x: 12,  y: 12,   w: 1056, h: 790  },
  car:      { x: 12,  y: 810,  w: 522,  h: 1098 },
  domeTray: { x: 542, y: 810,  w: 170,  h: 340  },
  pancakes: { x: 720, y: 810,  w: 170,  h: 340  },
  cloche:   { x: 898, y: 810,  w: 170,  h: 340  },
  smoothie: { x: 542, y: 1158, w: 259,  h: 750  },
  macaron:  { x: 809, y: 1158, w: 259,  h: 750  },
};

// Scattered positions — creative chaos on a table, overlapping
const SCATTERED: Record<ImageKey, { x: number; y: number; w: number; h: number; r: number }> = {
  theodora: { x: 30,  y: 70,   w: 920, h: 700, r: -3 },
  car:      { x: -60, y: 790,  w: 590, h: 590, r:  2 },
  cloche:   { x: 460, y: 520,  w: 480, h: 480, r: -5 },
  domeTray: { x: 620, y: 1090, w: 410, h: 410, r: -4 },
  pancakes: { x: 550, y: 830,  w: 460, h: 460, r: -2 },
  smoothie: { x: 50,  y: 1210, w: 340, h: 570, r:  3 },
  macaron:  { x: 240, y: 1310, w: 440, h: 440, r:  5 },
};

type EnterFrom = 'bottom' | 'top' | 'left' | 'right' | 'pop';

const ENTER: Record<ImageKey, {
  frame: number;
  from: EnterFrom;
  cfg: { damping: number; stiffness: number; mass: number };
}> = {
  // 0s  – Theodora slides up with slight tilt
  theodora: { frame: 0,   from: 'bottom', cfg: { damping: 20, stiffness: 120, mass: 1.1  } },
  // 1s  – Car cruises in from the left, overshoot
  car:      { frame: 30,  from: 'left',   cfg: { damping: 16, stiffness: 100, mass: 1.1  } },
  // 2s  – Cloche drops from top with elegant bounce
  cloche:   { frame: 60,  from: 'top',    cfg: { damping: 11, stiffness: 110, mass: 1.3  } },
  // 2.5s – DomeTray pops in
  domeTray: { frame: 78,  from: 'pop',    cfg: { damping: 14, stiffness: 180, mass: 0.8  } },
  // 3s  – Pancakes pushes in from right
  pancakes: { frame: 93,  from: 'right',  cfg: { damping: 18, stiffness: 130, mass: 0.95 } },
  // 3.5s – Smoothie rises from bottom
  smoothie: { frame: 108, from: 'bottom', cfg: { damping: 18, stiffness: 125, mass: 1.0  } },
  // 4s  – Macaron pops in with rotation
  macaron:  { frame: 120, from: 'pop',    cfg: { damping: 13, stiffness: 190, mass: 0.75 } },
};

// Frame at which all images start snapping to the final grid
const ORGANIZE_FRAME = 182;

const OFFSETS: Record<EnterFrom, { dx: number; dy: number }> = {
  bottom: { dx: 0,    dy: 380  },
  top:    { dx: 0,    dy: -460 },
  left:   { dx: -780, dy: 0   },
  right:  { dx: 780,  dy: 0   },
  pop:    { dx: 0,    dy: 0   },
};

// ─── ImageCard ────────────────────────────────────────────────────────────────

function ImageCard({ id }: { id: ImageKey }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { frame: enterFrame, from, cfg } = ENTER[id];
  const sc = SCATTERED[id];
  const fin = FINAL[id];
  const offset = OFFSETS[from];

  const rel = frame - enterFrame;
  if (rel < 0) return null;

  // Entry spring (scattered)
  const enterSp = spring({ frame: rel, fps, config: cfg });

  // Organize spring (final grid) — kicks in at ORGANIZE_FRAME
  const orgRel = Math.max(0, frame - ORGANIZE_FRAME);
  const orgSp = orgRel > 0
    ? spring({ frame: orgRel, fps, config: { damping: 24, stiffness: 195, mass: 0.85 } })
    : 0;

  // Opacity: fade in over 8 frames on entry
  const opacity = Math.min(1, rel / 8);

  // Entry scale for 'pop' items
  const popScale = from === 'pop'
    ? interpolate(enterSp, [0, 1], [0.45, 1], { extrapolateRight: 'clamp' })
    : 1;

  // Scattered x/y (animated from off-screen on entry)
  const sx = interpolate(enterSp, [0, 1], [sc.x + offset.dx, sc.x], { extrapolateRight: 'clamp' });
  const sy = interpolate(enterSp, [0, 1], [sc.y + offset.dy, sc.y], { extrapolateRight: 'clamp' });

  // Blend scattered → final
  const x = interpolate(orgSp, [0, 1], [sx, fin.x], { extrapolateRight: 'clamp' });
  const y = interpolate(orgSp, [0, 1], [sy, fin.y], { extrapolateRight: 'clamp' });
  const w = interpolate(orgSp, [0, 1], [sc.w, fin.w], { extrapolateRight: 'clamp' });
  const h = interpolate(orgSp, [0, 1], [sc.h, fin.h], { extrapolateRight: 'clamp' });
  const r = interpolate(orgSp, [0, 1], [sc.r, 0], { extrapolateRight: 'clamp' });
  const scale = from === 'pop'
    ? interpolate(orgSp, [0, 1], [popScale, 1], { extrapolateRight: 'clamp' })
    : 1;

  const shadowOpacity = interpolate(orgSp, [0, 1], [0.18, 0.04], { extrapolateRight: 'clamp' });
  const shadowBlur = interpolate(orgSp, [0, 1], [36, 8], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        opacity,
        transform: `rotate(${r}deg) scale(${scale})`,
        transformOrigin: 'center center',
        boxShadow: `0 ${Math.round(shadowBlur / 3)}px ${Math.round(shadowBlur)}px rgba(0,0,0,${shadowOpacity})`,
        borderRadius: 6,
        overflow: 'hidden',
      }}
    >
      <Img
        src={IMAGES[id]}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}

// ─── Text overlays ────────────────────────────────────────────────────────────

function TextPill({
  lines,
  startFrame,
  endFrame,
  x,
  y,
}: {
  lines: string[];
  startFrame: number;
  endFrame: number;
  x: number;
  y: number;
}) {
  const frame = useCurrentFrame();
  const relIn = frame - startFrame;
  const relOut = endFrame - frame;
  if (relIn < 0 || relOut < 0) return null;

  const opacity = Math.min(Math.min(1, relIn / 14), Math.min(1, relOut / 14));
  const ty = interpolate(Math.min(relIn, 14), [0, 14], [12, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `translateY(${ty}px)`,
        background: 'rgba(255,250,248,0.88)',
        backdropFilter: 'blur(4px)',
        borderRadius: 14,
        padding: '22px 36px',
        maxWidth: 680,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: i === 0 ? 48 : 40,
            fontWeight: i === 0 ? 600 : 400,
            lineHeight: 1.35,
            color: i === 0 ? '#1a1614' : '#5a4f4b',
            letterSpacing: '0.01em',
          }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

function FinalCTA() {
  const frame = useCurrentFrame();
  const startFrame = 228;
  const rel = frame - startFrame;
  if (rel < 0) return null;

  const opacity = Math.min(1, rel / 22);
  const ty = interpolate(Math.min(rel, 22), [0, 22], [24, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 380,
        background: 'linear-gradient(to top, rgba(250,245,242,0.97) 55%, transparent)',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: 64,
        paddingLeft: 52,
        opacity,
        transform: `translateY(${ty}px)`,
      }}
    >
      <div
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          color: '#1a1614',
          letterSpacing: '0.015em',
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.35 }}>
          Puedo crear imágenes
        </div>
        <div style={{ fontSize: 52, fontWeight: 600, lineHeight: 1.35 }}>
          para tu marca
        </div>
        <div style={{ fontSize: 42, fontWeight: 400, lineHeight: 1.4, marginTop: 14, color: '#7a6e6a' }}>
          en el estilo que necesites.
        </div>
      </div>
    </div>
  );
}

// ─── Global zoom-out reveal ───────────────────────────────────────────────────

function GlobalZoom({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle zoom out when the grid snaps (frame 180-240)
  const zoomSp = spring({
    frame: Math.max(0, frame - ORGANIZE_FRAME),
    fps,
    config: { damping: 30, stiffness: 80, mass: 1 },
  });
  const scale = interpolate(zoomSp, [0, 1], [1.06, 1.0], { extrapolateRight: 'clamp' });

  return (
    <div style={{ width: '100%', height: '100%', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
      {children}
    </div>
  );
}

// ─── Main composition ─────────────────────────────────────────────────────────

export function TheodoraVideo() {
  const ORDER: ImageKey[] = ['theodora', 'car', 'cloche', 'domeTray', 'pancakes', 'smoothie', 'macaron'];

  return (
    <AbsoluteFill style={{ background: '#faf5f2' }}>
      <GlobalZoom>
        {ORDER.map((id) => (
          <ImageCard key={id} id={id} />
        ))}
      </GlobalZoom>

      {/* 0s–2s: editorial hook */}
      <TextPill
        lines={['Imágenes bonitas, sí.', 'Pero con dirección visual.']}
        startFrame={8}
        endFrame={68}
        x={52}
        y={860}
      />

      {/* 3s–5s: concept statement */}
      <TextPill
        lines={['Un mismo universo visual.', 'Muchas variaciones posibles.']}
        startFrame={95}
        endFrame={162}
        x={52}
        y={1440}
      />

      {/* 7.6s onwards: final CTA */}
      <FinalCTA />
    </AbsoluteFill>
  );
}
