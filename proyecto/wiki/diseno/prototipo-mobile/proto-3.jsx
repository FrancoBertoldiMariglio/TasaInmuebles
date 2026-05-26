// Tasainmuebles — Prototipo navegable, parte 3: Detalle, Cerrar valor, Compartir, B2C, Modales, App

const { useState: useS3, useEffect: useE3 } = React;

// ─────────────── 13/14 DETALLE (tabs) ───────────────
function Detalle() {
  const nav = useNav();
  const t = nav.route.tasacion || SAMPLE_ROWS[0];
  const [tab, setTab] = useS3(nav.route.tab || 'tasacion');
  const [moreOpen, setMoreOpen] = useS3(null);
  const [comOpen, setComOpen] = useS3(null);
  const [showActions, setShowActions] = useS3(false);

  return (
    <DeviceFrame>
      <AppBarI title={`Tasación ${t.id}`}/>
      <div className="tabs" style={{ display: 'flex', justifyContent: 'space-between', paddingRight: 16 }}>
        <div style={{ display: 'flex', gap: 22 }}>
          <button className={`tab ${tab === 'tasacion' ? 'active' : ''}`} onClick={() => setTab('tasacion')} style={{ background: 'transparent', border: 0, font: 'inherit', cursor: 'pointer' }}>Tasación</button>
          <button className={`tab ${tab === 'comite' ? 'active' : ''}`} onClick={() => setTab('comite')} style={{ background: 'transparent', border: 0, font: 'inherit', cursor: 'pointer' }}>Comité de tasación</button>
        </div>
        <button onClick={() => setShowActions(s => !s)} style={{ background: '#F1F2F6', color: '#6B7280', border: 0, borderRadius: 10, padding: '6px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', alignSelf: 'center', display: 'flex', gap: 4, alignItems: 'center' }}>
          Acciones {Ico.chevDown({ style: { width: 12, height: 12 } })}
        </button>
      </div>

      {showActions && (
        <div style={{ position: 'absolute', right: 16, top: 138, background: '#fff', borderRadius: 12, boxShadow: '0 8px 28px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)', minWidth: 180, zIndex: 90, padding: 6 }}>
          {[
            ['publicar', 'Publicar', '#EF4444'],
            ['archivar', 'Archivar', '#1F2937'],
            ['compartir', 'Compartir', '#1F2937'],
            ['editar', 'Editar', '#1F2937'],
          ].map(([k, label, color]) => (
            <button key={k} onClick={() => { setShowActions(false); if (k === 'publicar') nav.openModal('publicar'); else if (k === 'archivar') nav.openModal('archivar'); else if (k === 'compartir') nav.go('compartir'); else nav.go('nueva'); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', border: 0, background: 'transparent', color, fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', borderRadius: 6 }}>
              {label}
            </button>
          ))}
        </div>
      )}

      <div className="page" style={{ paddingTop: 14 }}>
        {tab === 'tasacion' ? (
          <>
            <div className="card">
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Presentación del inmueble</div>
              <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
                <div className="photo-ph" style={{ height: 150 }}>foto principal · {t.tipo}</div>
                <button style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.chevLeft()}</button>
                <button style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>{Ico.chevRight()}</button>
              </div>
              <span className={`badge badge-${t.status}`} style={{ marginBottom: 12, display: 'inline-block' }}>{t.statusLabel}</span>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <DetailFieldI label={`Tasación ${t.id}`} value={(t.addr || 'Mendoza, AR').split(',')[0]}/>
                <DetailFieldI label="Fecha alta" value={t.date}/>
                <DetailFieldI label="Tipo" value={t.tipo[0].toUpperCase() + t.tipo.slice(1)}/>
                <DetailFieldI label="Referente" value={t.tasador}/>
                <DetailFieldI label="Domicilio" value={(t.addr || 'Mendoza, Argentina').split(',').slice(1).join(',').trim() || 'Mendoza, Argentina'}/>
                <DetailFieldI label="Motivo" value="Venta"/>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, padding: '12px 0', borderTop: '1px solid #EEF0F4', borderBottom: '1px solid #EEF0F4', marginBottom: 14 }}>
                <div><div className="label-uppercase">Valor en AR$</div><div style={{ fontSize: 17, fontWeight: 700 }}>$ 0</div></div>
                <div><div className="label-uppercase">Valor en USD</div><div style={{ fontSize: 17, fontWeight: 700 }}>US$ 0</div></div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Progreso</span>
                <span style={{ color: '#9CA3AF' }}>{Ico.info()}</span>
              </div>
              <div className="progress-track"><div className="progress-fill" style={{ width: '64%' }}/></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                <div className="avatar-row">
                  <div className="avatar" style={{ background: '#FECACA' }}>JV</div>
                  <div className="avatar" style={{ background: '#FCD34D' }}>MB</div>
                  <div className="avatar" style={{ background: '#60A5FA' }}>S</div>
                </div>
                <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>{Ico.calendar()} 3 días</span>
              </div>
            </div>

            <div style={{ marginTop: 14, fontSize: 14, fontWeight: 700, padding: '0 4px 8px' }}>Más información</div>
            <div className="card" style={{ padding: 6 }}>
              {['Ubicación','Solicitante','Fotos','Detalles','Descripción del inmueble'].map((s, i, arr) => (
                <div key={s}>
                  <button onClick={() => setMoreOpen(o => o === s ? null : s)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px', width: '100%', fontSize: 14, fontWeight: 600, background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <span>{s}</span>
                    <span style={{ color: '#9CA3AF', transform: moreOpen === s ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' }}>{Ico.chevDown()}</span>
                  </button>
                  {moreOpen === s && <div style={{ padding: '0 14px 14px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{moreInfo(s, t)}</div>}
                  {i < arr.length - 1 && <div style={{ height: 1, background: '#EEF0F4' }}/>}
                </div>
              ))}
            </div>

            <button className="btn btn-primary btn-full" style={{ marginTop: 18 }} onClick={() => nav.go('nueva')}>{Ico.edit()} Editar</button>
          </>
        ) : (
          // tab COMITÉ
          <>
            <div className="card">
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, marginBottom: 4 }}>Tasación para venta en calle Joaquín V. González 1895.</div>
              <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>Referente: {t.tasador}</div>

              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button className="btn btn-dark" style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10 }}>Fotos</button>
                <button className="btn" style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10, background: '#F1F2F6', color: '#6B7280' }}>Mapa</button>
              </div>

              <div className="photo-ph" style={{ height: 140, marginBottom: 8 }}>foto principal</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>habitación</div>
                <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>baño</div>
                <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>cocina</div>
              </div>
            </div>

            <div className="card mt-3">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Datos de tasación</div>
                <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 12 }} onClick={() => nav.go('nueva')}>{Ico.edit({ style: { width: 13, height: 13 } })} Editar</button>
              </div>
              <div>
                {['Descripción','Características','Superficies','Servicios','Valorar tasación'].map((s, i, arr) => (
                  <div key={s}>
                    <button onClick={() => s === 'Valorar tasación' ? nav.openModal('cerrar') : setComOpen(o => o === s ? null : s)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 4px', width: '100%', fontSize: 14, fontWeight: 600, background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', color: s === 'Valorar tasación' ? '#EF4444' : '#1F2937' }}>
                      <span>{s}</span>
                      <span style={{ color: '#9CA3AF' }}>{Ico.chevDown({ style: { transform: comOpen === s ? 'rotate(180deg)' : 'none', transition: 'transform 200ms' } })}</span>
                    </button>
                    {comOpen === s && <div style={{ padding: '0 4px 14px', fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{moreInfo(s, t)}</div>}
                    {i < arr.length - 1 && <div style={{ height: 1, background: '#EEF0F4' }}/>}
                  </div>
                ))}
              </div>
            </div>

            <div className="card mt-3" style={{ background: '#F0FDF4', border: '1px solid #D1FAE5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                {Ico.robotomus()}
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>Robotomus</div>
                  <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>en desarrollo</div>
                </div>
              </div>
              <div style={{ border: '1.5px dashed #6EE7B7', borderRadius: 12, padding: '14px 12px', textAlign: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Valor en AR$</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>$0.000,00</div>
              </div>
              <div style={{ border: '1.5px dashed #6EE7B7', borderRadius: 12, padding: '14px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#10B981', fontWeight: 600 }}>Valor en USD</div>
                <div style={{ fontSize: 22, fontWeight: 800 }}>$0.000,00</div>
              </div>
            </div>

            <div style={{ marginTop: 18, padding: '0 4px' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Inmuebles similares</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>0 inmuebles · pendiente análisis Robotomus</div>
            </div>

            <button className="btn btn-primary btn-full" style={{ marginTop: 18 }} onClick={() => nav.openModal('cerrar')}>Cerrar valor de tasación</button>
          </>
        )}
      </div>
    </DeviceFrame>
  );
}

function DetailFieldI({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

function moreInfo(section, t) {
  const m = {
    'Ubicación': t.addr || 'Joaquín V. González 1895, Mendoza',
    'Solicitante': `${t.user} · +54 261 555 0123`,
    'Fotos': '5 fotos cargadas · última 13/07/2026',
    'Detalles': 'Sup. total 480 m² · sup. cubierta 220 m² · 3 dorm. · 2 baños · antigüedad 12 años · estado Bueno',
    'Descripción del inmueble': 'Casa estilo californiano sobre lote propio con jardín delantero y galería techada. Excelente luminosidad.',
    'Descripción': 'Casa estilo californiano con jardín y galería techada.',
    'Características': '3 dormitorios · 2 baños · cochera doble · pileta · parrilla.',
    'Superficies': 'Total 480 m² · cubierta 220 m² · semi-cubierta 30 m².',
    'Servicios': 'Agua corriente · gas natural · cloacas · luz monofásica.',
  };
  return m[section] || '—';
}

// ─────────────── 16 COMPARTIR ───────────────
function Compartir() {
  const nav = useNav();
  return (
    <DeviceFrame>
      <AppBarI title="Compartir tasación"/>
      <div className="page" style={{ paddingTop: 14 }}>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Tasación #1578</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Joaquín V. González 1895 · Casa · Venta</div>

          <div style={{ background: '#F4F5F8', borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <div style={{ background: '#fff', padding: 14, borderRadius: 8, fontFamily: 'serif', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><Isotipo size={20}/><span style={{ fontWeight: 800, fontSize: 12 }}><span style={{ color: '#F87171' }}>Tasa</span>inmuebles</span></div>
              <div style={{ height: 1, background: '#E5E7EB', marginBottom: 8 }}/>
              <div style={{ fontSize: 9, color: '#6B7280', marginBottom: 4 }}>INFORME DE TASACIÓN — N° 1578</div>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Joaquín V. González 1895, Mendoza</div>
              <div style={{ height: 40, background: '#EEF0F4', borderRadius: 4, marginBottom: 6 }}/>
              <div style={{ fontSize: 9, lineHeight: 1.4, color: '#6B7280' }}>Casa estilo californiano sobre lote propio de 480 m². Excelente luminosidad...</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}><div style={{ flex: 1, height: 6, background: '#EEF0F4', borderRadius: 2 }}/><div style={{ flex: 1, height: 6, background: '#EEF0F4', borderRadius: 2 }}/></div>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #E5E7EB', fontSize: 9, color: '#9CA3AF' }}>Firmado digitalmente · 14/05/2026</div>
            </div>
          </div>

          <button className="btn btn-primary btn-full mb-2">{Ico.download()} Descargar PDF</button>
          <button className="btn btn-outline btn-full">{Ico.email()} Enviar por email</button>
        </div>

        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Compartir por WhatsApp</div>
          <div style={{ border: '1.5px dashed #E5E7EB', borderRadius: 10, padding: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            {Ico.pdf()}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Tasación 1578 · Venta casa.pdf</div>
              <div style={{ fontSize: 11, color: '#9CA3AF' }}>2.8 MB</div>
            </div>
          </div>
          <button className="btn btn-primary btn-full">{Ico.share()} Compartir</button>
        </div>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── 20 B2C HOME (empty) ───────────────
function B2CHome() {
  const nav = useNav();
  return (
    <DeviceFrame>
      <BrandBarI/>
      <div style={{ padding: '18px 16px 110px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="section-title">Mis tasaciones</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 14, padding: 16 }}>
          <ModalIllo kind="paper-up"/>
          <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginTop: -10 }}>Todavía no tasaste<br/>ninguna propiedad</div>
          <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>
            Tocá el + para tasar tu primera propiedad y obtené un PDF referencial gratuito.
          </div>
          <button className="btn btn-primary" style={{ marginTop: 8, padding: '14px 28px' }} onClick={() => nav.go('b2c-nueva')}>
            {Ico.plus({ style: { width: 18, height: 18 } })} Nueva tasación
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: '#FEF3C7', borderRadius: 10, fontSize: 11, color: '#92400E', lineHeight: 1.5, marginTop: 12 }}>
            {Ico.info({ style: { color: '#92400E', flexShrink: 0, marginTop: 2 } })}
            <span>Las tasaciones referenciales no están certificadas profesionalmente. Para certificación, consultá con un tasador colegiado.</span>
          </div>
        </div>
      </div>
      <BottomNavI active="home"/>
    </DeviceFrame>
  );
}

// ─────────────── 21 B2C NUEVA ───────────────
function B2CNueva() {
  const nav = useNav();
  const [tipo, setTipo] = useS3('depto');
  return (
    <DeviceFrame>
      <AppBarI title="Nueva tasación"/>
      <div className="page">
        <div style={{ padding: '10px 14px', background: '#FEF3C7', borderRadius: 10, fontSize: 12, color: '#92400E', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          {Ico.info({ style: { color: '#92400E', flexShrink: 0 } })}
          Tasación referencial, no certificada profesionalmente.
        </div>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Tipo de inmueble</div>
          <PropertyChipsI selected={tipo} onSelect={setTipo}/>
        </div>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Domicilio</div>
          <input className="input" placeholder="Calle, número, ciudad" defaultValue="Av. San Martín 2100, Mendoza"/>
        </div>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Detalles del inmueble</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div className="field"><label className="field-label">Sup. total (m²)</label><input className="input" defaultValue="80"/></div>
            <div className="field"><label className="field-label">Sup. cubierta</label><input className="input" defaultValue="72"/></div>
            <div className="field"><label className="field-label">Dormitorios</label><input className="input" defaultValue="2"/></div>
            <div className="field"><label className="field-label">Baños</label><input className="input" defaultValue="1"/></div>
            <div className="field"><label className="field-label">Antigüedad</label><input className="input" defaultValue="15"/></div>
            <div className="field"><label className="field-label">Estado</label><select className="select"><option>Bueno</option></select></div>
          </div>
        </div>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Fotos (opcional)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[0,1,2].map(i => <button key={i} className="photo-ph" style={{ aspectRatio: 1, background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF', cursor: 'pointer', font: 'inherit' }}>+ foto</button>)}
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={() => nav.go('b2c-resultado')}>Calcular valor referencial</button>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── 22 B2C RESULTADO ───────────────
function B2CResultado() {
  const nav = useNav();
  return (
    <DeviceFrame>
      <AppBarI title="Tasación referencial"/>
      <div className="page">
        <div className="card-dark mb-3" style={{ padding: 22, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginBottom: 4, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Valor referencial</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>Av. San Martín 2100, Mendoza</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 18 }}>
            <div style={{ padding: 14, background: 'rgba(255,255,255,0.08)', borderRadius: 12, textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>AR$</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>$ 87.2M</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>± 12%</div>
            </div>
            <div style={{ padding: 14, background: 'rgba(255,255,255,0.08)', borderRadius: 12, textAlign: 'left' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>USD</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>US$ 105.8K</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>± 12%</div>
            </div>
          </div>
        </div>
        <div className="card mb-3" style={{ background: '#F0FDF4', border: '1px solid #D1FAE5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            {Ico.robotomus()}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Análisis Robotomus</div>
              <div style={{ fontSize: 11, color: '#10B981', fontWeight: 600 }}>en desarrollo · resultado de muestra</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.5 }}>
            En la zona se relevaron <b>14 inmuebles comparables</b> (2 dorm., 70–90 m²). El valor promedio observado es <b>US$ 1.450 / m²</b>.
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: '#FEF3C7', borderRadius: 12, fontSize: 12, color: '#92400E', lineHeight: 1.5, marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          {Ico.info({ style: { color: '#92400E', flexShrink: 0, marginTop: 1 } })}
          <span><b>No certificada profesionalmente.</b> Para una tasación oficial firmada, contactá con un tasador colegiado.</span>
        </div>
        <button className="btn btn-primary btn-full mb-2">{Ico.download()} Descargar PDF</button>
        <button className="btn btn-outline btn-full">{Ico.email()} Enviar a mi email</button>
      </div>
    </DeviceFrame>
  );
}

// ─────────────── COMING SOON ───────────────
function ComingSoon() {
  const nav = useNav();
  const name = { stats: 'Estadísticas', comms: 'Comunicaciones' }[nav.route.feature] || 'Próximamente';
  return (
    <DeviceFrame>
      <AppBarI title={name}/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100% - 80px)', gap: 16, padding: 32, textAlign: 'center' }}>
        <ModalIllo kind="paperplane"/>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: -10 }}>Próximamente</div>
        <div style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5 }}>{name} no forma parte del MVP del Hito 1. Disponible en Fase 2.</div>
        <button className="btn btn-outline" onClick={() => nav.back()}>Volver</button>
      </div>
      <BottomNavI active={nav.route.feature || ''}/>
    </DeviceFrame>
  );
}

Object.assign(window, { Detalle, DetailFieldI, moreInfo, Compartir, B2CHome, B2CNueva, B2CResultado, ComingSoon });
