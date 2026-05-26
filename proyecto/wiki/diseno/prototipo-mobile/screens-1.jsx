// Tasainmuebles — Screens (all 22+ screens) 
// Each screen is rendered inside a 380x780 iOS frame (custom — no status bar nav).

const FRAME_W = 390;
const FRAME_H = 780;

function Frame({ children, dark = false, label = '' }) {
  return (
    <div style={{
      width: FRAME_W, height: FRAME_H,
      borderRadius: 38, overflow: 'hidden', position: 'relative',
      background: dark ? '#000' : '#F4F5F8',
      boxShadow: '0 24px 48px rgba(15,23,42,0.10), 0 0 0 1px rgba(15,23,42,0.08)',
    }} data-screen-label={label}>
      <StatusBar dark={dark}/>
      <div className="app" style={{ height: '100%', overflow: 'hidden' }}>
        <div style={{ paddingTop: 54, height: '100%', overflow: 'auto', position: 'relative' }}>
          {children}
        </div>
      </div>
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 6, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 4, borderRadius: 4, background: 'rgba(0,0,0,0.25)', zIndex: 200,
      }}/>
    </div>
  );
}

// ─────────────── 01 SPLASH ───────────────
function ScreenSplash() {
  return (
    <Frame label="01 Splash">
      <div style={{ height: '100%', background: 'linear-gradient(180deg, #FFF7F5 0%, #FFE8E4 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
        <Isotipo size={80}/>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span style={{ color: '#F87171' }}>Tasa</span><span style={{ color: '#1F2937' }}>inmuebles</span>
        </div>
        <div style={{ fontSize: 13, color: '#9CA3AF', fontWeight: 500 }}>Tasaciones inmobiliarias profesionales</div>
        <div style={{ position: 'absolute', bottom: 40, color: '#9CA3AF', fontSize: 12 }}>v0.1 · MVP Hito 1</div>
      </div>
    </Frame>
  );
}

// ─────────────── 02 BIENVENIDA BIFURCADA ───────────────
function ScreenBienvenida() {
  return (
    <Frame label="02 Bienvenida">
      <div style={{ height: '100%', padding: '40px 28px 40px', display: 'flex', flexDirection: 'column', background: '#fff' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginTop: 30 }}>
          <Isotipo size={64}/>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#F87171' }}>Tasa</span><span style={{ color: '#1F2937' }}>inmuebles</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.2 }}>
            Tasaciones que se firman.
          </div>
          <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>
            Profesionales matriculados, validados en comité, entregados en PDF.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-full">Quiero tasar mi propiedad</button>
          <button className="btn btn-outline btn-full">Soy Tasador · Iniciar sesión</button>
          <div style={{ textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>
            Argentina · Colegio de Arquitectos
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────── 03 LOGIN TASADOR ───────────────
function ScreenLogin() {
  return (
    <Frame label="03 Login Tasador">
      <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', gap: 4, height: '100%', background: '#fff' }}>
        <button className="appbar-back" style={{ background: '#F1F2F6', marginBottom: 14 }}>{Ico.back({ style: { color: '#374151' } })}</button>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Bienvenido de vuelta</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Ingresá con tu cuenta de tasador.</div>

        <div className="field">
          <label className="field-label">Email</label>
          <div className="input-with-icon">
            <input className="input" type="email" placeholder="arquitecto@estudio.com" defaultValue="m.barroso@tasainmuebles.ar"/>
            <span className="input-icon">{Ico.email()}</span>
          </div>
        </div>

        <div className="field">
          <label className="field-label">Contraseña</label>
          <div className="input-with-icon">
            <input className="input" type="password" placeholder="••••••••" defaultValue="••••••••••"/>
            <span className="input-icon">{Ico.eye()}</span>
          </div>
        </div>

        <a style={{ alignSelf: 'flex-end', fontSize: 13, color: '#9CA3AF', fontWeight: 600, marginTop: -2, marginBottom: 18 }}>¿Olvidaste tu contraseña?</a>

        <button className="btn btn-primary btn-full">Iniciar sesión</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#9CA3AF', fontSize: 12, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
          <span>credenciales pre-cargadas por admin</span>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', fontSize: 13, color: '#6B7280' }}>
          ¿No tenés cuenta? <a style={{ color: '#EF4444', fontWeight: 700, marginLeft: 6 }}>Registrate como cliente</a>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────── 04 AUTOREGISTRO B2C ───────────────
function ScreenRegistro() {
  return (
    <Frame label="04 Autoregistro B2C">
      <div style={{ padding: '20px 24px 40px', display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
        <button className="appbar-back" style={{ background: '#F1F2F6', marginBottom: 14 }}>{Ico.back({ style: { color: '#374151' } })}</button>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Creá tu cuenta</div>
        <div style={{ fontSize: 14, color: '#6B7280', marginBottom: 20 }}>Tasá tu inmueble en minutos. Gratis y sin certificación.</div>

        <div className="field">
          <label className="field-label">Email</label>
          <input className="input" placeholder="vos@email.com"/>
        </div>
        <div className="field">
          <label className="field-label">Contraseña</label>
          <input className="input" type="password" placeholder="Mínimo 8 caracteres"/>
          <div className="field-hint">Debe tener al menos 8 caracteres y una mayúscula.</div>
        </div>
        <div className="field">
          <label className="field-label">Repetir contraseña</label>
          <input className="input" type="password" placeholder="••••••••"/>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 0 4px' }}>
          <div style={{ width: 20, height: 20, borderRadius: 5, background: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', marginTop: 1 }}>
            {Ico.check({ style: { color: '#fff', width: 12, height: 12 } })}
          </div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>
            Acepto los <a style={{ color: '#EF4444', fontWeight: 600 }}>Términos y Condiciones</a> y el tratamiento de mis datos conforme a la <a style={{ color: '#EF4444', fontWeight: 600 }}>Ley 25.326</a>.
          </div>
        </div>

        <button className="btn btn-primary btn-full" style={{ marginTop: 18 }}>Crear cuenta</button>
      </div>
    </Frame>
  );
}

// ─────────────── 05 MIS TASACIONES (HOME TASADOR) ───────────────
function ScreenMisTasaciones() {
  const rows = [
    { id: '5603', date: '05/28/2026', user: 'Marcos Barroso', tasador: 'Gaspar N.' },
    { id: '05822', date: '02/04/2026', user: 'Eleonora Ferrari', tasador: 'Alfredo C.' },
    { id: '00347', date: '23/12/2025', user: 'Valentina Vitale', tasador: 'Joaquín A.' },
    { id: '4472', date: '17/09/2025', user: 'Camila Pereyra', tasador: 'Gaspar N.' },
    { id: '5601', date: '04/09/2025', user: 'Pedro Suárez', tasador: 'Mario P.' },
    { id: '5598', date: '01/09/2025', user: 'Lucía Mendoza', tasador: 'Alfredo C.' },
  ];
  return (
    <Frame label="05 Mis Tasaciones">
      <BrandBar/>
      <div style={{ padding: '18px 16px 100px' }}>
        <div className="section-title">Tasaciones</div>

        {/* KPI cards row */}
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginBottom: 18 }}>
          <KpiCard label="A editar" color="#FBBF24" value="149" icon={Ico.edit}/>
          <KpiCard label="A tasar" color="#34D399" value="03" icon={Ico.doc}/>
          <KpiCard label="A publicar" color="#60A5FA" value="02" icon={Ico.share}/>
        </div>

        {/* Listado */}
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Listado de tasaciones</div>
          <div className="search-pill" style={{ marginBottom: 12 }}>
            <span style={{ color: '#9CA3AF' }}>{Ico.search()}</span>
            <input placeholder="Buscar tasaciones"/>
            <span style={{ color: '#9CA3AF' }}>{Ico.filter()}</span>
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
            <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10 }}>Todas</button>
            <button className="btn" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10, background: '#F1F2F6', color: '#6B7280', flexShrink: 0 }}>Pendientes</button>
            <button className="btn" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10, background: '#F1F2F6', color: '#6B7280', flexShrink: 0 }}>Sin asignar</button>
            <button className="btn" style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10, background: '#F1F2F6', color: '#6B7280', flexShrink: 0 }}>En proceso</button>
          </div>

          <table className="t-table" style={{ marginTop: 6 }}>
            <thead><tr><th>ID</th><th>FECHA</th><th>USUARIO</th><th>ESTADO</th></tr></thead>
            <tbody>
              {rows.slice(0,5).map((r, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: '#1F2937' }}>{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.user}</td>
                  <td>
                    <span className={['badge', i % 4 === 0 ? 'badge-coral' : i % 4 === 1 ? 'badge-mint' : i % 4 === 2 ? 'badge-mustard' : 'badge-info'].join(' ')}>
                      {['Sin asignar','Apta','Pendiente','En proceso'][i % 4]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="page-dot">1</button>
            <button className="page-dot active">2</button>
            <button className="page-dot">3</button>
            <button className="page-dot">4</button>
            <button className="page-dot">5</button>
            <button className="page-dot">..</button>
            <button className="page-dot">17</button>
          </div>
        </div>
      </div>
      <BottomNav active="tasaciones"/>
    </Frame>
  );
}

function KpiCard({ label, value, color, icon }) {
  return (
    <div className="card-dark" style={{ minWidth: 180, padding: 16, flexShrink: 0 }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        {icon({ style: { color: 'rgba(255,255,255,0.7)', width: 18, height: 18 } })}
      </div>
      <div style={{ color, fontSize: 13, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 6, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>Ver tasaciones →</div>
    </div>
  );
}

// ─────────────── 06 NUEVA TASACIÓN ───────────────
function ScreenNueva({ section = 'motivo' }) {
  const sections = [
    { id: 'motivo', label: 'Motivo' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'solicitante', label: 'Solicitante' },
    { id: 'fotos', label: 'Fotos' },
    { id: 'detalles', label: 'Detalles' },
    { id: 'descripcion', label: 'Descripción del inmueble' },
  ];

  return (
    <Frame label={`06 Nueva Tasación · ${section}`}>
      <AppBar title="Nueva tasación" right={<div style={{ width: 36 }}/>}/>
      <div className="page" style={{ background: 'var(--bg)' }}>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#1F2937' }}>Tipo de inmueble</div>
          <PropertyChips selected="casa"/>
        </div>

        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: '#1F2937' }}>Datos de solicitud</div>
          <div>
            {sections.map(s => {
              const open = s.id === section;
              return (
                <div key={s.id} className="accordion">
                  <div className={`accordion-head ${open ? 'open' : ''}`}>
                    <span>{s.label}</span>
                    <span style={{ transform: open ? 'rotate(180deg)' : 'none' }}>{Ico.chevDown()}</span>
                  </div>
                  {open && <div className="accordion-body">{renderSectionBody(s.id)}</div>}
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn btn-primary btn-full" style={{ marginTop: 18 }}>Guardar cambios</button>
      </div>
    </Frame>
  );
}

function renderSectionBody(id) {
  if (id === 'motivo') {
    return (
      <div className="field" style={{ marginBottom: 0 }}>
        <label className="field-label">Seleccione un motivo para su tasación</label>
        <div className="input-with-icon">
          <select className="select" defaultValue="venta">
            <option value="venta">Tasación para venta</option>
            <option>Tasación para alquiler</option>
            <option>Sucesión</option>
            <option>Divorcio</option>
            <option>Judicial</option>
            <option>Garantía</option>
            <option>Contable</option>
            <option>Seguro</option>
            <option>Donación</option>
            <option>Otro</option>
          </select>
        </div>
        <div className="field-hint">10 motivos disponibles · seleccioná el más relevante</div>
      </div>
    );
  }
  if (id === 'ubicacion') {
    return (
      <div>
        <button className="btn btn-outline btn-full" style={{ marginBottom: 12 }}>
          {Ico.pin({ style: { color: 'currentColor' } })} Usar mi ubicación actual
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 12px' }}>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>o</span>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-label">Ingresá un domicilio</label>
          <input className="input" placeholder="Calle, número, ciudad" defaultValue="Joaquín V. González 1895, Mendoza"/>
          <div style={{ marginTop: 8, padding: 10, background: '#F4F5F8', borderRadius: 8, fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 8 }}>
            {Ico.pin({ style: { color: '#9CA3AF', width: 14, height: 14 } })}
            Joaquín V. González 1895, Godoy Cruz, Mendoza
          </div>
        </div>
      </div>
    );
  }
  if (id === 'solicitante') {
    return (
      <div>
        <div className="field">
          <label className="field-label">Nombre<span className="req">*</span></label>
          <input className="input" placeholder=""/>
        </div>
        <div className="field">
          <label className="field-label">Apellido<span className="req">*</span></label>
          <input className="input" placeholder=""/>
        </div>
        <div className="field">
          <label className="field-label">Número de teléfono<span className="req">*</span></label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="select" style={{ width: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: 13 }}>🇦🇷 +54</span>{Ico.chevDown({ style: { color: '#9CA3AF' } })}
            </div>
            <input className="input" style={{ flex: 1 }} placeholder="261 555 0000"/>
          </div>
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label className="field-label">Email</label>
          <div className="input-with-icon">
            <input className="input" placeholder="opcional"/>
            <span className="input-icon">{Ico.email()}</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5, marginTop: 8 }}>
          Los datos del solicitante se almacenan únicamente para fines de tasación profesional, en cumplimiento de la Ley 25.326.
        </div>
      </div>
    );
  }
  if (id === 'fotos') {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="photo-ph" style={{ aspectRatio: '1', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{Ico.x({ style: { width: 10, height: 10 } })}</div>
              foto {i}
            </div>
          ))}
          {[6,7,8].map(i => (
            <div key={i} className="photo-ph" style={{ aspectRatio: '1', background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF' }}>
              + slot
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-dark" style={{ flex: 1, fontSize: 13, padding: '12px' }}>{Ico.camera({ style: { width: 16, height: 16 } })} Tomar foto</button>
          <button className="btn btn-outline" style={{ flex: 1, fontSize: 13, padding: '12px' }}>{Ico.image({ style: { width: 16, height: 16 } })} Galería</button>
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 8 }}>5 / 15 fotos · mínimo 3 recomendadas</div>
      </div>
    );
  }
  if (id === 'detalles') {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="field"><label className="field-label">Sup. total (m²)</label><input className="input" placeholder="0"/></div>
          <div className="field"><label className="field-label">Sup. cubierta (m²)</label><input className="input" placeholder="0"/></div>
          <div className="field"><label className="field-label">Dormitorios</label><input className="input" placeholder="0"/></div>
          <div className="field"><label className="field-label">Baños</label><input className="input" placeholder="0"/></div>
          <div className="field"><label className="field-label">Antigüedad (años)</label><input className="input" placeholder="0"/></div>
          <div className="field"><label className="field-label">Estado</label><select className="select"><option>Muy bueno</option><option>Bueno</option><option>Regular</option></select></div>
        </div>
        <div className="field-label" style={{ marginTop: 6 }}>Amenities</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Pileta','Parrilla','Cochera','Dependencia','Balcón','Terraza','Jardín','Baulera'].map((a,i) => (
            <span key={a} className="badge" style={{ background: i < 3 ? '#FEE2E2' : '#F1F2F6', color: i < 3 ? '#EF4444' : '#6B7280', padding: '6px 10px', fontSize: 12 }}>
              {i < 3 && '✓ '}{a}
            </span>
          ))}
        </div>
      </div>
    );
  }
  if (id === 'descripcion') {
    return (
      <div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-label">Describí el inmueble</label>
          <textarea className="textarea" placeholder="Al menos 50 caracteres..." defaultValue="Casa estilo californiano sobre lote propio, con jardín delantero y galería techada. Excelente luminosidad y orientación norte."/>
          <div className="field-hint" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Mínimo 50 caracteres</span>
            <span style={{ color: '#10B981', fontWeight: 600 }}>148 / mín. 50 ✓</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

Object.assign(window, {
  Frame, FRAME_W, FRAME_H,
  ScreenSplash, ScreenBienvenida, ScreenLogin, ScreenRegistro,
  ScreenMisTasaciones, ScreenNueva, KpiCard,
});
