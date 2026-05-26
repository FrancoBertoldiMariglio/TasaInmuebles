// Tasainmuebles — Prototipo navegable, parte 2: Home, Nueva, Detalle, Compartir, B2C, Modales

const { useState: useS2, useEffect: useE2 } = React;

// ─────────────── DATA ───────────────
const SAMPLE_ROWS = [
  { id: '1578', date: '13/07/2026', user: 'Mario Pérez', tasador: 'Federico E.', tipo: 'casa', status: 'mustard', statusLabel: 'A tasar', addr: 'Joaquín V. González 1895, Mendoza' },
  { id: '5603', date: '05/28/2026', user: 'Marcos Barroso', tasador: 'Gaspar N.', tipo: 'depto', status: 'coral', statusLabel: 'Sin asignar' },
  { id: '05822', date: '02/04/2026', user: 'Eleonora Ferrari', tasador: 'Alfredo C.', tipo: 'casa', status: 'mint', statusLabel: 'Apta' },
  { id: '00347', date: '23/12/2025', user: 'Valentina Vitale', tasador: 'Joaquín A.', tipo: 'terreno', status: 'mustard', statusLabel: 'Pendiente' },
  { id: '4472', date: '17/09/2025', user: 'Camila Pereyra', tasador: 'Gaspar N.', tipo: 'depto', status: 'info', statusLabel: 'En proceso' },
  { id: '5601', date: '04/09/2025', user: 'Pedro Suárez', tasador: 'Mario P.', tipo: 'galpon', status: 'mint', statusLabel: 'Apta' },
  { id: '5598', date: '01/09/2025', user: 'Lucía Mendoza', tasador: 'Alfredo C.', tipo: 'local', status: 'info', statusLabel: 'En proceso' },
];

// ─────────────── KPI CARD ───────────────
function KpiCardI({ label, value, color, icon, onClick }) {
  return (
    <button onClick={onClick} className="card-dark" style={{ minWidth: 180, padding: 16, flexShrink: 0, textAlign: 'left', border: 0, color: '#fff', cursor: 'pointer', font: 'inherit' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px dashed rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        {icon({ style: { color: 'rgba(255,255,255,0.7)', width: 18, height: 18 } })}
      </div>
      <div style={{ color, fontSize: 13, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 6, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>Ver tasaciones →</div>
    </button>
  );
}

// ─────────────── 05 HOME TASADOR ───────────────
function HomeTasador() {
  const nav = useNav();
  const [tab, setTab] = useS2('Todas');
  const [q, setQ] = useS2('');
  const filtered = SAMPLE_ROWS.filter(r => {
    if (tab === 'Pendientes' && r.statusLabel !== 'Pendiente') return false;
    if (tab === 'Sin asignar' && r.statusLabel !== 'Sin asignar') return false;
    if (tab === 'En proceso' && r.statusLabel !== 'En proceso') return false;
    if (q && !r.user.toLowerCase().includes(q.toLowerCase()) && !r.id.includes(q)) return false;
    return true;
  });
  return (
    <DeviceFrame>
      <BrandBarI/>
      <div style={{ padding: '18px 16px 110px' }}>
        <div className="section-title">Tasaciones</div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4, marginBottom: 18 }}>
          <KpiCardI label="A editar" color="#FBBF24" value="149" icon={Ico.edit} onClick={() => setTab('Pendientes')}/>
          <KpiCardI label="A tasar" color="#34D399" value="03" icon={Ico.doc} onClick={() => setTab('Todas')}/>
          <KpiCardI label="A publicar" color="#60A5FA" value="02" icon={Ico.share} onClick={() => setTab('En proceso')}/>
        </div>

        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Listado de tasaciones</div>
          <div className="search-pill" style={{ marginBottom: 12 }}>
            <span style={{ color: '#9CA3AF' }}>{Ico.search()}</span>
            <input placeholder="Buscar tasaciones" value={q} onChange={e => setQ(e.target.value)}/>
            <span style={{ color: '#9CA3AF' }}>{Ico.filter()}</span>
          </div>

          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
            {['Todas','Pendientes','Sin asignar','En proceso'].map(t => (
              <button key={t} className="btn" onClick={() => setTab(t)} style={{ padding: '8px 14px', fontSize: 13, borderRadius: 10, flexShrink: 0, background: tab === t ? '#F87171' : '#F1F2F6', color: tab === t ? '#fff' : '#6B7280' }}>{t}</button>
            ))}
          </div>

          <table className="t-table" style={{ marginTop: 6 }}>
            <thead><tr><th>ID</th><th>FECHA</th><th>USUARIO</th><th>ESTADO</th></tr></thead>
            <tbody>
              {filtered.slice(0, 6).map(r => (
                <tr key={r.id} onClick={() => nav.go('detalle', { tab: 'tasacion', tasacion: r })} style={{ cursor: 'pointer' }}>
                  <td style={{ fontWeight: 600, color: '#1F2937' }}>{r.id}</td>
                  <td>{r.date}</td>
                  <td>{r.user}</td>
                  <td><span className={`badge badge-${r.status}`}>{r.statusLabel}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="4" style={{ textAlign: 'center', padding: '30px 0', color: '#9CA3AF' }}>Sin resultados</td></tr>}
            </tbody>
          </table>
          {filtered.length > 0 && (
            <div className="pagination">
              <button className="page-dot">1</button><button className="page-dot active">2</button><button className="page-dot">3</button><button className="page-dot">4</button><button className="page-dot">5</button><button className="page-dot">..</button><button className="page-dot">17</button>
            </div>
          )}
        </div>
      </div>
      <BottomNavI active="tasaciones"/>
    </DeviceFrame>
  );
}

// ─────────────── 06 NUEVA TASACIÓN (acordeón interactivo) ───────────────
function NuevaTasacion() {
  const nav = useNav();
  const [tipo, setTipo] = useS2('casa');
  const [open, setOpen] = useS2('motivo');
  const [data, setData] = useS2({
    motivo: 'venta',
    domicilio: '',
    nombre: '', apellido: '', tel: '', email: '',
    superficie: '', sup_cub: '', dorm: '', banios: '', antig: '', estado: 'Bueno',
    desc: '',
    amenities: [],
    fotos: [],
  });

  const toggle = (k) => setOpen(o => o === k ? null : k);
  const upd = (k, v) => setData(d => ({ ...d, [k]: v }));
  const toggleAmenity = (a) => setData(d => ({ ...d, amenities: d.amenities.includes(a) ? d.amenities.filter(x => x !== a) : [...d.amenities, a] }));

  const onSave = () => nav.openModal('alta');

  return (
    <DeviceFrame>
      <AppBarI title="Nueva tasación"/>
      <div className="page">
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Tipo de inmueble</div>
          <PropertyChipsI selected={tipo} onSelect={setTipo}/>
        </div>

        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Datos de solicitud</div>

          {[
            ['motivo', 'Motivo'],
            ['ubicacion', 'Ubicación'],
            ['solicitante', 'Solicitante'],
            ['fotos', 'Fotos'],
            ['detalles', 'Detalles'],
            ['descripcion', 'Descripción del inmueble'],
          ].map(([k, label]) => (
            <div key={k} className="accordion">
              <button className={`accordion-head ${open === k ? 'open' : ''}`} onClick={() => toggle(k)} style={{ background: open === k ? 'var(--coral-soft)' : 'transparent', border: 0, width: '100%', textAlign: 'left', font: 'inherit', cursor: 'pointer' }}>
                <span>{label}</span>
                <span style={{ transform: open === k ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>{Ico.chevDown()}</span>
              </button>
              {open === k && <div className="accordion-body">{renderBody(k, data, upd, tipo, toggleAmenity)}</div>}
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full" style={{ marginTop: 18 }} onClick={onSave}>Guardar cambios</button>
      </div>
    </DeviceFrame>
  );
}

function PropertyChipsI({ selected, onSelect }) {
  const items = [
    { id: 'casa', label: 'Casa', icon: Ico.pCasa },
    { id: 'depto', label: 'Departamento', icon: Ico.pDepto },
    { id: 'terreno', label: 'Terreno', icon: Ico.pTerreno },
    { id: 'galpon', label: 'Galpón', icon: Ico.pGalpon },
    { id: 'local', label: 'Local', icon: Ico.pLocal },
    { id: 'oficina', label: 'Oficina', icon: Ico.pOficina },
  ];
  return (
    <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
      {items.map(it => {
        const isSel = it.id === selected;
        return (
          <button key={it.id} className={`chip ${isSel ? 'selected' : 'soft'}`} onClick={() => onSelect(it.id)} style={!isSel ? { background: '#F4F0F1', border: 0 } : { border: 0, cursor: 'pointer' }}>
            {it.icon({ style: { color: 'currentColor', width: 22, height: 22 } })}
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function renderBody(k, d, upd, tipo, toggleAmenity) {
  if (k === 'motivo') {
    return (
      <div className="field" style={{ marginBottom: 0 }}>
        <label className="field-label">Seleccione un motivo para su tasación</label>
        <select className="select" value={d.motivo} onChange={e => upd('motivo', e.target.value)}>
          <option value="venta">Tasación para venta</option>
          <option value="alquiler">Tasación para alquiler</option>
          <option value="sucesion">Sucesión</option>
          <option value="divorcio">Divorcio</option>
          <option value="judicial">Judicial</option>
          <option value="garantia">Garantía</option>
          <option value="contable">Contable</option>
          <option value="seguro">Seguro</option>
          <option value="donacion">Donación</option>
          <option value="otro">Otro</option>
        </select>
      </div>
    );
  }
  if (k === 'ubicacion') {
    return (
      <div>
        <button className="btn btn-outline btn-full" style={{ marginBottom: 12 }} onClick={() => upd('domicilio', 'Joaquín V. González 1895, Godoy Cruz, Mendoza')}>
          {Ico.pin({ style: { color: 'currentColor' } })} Usar mi ubicación actual
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0 12px' }}>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
          <span style={{ fontSize: 11, color: '#9CA3AF' }}>o</span>
          <div style={{ flex: 1, height: 1, background: '#EEF0F4' }}/>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field-label">Ingresá un domicilio</label>
          <input className="input" placeholder="Calle, número, ciudad" value={d.domicilio} onChange={e => upd('domicilio', e.target.value)}/>
          {d.domicilio && (
            <div style={{ marginTop: 8, padding: 10, background: '#F4F5F8', borderRadius: 8, fontSize: 12, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 8 }}>
              {Ico.pin({ style: { color: '#9CA3AF', width: 14, height: 14 } })}
              {d.domicilio}
            </div>
          )}
        </div>
      </div>
    );
  }
  if (k === 'solicitante') {
    return (
      <div>
        <div className="field"><label className="field-label">Nombre<span className="req">*</span></label><input className="input" value={d.nombre} onChange={e => upd('nombre', e.target.value)}/></div>
        <div className="field"><label className="field-label">Apellido<span className="req">*</span></label><input className="input" value={d.apellido} onChange={e => upd('apellido', e.target.value)}/></div>
        <div className="field">
          <label className="field-label">Número de teléfono<span className="req">*</span></label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="select" style={{ width: 88, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ fontSize: 13 }}>🇦🇷 +54</span>{Ico.chevDown({ style: { color: '#9CA3AF' } })}
            </div>
            <input className="input" style={{ flex: 1 }} placeholder="261 555 0000" value={d.tel} onChange={e => upd('tel', e.target.value)}/>
          </div>
        </div>
        <div className="field" style={{ marginBottom: 6 }}>
          <label className="field-label">Email</label>
          <div className="input-with-icon">
            <input className="input" placeholder="opcional" value={d.email} onChange={e => upd('email', e.target.value)}/>
            <span className="input-icon">{Ico.email()}</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5, marginTop: 8 }}>
          Los datos del solicitante se almacenan únicamente para fines de tasación profesional, en cumplimiento de la Ley 25.326.
        </div>
      </div>
    );
  }
  if (k === 'fotos') {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} className="photo-ph" style={{ aspectRatio: '1', position: 'relative' }}>
              <button style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: 0, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.x({ style: { width: 11, height: 11 } })}</button>
              foto {i}
            </div>
          ))}
          {[6,7,8].map(i => (
            <button key={i} className="photo-ph" style={{ aspectRatio: '1', background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF', cursor: 'pointer', font: 'inherit' }}>+ slot</button>
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
  if (k === 'detalles') {
    const showRooms = !['terreno', 'local', 'oficina'].includes(tipo);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div className="field"><label className="field-label">Sup. total (m²)</label><input className="input" value={d.superficie} onChange={e => upd('superficie', e.target.value)} placeholder="0"/></div>
          <div className="field"><label className="field-label">Sup. cubierta</label><input className="input" value={d.sup_cub} onChange={e => upd('sup_cub', e.target.value)} placeholder="0"/></div>
          {showRooms && <div className="field"><label className="field-label">Dormitorios</label><input className="input" value={d.dorm} onChange={e => upd('dorm', e.target.value)} placeholder="0"/></div>}
          {showRooms && <div className="field"><label className="field-label">Baños</label><input className="input" value={d.banios} onChange={e => upd('banios', e.target.value)} placeholder="0"/></div>}
          <div className="field"><label className="field-label">Antigüedad (años)</label><input className="input" value={d.antig} onChange={e => upd('antig', e.target.value)} placeholder="0"/></div>
          <div className="field"><label className="field-label">Estado</label><select className="select" value={d.estado} onChange={e => upd('estado', e.target.value)}><option>Muy bueno</option><option>Bueno</option><option>Regular</option><option>A reciclar</option></select></div>
        </div>
        <div className="field-label" style={{ marginTop: 6 }}>Amenities</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['Pileta','Parrilla','Cochera','Dependencia','Balcón','Terraza','Jardín','Baulera'].map(a => {
            const on = d.amenities.includes(a);
            return (
              <button key={a} onClick={() => toggleAmenity(a)} className="badge" style={{ background: on ? '#FEE2E2' : '#F1F2F6', color: on ? '#EF4444' : '#6B7280', padding: '6px 10px', fontSize: 12, border: 0, cursor: 'pointer', fontFamily: 'inherit' }}>
                {on && '✓ '}{a}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  if (k === 'descripcion') {
    const len = d.desc.length;
    const ok = len >= 50;
    return (
      <div className="field" style={{ marginBottom: 0 }}>
        <label className="field-label">Describí el inmueble</label>
        <textarea className="textarea" placeholder="Al menos 50 caracteres..." value={d.desc} onChange={e => upd('desc', e.target.value)}/>
        <div className="field-hint" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Mínimo 50 caracteres</span>
          <span style={{ color: ok ? '#10B981' : '#9CA3AF', fontWeight: 600 }}>{len} / mín. 50 {ok ? '✓' : ''}</span>
        </div>
      </div>
    );
  }
  return null;
}

Object.assign(window, { SAMPLE_ROWS, HomeTasador, NuevaTasacion, PropertyChipsI, KpiCardI });
