// Tasainmuebles — Screens part 2: Detalle, Modales, B2C

// ─────────────── 13 DETALLE TASACIÓN · TAB TASACIÓN ───────────────
function ScreenDetalleTasacion() {
  return (
    <Frame label="13 Detalle · Tasación">
      <AppBar title="Tasación 1578"/>
      <div className="tabs">
        <div className="tab active">Tasación</div>
        <div className="tab">Comité de tasación</div>
      </div>
      <div className="page" style={{ paddingTop: 14 }}>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Presentación del inmueble</div>
          <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div className="photo-ph" style={{ height: 150 }}>foto principal · casa</div>
            <button style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.chevLeft()}</button>
            <button style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.chevRight()}</button>
          </div>

          <span className="badge badge-mustard" style={{ marginBottom: 12, display: 'inline-block' }}>A tasar</span>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <DetailField label="Tasación 1578" value="Joaquín V. Gonzáles 1895"/>
            <DetailField label="Fecha alta" value="13/07/26"/>
            <DetailField label="Tipo de inmueble" value="Casa"/>
            <DetailField label="Referente" value="Mario Perez"/>
            <DetailField label="Domicilio" value="Mendoza, Argentina"/>
            <DetailField label="Motivo" value="Venta"/>
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
          {['Ubicación','Solicitante','Fotos','Detalles','Descripción del inmueble'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 14px', borderBottom: s !== 'Descripción del inmueble' ? '1px solid #EEF0F4' : 'none', fontSize: 14, fontWeight: 600 }}>
              <span>{s}</span>
              <span style={{ color: '#9CA3AF', transform: 'rotate(-90deg)' }}>{Ico.chevDown()}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-primary btn-full" style={{ marginTop: 18 }}>{Ico.edit()} Editar</button>
      </div>
    </Frame>
  );
}

function DetailField({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#1F2937', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 13, color: '#9CA3AF', lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

// ─────────────── 14 DETALLE · TAB COMITÉ ───────────────
function ScreenDetalleComite() {
  return (
    <Frame label="14 Detalle · Comité">
      <AppBar title="Tasación 1578"/>
      <div className="tabs">
        <div className="tab">Tasación</div>
        <div className="tab active">Comité de tasación</div>
      </div>
      <div className="page" style={{ paddingTop: 14 }}>
        <div className="card">
          <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.35, marginBottom: 4 }}>Tasación para venta en calle Joaquín V. González 1895.</div>
          <div style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>Referente: Test Tasainmuebles</div>

          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button className="btn btn-dark" style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10 }}>Fotos</button>
            <button className="btn" style={{ padding: '8px 18px', fontSize: 13, borderRadius: 10, background: '#F1F2F6', color: '#6B7280' }}>Mapa</button>
          </div>

          <div className="photo-ph" style={{ height: 140, marginBottom: 8, position: 'relative' }}>foto principal</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>habitación</div>
            <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>baño</div>
            <div className="photo-ph" style={{ height: 64, fontSize: 9 }}>cocina</div>
          </div>
        </div>

        <div className="card mt-3">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Datos de tasación</div>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 12 }}>{Ico.edit({ style: { width: 13, height: 13 } })} Editar</button>
          </div>
          <div>
            {['Descripción','Características','Superficies','Servicios','Valorar tasación'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 4px', borderBottom: i < 4 ? '1px solid #EEF0F4' : 'none', fontSize: 14, fontWeight: 600 }}>
                <span>{s}</span>
                <span style={{ color: '#9CA3AF', transform: 'rotate(-90deg)' }}>{Ico.chevDown()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Robotomus */}
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

        <button className="btn btn-primary btn-full" style={{ marginTop: 18 }}>Cerrar valor de tasación</button>
      </div>
    </Frame>
  );
}

// ─────────────── 15 MODAL CERRAR VALOR ───────────────
function ScreenCerrarValor() {
  return (
    <Frame label="15 Cerrar Valor (sheet)">
      <AppBar title="Tasación 1578"/>
      <div className="tabs">
        <div className="tab">Tasación</div>
        <div className="tab active">Comité de tasación</div>
      </div>
      <div style={{ height: '100%', position: 'relative' }}>
        {/* dim background */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(31,41,55,0.5)' }}/>
        {/* bottom sheet */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '20px 20px 26px' }}>
          <div style={{ width: 40, height: 4, background: '#E5E7EB', borderRadius: 4, margin: '0 auto 18px' }}/>
          <div style={{ fontSize: 19, fontWeight: 700, textAlign: 'center' }}>Cerrar valor del comité</div>
          <div style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 18 }}>
            Elegí cómo cerrar la tasación #1578.
          </div>

          <button style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: '1.5px solid #F87171', background: '#FFF7F5', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: 'inherit' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#EF4444' }}>Aceptar valor Fitt-Servini</div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>AR$ 142.500.000 · US$ 175.000</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#F87171', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{Ico.check({ style: { width: 13, height: 13 } })}</div>
          </button>

          <button style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: '1.5px solid #E5E7EB', background: '#fff', marginBottom: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: 'inherit' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#1F2937' }}>Override manual</div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Ingresar valores propios + motivo</div>
            </div>
            <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #E5E7EB' }}/>
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div className="field" style={{ margin: 0 }}>
              <label className="field-label">Valor ARS</label>
              <input className="input" placeholder="0" disabled style={{ background: '#F9FAFB' }}/>
            </div>
            <div className="field" style={{ margin: 0 }}>
              <label className="field-label">Valor USD</label>
              <input className="input" placeholder="0" disabled style={{ background: '#F9FAFB' }}/>
            </div>
          </div>

          <button className="btn btn-primary btn-full">Confirmar cierre</button>
        </div>
      </div>
    </Frame>
  );
}

// ─────────────── 16 GENERAR PDF / COMPARTIR ───────────────
function ScreenCompartir() {
  return (
    <Frame label="16 Compartir PDF">
      <AppBar title="Compartir tasación"/>
      <div className="page" style={{ paddingTop: 14 }}>
        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>Tasación #1578</div>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 14 }}>Joaquín V. González 1895 · Casa · Venta</div>

          {/* PDF preview */}
          <div style={{ background: '#F4F5F8', borderRadius: 12, padding: 14, marginBottom: 14 }}>
            <div style={{ background: '#fff', padding: 14, borderRadius: 8, fontFamily: 'serif', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}><Isotipo size={20}/><span style={{ fontWeight: 800, fontSize: 12 }}><span style={{ color: '#F87171' }}>Tasa</span>inmuebles</span></div>
              <div style={{ height: 1, background: '#E5E7EB', marginBottom: 8 }}/>
              <div style={{ fontSize: 9, color: '#6B7280', marginBottom: 4 }}>INFORME DE TASACIÓN — N° 1578</div>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6 }}>Joaquín V. González 1895, Mendoza</div>
              <div style={{ height: 40, background: '#EEF0F4', borderRadius: 4, marginBottom: 6 }}/>
              <div style={{ fontSize: 9, lineHeight: 1.4, color: '#6B7280' }}>
                Casa estilo californiano sobre lote propio de 480 m². Excelente luminosidad...
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <div style={{ flex: 1, height: 6, background: '#EEF0F4', borderRadius: 2 }}/>
                <div style={{ flex: 1, height: 6, background: '#EEF0F4', borderRadius: 2 }}/>
              </div>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: '1px solid #E5E7EB', fontSize: 9, color: '#9CA3AF' }}>Firmado digitalmente · 14/05/2026</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px', background: '#FEF3C7', borderRadius: 10, fontSize: 12, color: '#92400E', marginBottom: 14 }}>
            {Ico.info({ style: { color: '#92400E', flexShrink: 0 } })}
            El solicitante no tiene email cargado. Tocá el botón para enviar por WhatsApp.
          </div>

          <button className="btn btn-primary btn-full mb-2">{Ico.download()} Descargar PDF</button>
          <button className="btn btn-disabled btn-full">{Ico.email()} Enviar por email</button>
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
    </Frame>
  );
}

Object.assign(window, {
  ScreenDetalleTasacion, ScreenDetalleComite, ScreenCerrarValor, ScreenCompartir,
  DetailField,
});
