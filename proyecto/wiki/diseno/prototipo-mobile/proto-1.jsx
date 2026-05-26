// Tasainmuebles — Prototipo navegable
// Single iOS frame, route-based, accordions/tabs interactivos, modales overlay.

const { useState, useEffect, useRef, createContext, useContext } = React;

// ─────────────── ROUTE STATE ───────────────
const STORAGE_KEY = 'tasainmuebles_proto_v1';

function useRoute() {
  const [route, _setRoute] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved && saved.screen) return saved;
    } catch {}
    return { screen: 'splash', tab: 'tasacion', mode: 'tasador' };
  });
  const setRoute = (next) => {
    const merged = typeof next === 'function' ? next(route) : { ...route, ...next };
    _setRoute(merged);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(merged)); } catch {}
  };
  return [route, setRoute];
}

const Ctx = createContext(null);
const useNav = () => useContext(Ctx);

// ─────────────── DEVICE FRAME ───────────────
function DeviceFrame({ children, dark = false }) {
  return (
    <div style={{
      width: 402, height: 850, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: dark ? '#000' : '#F4F5F8',
      boxShadow: '0 30px 60px rgba(15,23,42,0.18), 0 0 0 1px rgba(15,23,42,0.12), inset 0 0 0 2px rgba(255,255,255,0.5)',
    }}>
      <StatusBar dark={dark}/>
      <div className="app" style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ paddingTop: 54, height: '100%', overflow: 'auto', position: 'relative' }}>
          {children}
        </div>
      </div>
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 130, height: 4, borderRadius: 4, background: 'rgba(0,0,0,0.28)', zIndex: 200, pointerEvents: 'none',
      }}/>
    </div>
  );
}

// ─────────────── BACK / APPBAR ───────────────
function AppBarI({ title, back = true, onBack }) {
  const nav = useNav();
  return (
    <div className="appbar">
      {back && <button className="appbar-back" onClick={() => onBack ? onBack() : nav.back()}>{Ico.back({ style: { color: '#374151' } })}</button>}
      <div className="appbar-title">{title}</div>
      {back && <div style={{ width: 36 }}/>}
    </div>
  );
}

function BrandBarI({ onMenu }) {
  return (
    <div className="brandbar">
      <Wordmark size={16}/>
      <div className="brandbar-spacer"/>
      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #FBBF24, #F87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700 }}>F</div>
      <button style={{ color: '#374151', background: 'transparent', border: 0, cursor: 'pointer' }}>{Ico.bell()}</button>
      <button style={{ color: '#374151', background: 'transparent', border: 0, cursor: 'pointer' }} onClick={onMenu}>{Ico.dots()}</button>
    </div>
  );
}

// ─────────────── BOTTOM NAV (interactive) ───────────────
function BottomNavI({ active = 'tasaciones' }) {
  const nav = useNav();
  const go = (id) => {
    if (id === 'fab') nav.go('nueva');
    else if (id === 'home' || id === 'tasaciones') nav.go(nav.route.mode === 'b2c' ? 'b2c-home' : 'home');
    else nav.go('comingsoon', { feature: id });
  };
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
        if (it.id === 'fab') return <button key="fab" className="fab" onClick={() => go('fab')}>{Ico.plus()}</button>;
        const isActive = active === it.id;
        return (
          <button key={it.id} className={`nav-item ${isActive ? 'active' : ''}`} onClick={() => go(it.id)} style={{ background: 'transparent', border: 0 }}>
            {it.icon({ style: { color: 'currentColor', width: 22, height: 22 } })}
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────── 01 SPLASH (auto transition) ───────────────
function Splash() {
  const nav = useNav();
  useEffect(() => {
    const t = setTimeout(() => nav.go('bienvenida'), 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <DeviceFrame>
      <div style={{ height: '100%', background: 'linear-gradient(180deg, #FFF7F5 0%, #FFE8E4 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        <div style={{ animation: 'fadeIn 0.8s ease both' }}><Isotipo size={84}/></div>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', animation: 'fadeIn 0.8s ease 0.2s both' }}>
          <span style={{ color: '#F87171' }}>Tasa</span><span style={{ color: '#1F2937' }}>inmuebles</span>
        </div>
        <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500, animation: 'fadeIn 0.8s ease 0.4s both' }}>Tasaciones inmobiliarias profesionales</div>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── 02 BIENVENIDA ───────────────
function Bienvenida() {
  const nav = useNav();
  return (
    <DeviceFrame>
      <div style={{ height: '100%', padding: '40px 28px 40px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 30 }}>
          <Isotipo size={64}/>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#F87171' }}>Tasa</span><span style={{ color: '#1F2937' }}>inmuebles</span>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.2 }}>Tasaciones que se firman.</div>
          <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>Profesionales matriculados, validados en comité, entregados en PDF.</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full" onClick={() => nav.go('registro')}>Quiero tasar mi propiedad</button>
          <button className="btn btn-outline btn-full" onClick={() => nav.go('login')}>Soy Tasador · Iniciar sesión</button>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>Argentina · Colegio de Arquitectos</div>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── 03 LOGIN ───────────────
function Login() {
  const nav = useNav();
  const [email, setEmail] = useState('m.barroso@tasainmuebles.ar');
  const [pwd, setPwd] = useState('demo1234');
  const [show, setShow] = useState(false);
  const submit = () => nav.go('home', { mode: 'tasador' });
  return (
    <DeviceFrame>
      <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <button className="appbar-back" style={{ background: '#F1F2F6', marginBottom: 14 }} onClick={() => nav.back()}>{Ico.back({ style: { color: '#374151' } })}</button>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Bienvenido de vuelta</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Ingresá con tu cuenta de tasador.</div>

        <div className="field">
          <label className="field-label">Email</label>
          <div className="input-with-icon">
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
            <span className="input-icon">{Ico.email()}</span>
          </div>
        </div>
        <div className="field">
          <label className="field-label">Contraseña</label>
          <div className="input-with-icon">
            <input className="input" type={show ? 'text' : 'password'} value={pwd} onChange={e => setPwd(e.target.value)}/>
            <button className="input-icon" style={{ background: 'transparent', border: 0, cursor: 'pointer' }} onClick={() => setShow(s => !s)}>{Ico.eye()}</button>
          </div>
        </div>
        <a style={{ alignSelf: 'flex-end', fontSize: 13, color: '#9CA3AF', fontWeight: 600, marginTop: -2, marginBottom: 18 }}>¿Olvidaste tu contraseña?</a>
        <button className="btn btn-primary btn-full" onClick={submit}>Iniciar sesión</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9CA3AF', fontSize: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
          <span>credenciales pre-cargadas por admin</span>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 13, color: '#6B7280' }}>
          ¿No tenés cuenta? <a style={{ color: '#EF4444', fontWeight: 700, marginLeft: 6, cursor: 'pointer' }} onClick={() => nav.go('registro')}>Registrate como cliente</a>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── 04 REGISTRO B2C ───────────────
function Registro() {
  const nav = useNav();
  const [accept, setAccept] = useState(true);
  return (
    <DeviceFrame>
      <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <button className="appbar-back" style={{ background: '#F1F2F6', marginBottom: 14 }} onClick={() => nav.back()}>{Ico.back({ style: { color: '#374151' } })}</button>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Creá tu cuenta</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Tasá tu inmueble en minutos. Gratis y sin certificación.</div>

        <div className="field"><label className="field-label">Email</label><input className="input" placeholder="vos@email.com"/></div>
        <div className="field">
          <label className="field-label">Contraseña</label>
          <input className="input" type="password" placeholder="Mínimo 8 caracteres"/>
          <div className="field-hint">Debe tener al menos 8 caracteres y una mayúscula.</div>
        </div>
        <div className="field"><label className="field-label">Repetir contraseña</label><input className="input" type="password"/></div>

        <button onClick={() => setAccept(a => !a)} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 0 4px', background: 'transparent', border: 0, textAlign: 'left', cursor: 'pointer', width: '100%' }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: accept ? '#F87171' : '#fff', border: accept ? 0 : '1.5px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', marginTop: 1 }}>
            {accept && Ico.check({ style: { color: '#fff', width: 12, height: 12 } })}
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
            Acepto los <a style={{ color: '#EF4444', fontWeight: 600 }}>Términos y Condiciones</a> y el tratamiento de mis datos conforme a la <a style={{ color: '#EF4444', fontWeight: 600 }}>Ley 25.326</a>.
          </div>
        </button>

        <button className={`btn ${accept ? 'btn-primary' : 'btn-disabled'} btn-full`} style={{ marginTop: 18 }} onClick={() => accept && nav.go('b2c-home', { mode: 'b2c' })}>Crear cuenta</button>
      </div>
    </DeviceFrame>
  );
}

Object.assign(window, { useRoute, Ctx, useNav, DeviceFrame, AppBarI, BrandBarI, BottomNavI, Splash, Bienvenida, Login, Registro });
