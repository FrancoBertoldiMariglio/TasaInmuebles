// Tasainmuebles — Components: icons, logo, buttons, status bar, illustrations
// All globally exposed via window.

// ─────────────── ICONS (Lucide-style stroke) ───────────────
const Ico = {
  back: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  bell: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  dots: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>,
  search: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  filter: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="6" r="2" fill="#fff" stroke="currentColor" strokeWidth="2"/><circle cx="15" cy="12" r="2" fill="#fff" stroke="currentColor" strokeWidth="2"/></svg>,
  plus: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  edit: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M11 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  doc: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chart: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 3v18h18M7 14l4-4 4 4 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  megaphone: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1zM16 8a4 4 0 0 1 0 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  home: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  pin: (p={}) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 21s-7-7-7-12a7 7 0 0 1 14 0c0 5-7 12-7 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/></svg>,
  camera: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.8"/></svg>,
  image: (p={}) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="m21 15-5-5L5 21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  chevDown: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevLeft: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  chevRight: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  email: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  lock: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="11" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  eye: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/></svg>,
  check: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="m5 12 5 5 9-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  x: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  info: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  calendar: (p={}) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  download: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  share: (p={}) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}><circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/><circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="1.8"/><path d="m9 11 6-4M9 13l6 4" stroke="currentColor" strokeWidth="1.8"/></svg>,
  pdf: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="2" width="16" height="20" rx="2" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/><text x="12" y="16" textAnchor="middle" fontSize="6" fontWeight="700" fill="#EF4444" fontFamily="Manrope">PDF</text></svg>,

  // Property type icons
  pCasa: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 11l9-8 9 8v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  pDepto: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  pTerreno: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M4 4v6M4 4h6M20 4v6M20 4h-6M4 20v-6M4 20h6M20 20v-6M20 20h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  pGalpon: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 21V8l9-5 9 5v13M3 21h18M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  pLocal: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><path d="M3 9l2-5h14l2 5M3 9v11h18V9M3 9h18M9 14h6v6H9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  pOficina: (p={}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...p}><rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.8"/><path d="M8 8h2M14 8h2M8 12h2M14 12h2M8 16h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,

  robotomus: (p={}) => <svg width="36" height="36" viewBox="0 0 36 36" fill="none" {...p}>
    <circle cx="18" cy="6" r="1.5" fill="#10B981"/>
    <rect x="17.4" y="6" width="1.2" height="3" fill="#10B981"/>
    <rect x="7" y="9" width="22" height="20" rx="6" fill="#34D399"/>
    <rect x="7" y="9" width="22" height="20" rx="6" fill="none" stroke="#10B981" strokeWidth="1"/>
    <rect x="10" y="14" width="6" height="6" rx="1.5" fill="#1F2937"/>
    <rect x="20" y="14" width="6" height="6" rx="1.5" fill="#1F2937"/>
    <circle cx="12.5" cy="16.5" r="1.2" fill="#fff"/>
    <circle cx="22.5" cy="16.5" r="1.2" fill="#fff"/>
    <path d="M14 24h8" stroke="#1F2937" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M3 29l4-3v6z" fill="#34D399"/>
  </svg>,
};

// ─────────────── LOGO ───────────────
function Isotipo({ size = 32 }) {
  // 4 petals with coral→teal gradient
  const id = 'g-' + Math.random().toString(36).slice(2,7);
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FB923C"/>
          <stop offset="40%" stopColor="#F87171"/>
          <stop offset="100%" stopColor="#2DD4BF"/>
        </linearGradient>
      </defs>
      {/* 4 petals */}
      <path d="M20 4 C 14 4 10 8 10 14 C 10 18 13 20 16 20 C 18 20 20 18 20 14 V 4z" fill={`url(#${id})`}/>
      <path d="M36 20 C 36 14 32 10 26 10 C 22 10 20 13 20 16 C 20 18 22 20 26 20 H 36z" fill={`url(#${id})`} transform="rotate(0 20 20)" opacity="0.9"/>
      <path d="M20 36 C 26 36 30 32 30 26 C 30 22 27 20 24 20 C 22 20 20 22 20 26 V 36z" fill={`url(#${id})`} opacity="0.85"/>
      <path d="M4 20 C 4 26 8 30 14 30 C 18 30 20 27 20 24 C 20 22 18 20 14 20 H 4z" fill={`url(#${id})`} opacity="0.8"/>
      <circle cx="20" cy="20" r="3" fill="#fff"/>
    </svg>
  );
}

function Wordmark({ size = 18 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Isotipo size={size + 14}/>
      <span style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.01em' }}>
        <span style={{ color: '#F87171' }}>Tasa</span><span style={{ color: '#1F2937' }}>inmuebles</span>
      </span>
    </div>
  );
}

// ─────────────── STATUS BAR (inside frame, simplified) ───────────────
function StatusBar({ dark = false }) {
  const c = dark ? '#fff' : '#000';
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 54,
      padding: '18px 28px 0', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', zIndex: 50, pointerEvents: 'none',
    }}>
      <span style={{ fontWeight: 600, fontSize: 15, color: c }}>9:41</span>
      <div style={{ width: 110, height: 28, borderRadius: 16, background: '#000', position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)' }}/>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', color: c }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4" rx="0.5"/><rect x="4" y="4" width="3" height="6" rx="0.5"/><rect x="8" y="2" width="3" height="8" rx="0.5"/><rect x="12" y="0" width="3" height="10" rx="0.5"/></svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="currentColor"><path d="M7 2.5c1.8 0 3.4.7 4.6 1.8l.9-1A8 8 0 0 0 7 1a8 8 0 0 0-5.5 2.3l.9 1A6.5 6.5 0 0 1 7 2.5zm0 3c1 0 2 .4 2.7 1.1l1-1A5 5 0 0 0 7 4a5 5 0 0 0-3.6 1.6l1 1A3.8 3.8 0 0 1 7 5.5z"/><circle cx="7" cy="8.5" r="1.2"/></svg>
        <svg width="22" height="11" viewBox="0 0 22 11" fill="none"><rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="16" height="7" rx="1" fill="currentColor"/><rect x="20.5" y="3.5" width="1.2" height="4" rx="0.6" fill="currentColor" opacity="0.4"/></svg>
      </div>
    </div>
  );
}

// ─────────────── MODAL ILLUSTRATION PLACEHOLDERS ───────────────
// Line-art style with soft coral splash. Geometric, never photoreal.
function ModalIllo({ kind = 'check' }) {
  // soft coral blob behind
  const blob = (
    <ellipse cx="120" cy="80" rx="80" ry="48" fill="#FEE2E2" opacity="0.7"/>
  );
  const ink = '#1F2937';
  const skin = '#FFE0CB';
  const sleeve = '#86EFAC';

  if (kind === 'check') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        {/* paper */}
        <rect x="76" y="36" width="80" height="100" rx="4" fill="#fff" stroke={ink} strokeWidth="1.6" transform="rotate(-6 116 86)"/>
        <g transform="rotate(-6 116 86)">
          <rect x="86" y="56" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.4"/>
          <rect x="86" y="76" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.4"/>
          <path d="M88 80l3 3 5-6" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="86" y="96" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.4"/>
          <path d="M100 60h44M100 80h36M100 100h40" stroke={ink} strokeWidth="1.4" strokeLinecap="round"/>
        </g>
        {/* sleeve + hand holding pen */}
        <path d="M130 130 Q 150 155 200 145 L 210 165 L 130 165 Z" fill={sleeve}/>
        <circle cx="155" cy="138" r="2" fill="#10B981"/>
        <circle cx="165" cy="142" r="2" fill="#10B981"/>
        <ellipse cx="175" cy="125" rx="14" ry="11" fill={skin} stroke={ink} strokeWidth="1.4"/>
        <path d="M178 118l14-14" stroke={ink} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M193 105l4-4" stroke="#F87171" strokeWidth="4" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'archive') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        {/* archive box */}
        <rect x="80" y="92" width="92" height="50" rx="3" fill="#fff" stroke={ink} strokeWidth="1.6"/>
        <rect x="80" y="86" width="92" height="14" rx="2" fill="#E5E7EB" stroke={ink} strokeWidth="1.6"/>
        <rect x="116" y="80" width="20" height="10" rx="2" fill="#E5E7EB" stroke={ink} strokeWidth="1.4"/>
        {/* paper going in */}
        <rect x="118" y="50" width="18" height="40" rx="1.5" fill="#fff" stroke={ink} strokeWidth="1.4" transform="rotate(-12 127 70)"/>
        {/* hand from top */}
        <path d="M80 30 Q 90 45 115 55 L 130 50 L 135 30 Z" fill={sleeve}/>
        <ellipse cx="120" cy="58" rx="14" ry="10" fill={skin} stroke={ink} strokeWidth="1.4" transform="rotate(-30 120 58)"/>
        <circle cx="92" cy="36" r="1.6" fill="#10B981"/>
      </svg>
    );
  }
  if (kind === 'claps') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        {/* sparkles */}
        <path d="M70 50l3 6M76 47l-6 3" stroke={ink} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M180 60l4 5M184 60l-4 5" stroke={ink} strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="70" cy="80" r="2" fill={ink}/>
        <circle cx="180" cy="100" r="2" fill={ink}/>
        <path d="M90 40l3 3M93 40l-3 3" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
        {/* left hand */}
        <path d="M70 130 Q 70 100 100 90 L 130 105 L 130 135 Q 100 145 70 130 Z" fill={skin} stroke={ink} strokeWidth="1.5"/>
        <path d="M100 90 L 100 75 M 110 88 L 112 72 M 120 92 L 124 78" stroke={ink} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M70 130 Q 60 145 65 165 L 90 165 L 90 138 Z" fill={sleeve} stroke={ink} strokeWidth="1.4"/>
        {/* right hand */}
        <path d="M170 130 Q 170 100 140 90 L 110 105 L 110 135 Q 140 145 170 130 Z" fill={skin} stroke={ink} strokeWidth="1.5"/>
        <path d="M140 90 L 140 75 M 130 88 L 128 72 M 120 92 L 116 78" stroke={ink} strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M170 130 Q 180 145 175 165 L 150 165 L 150 138 Z" fill={sleeve} stroke={ink} strokeWidth="1.4"/>
        <circle cx="78" cy="155" r="1.4" fill="#10B981"/>
        <circle cx="160" cy="155" r="1.4" fill="#10B981"/>
      </svg>
    );
  }
  if (kind === 'paperplane') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        {/* hand */}
        <ellipse cx="80" cy="130" rx="22" ry="14" fill={skin} stroke={ink} strokeWidth="1.5"/>
        <path d="M70 142 Q 60 160 70 168 L 110 168 L 110 138 Z" fill={sleeve} stroke={ink} strokeWidth="1.4"/>
        {/* trajectory */}
        <path d="M100 110 Q 130 90 160 75" stroke={ink} strokeWidth="1.4" strokeDasharray="2 4" fill="none"/>
        {/* paper plane */}
        <path d="M165 55 L 200 70 L 175 80 L 170 95 L 165 78 L 145 70 Z" fill="#fff" stroke={ink} strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M165 78 L 175 80" stroke={ink} strokeWidth="1.4"/>
      </svg>
    );
  }
  if (kind === 'paper-up') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        <rect x="92" y="32" width="58" height="74" rx="3" fill="#fff" stroke={ink} strokeWidth="1.6"/>
        <rect x="100" y="44" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.3"/>
        <rect x="100" y="60" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.3"/>
        <rect x="100" y="76" width="8" height="8" rx="1.5" fill="none" stroke={ink} strokeWidth="1.3"/>
        <path d="M114 48h28M114 64h22M114 80h26" stroke={ink} strokeWidth="1.3" strokeLinecap="round"/>
        {/* hand pushing up */}
        <ellipse cx="120" cy="120" rx="20" ry="13" fill={skin} stroke={ink} strokeWidth="1.5"/>
        <path d="M100 132 L 100 165 L 140 165 L 140 132 Z" fill={sleeve} stroke={ink} strokeWidth="1.4"/>
        <path d="M118 105 V 120 M 108 108 V 122 M 128 108 V 122 M 138 110 V 122" stroke={ink} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'pass') {
    // hand from green sleeve passing to peach sleeve, paper between
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        {/* green sleeve (left, top) */}
        <path d="M30 40 Q 70 55 95 80 L 80 95 L 30 80 Z" fill={sleeve} stroke={ink} strokeWidth="1.4"/>
        <ellipse cx="92" cy="85" rx="14" ry="10" fill={skin} stroke={ink} strokeWidth="1.4" transform="rotate(20 92 85)"/>
        {/* paper */}
        <rect x="100" y="60" width="60" height="50" rx="2" fill="#fff" stroke={ink} strokeWidth="1.5" transform="rotate(-6 130 85)"/>
        <g transform="rotate(-6 130 85)">
          <rect x="108" y="72" width="6" height="6" rx="1" fill="none" stroke={ink} strokeWidth="1.2"/>
          <rect x="108" y="86" width="6" height="6" rx="1" fill="none" stroke={ink} strokeWidth="1.2"/>
          <rect x="108" y="100" width="6" height="6" rx="1" fill="none" stroke={ink} strokeWidth="1.2"/>
          <path d="M120 75h26M120 89h22M120 103h24" stroke={ink} strokeWidth="1.2" strokeLinecap="round"/>
        </g>
        {/* red sleeve (right, top) */}
        <path d="M210 30 Q 180 50 165 85 L 180 95 L 215 70 Z" fill="#F87171" stroke={ink} strokeWidth="1.4"/>
        <ellipse cx="160" cy="92" rx="14" ry="10" fill={skin} stroke={ink} strokeWidth="1.4" transform="rotate(-20 160 92)"/>
      </svg>
    );
  }
  if (kind === 'chart') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {blob}
        <rect x="60" y="38" width="120" height="80" rx="4" fill="#fff" stroke={ink} strokeWidth="1.6"/>
        <circle cx="70" cy="48" r="1.6" fill={ink}/><circle cx="76" cy="48" r="1.6" fill={ink}/><circle cx="82" cy="48" r="1.6" fill={ink}/>
        <path d="M60 56h120" stroke={ink} strokeWidth="1.3"/>
        {/* bars */}
        <rect x="74" y="80" width="10" height="28" fill="#FBBF24"/>
        <rect x="90" y="68" width="10" height="40" fill="#F87171"/>
        <rect x="106" y="92" width="10" height="16" fill="#60A5FA"/>
        <rect x="122" y="74" width="10" height="34" fill="#10B981"/>
        {/* pie */}
        <circle cx="155" cy="92" r="14" fill="#FEE2E2" stroke={ink} strokeWidth="1.4"/>
        <path d="M155 92 L 155 78 A 14 14 0 0 1 167 96 Z" fill="#F87171"/>
        {/* hand pointing */}
        <path d="M120 120 Q 140 140 175 130" stroke={ink} strokeWidth="1.4" fill="none"/>
        <ellipse cx="178" cy="128" rx="10" ry="8" fill={skin} stroke={ink} strokeWidth="1.3" transform="rotate(20 178 128)"/>
      </svg>
    );
  }
  if (kind === 'ok-hand') {
    return (
      <svg width="220" height="160" viewBox="0 0 240 170" fill="none">
        {/* sparkles */}
        <path d="M65 55l4 6M71 52l-6 4" stroke="#1F2937" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M175 70l3 6M181 70l-6 3" stroke="#1F2937" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M165 50l3 3M168 50l-3 3" stroke="#1F2937" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="80" cy="90" r="1.6" fill="#1F2937"/>
        <circle cx="190" cy="120" r="1.6" fill="#1F2937"/>
        {/* hand */}
        <ellipse cx="120" cy="100" rx="28" ry="32" fill={skin} stroke={ink} strokeWidth="1.6"/>
        <circle cx="108" cy="90" r="8" fill="#fff" stroke={ink} strokeWidth="1.6"/>
        <path d="M120 70 Q 145 70 145 92 Q 145 95 142 96" stroke={ink} strokeWidth="1.5" fill="none"/>
        <path d="M132 95 Q 138 100 138 110" stroke={ink} strokeWidth="1.5" fill="none"/>
        <path d="M134 110 Q 140 115 138 125" stroke={ink} strokeWidth="1.5" fill="none"/>
        <path d="M135 125 Q 138 130 132 135" stroke={ink} strokeWidth="1.5" fill="none"/>
        <path d="M110 140 L 130 145 L 120 160 Z" fill="#1F2937"/>
      </svg>
    );
  }
  if (kind === 'success-mini') {
    return (
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {Ico.check({ style: { color: '#fff', width: 18, height: 18 } })}
      </div>
    );
  }
  return null;
}

// ─────────────── PROPERTY CHIP ───────────────
function PropertyChips({ selected = 'casa', scroll = true }) {
  const items = [
    { id: 'casa', label: 'Casa', icon: Ico.pCasa },
    { id: 'depto', label: 'Departamento', icon: Ico.pDepto },
    { id: 'terreno', label: 'Terreno', icon: Ico.pTerreno },
    { id: 'galpon', label: 'Galpón', icon: Ico.pGalpon },
    { id: 'local', label: 'Local', icon: Ico.pLocal },
    { id: 'oficina', label: 'Oficina', icon: Ico.pOficina },
  ];
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: scroll ? 'auto' : 'visible', paddingBottom: 4 }}>
      {items.map(it => {
        const isSel = it.id === selected;
        return (
          <div key={it.id} className={`chip ${isSel ? 'selected' : 'soft'}`} style={!isSel ? { background: '#F4F0F1' } : {}}>
            {it.icon({ style: { color: 'currentColor', width: 22, height: 22 } })}
            <span>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────── BOTTOM NAV ───────────────
function BottomNav({ active = 'tasaciones' }) {
  const items = [
    { id: 'home', label: 'Home', icon: Ico.home },
    { id: 'tasaciones', label: 'Tasaciones', icon: Ico.doc },
    { id: 'fab' },
    { id: 'stats', label: 'Estadísticas', icon: Ico.chart },
    { id: 'comms', label: 'Comunicaciones', icon: Ico.megaphone },
  ];
  return (
    <div className="bottom-nav">
      {items.map(it => {
        if (it.id === 'fab') return <button key="fab" className="fab">{Ico.plus()}</button>;
        const isActive = active === it.id;
        return (
          <div key={it.id} className={`nav-item ${isActive ? 'active' : ''}`}>
            {it.icon({ style: { color: 'currentColor', width: 22, height: 22 } })}
            <span>{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────── ACCORDION ───────────────
function Accordion({ title, open = false, children, coral = false }) {
  return (
    <div className="accordion">
      <div className={`accordion-head ${open || coral ? 'open' : ''}`}>
        <span>{title}</span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>
          {Ico.chevDown()}
        </span>
      </div>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}

// ─────────────── APP BAR ───────────────
function AppBar({ title, back = true, right = null }) {
  return (
    <div className="appbar">
      {back && <button className="appbar-back">{Ico.back({ style: { color: '#374151' } })}</button>}
      <div className="appbar-title">{title}</div>
      {right}
    </div>
  );
}

function BrandBar() {
  return (
    <div className="brandbar">
      <Wordmark size={16}/>
      <div className="brandbar-spacer"/>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #FBBF24, #F87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>F</div>
      <div style={{ color: '#374151' }}>{Ico.bell()}</div>
      <div style={{ color: '#374151' }}>{Ico.dots()}</div>
    </div>
  );
}

// Export everything
Object.assign(window, {
  Ico, Isotipo, Wordmark, StatusBar, ModalIllo,
  PropertyChips, BottomNav, Accordion, AppBar, BrandBar,
});
