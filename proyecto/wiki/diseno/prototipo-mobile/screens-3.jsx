// Tasainmuebles — Screens part 3: Modales + B2C

// ─────────────── MODAL WRAPPER ───────────────
function ModalFrame({ title, subtitle, illoKind, primary = 'Ver tasación', secondary = 'Cancelar', label, behind = 'detalle' }) {
  return (
    <Frame label={label}>
      {behind === 'detalle' ? <DetalleBehind/> : <ListadoBehind/>}
      <div className="modal-scrim" style={{ background: 'rgba(42,49,64,0.85)' }}>
        <div className="modal">
          <button className="modal-close">{Ico.x()}</button>
          <div className="modal-title">{title}</div>
          <div className="modal-subtitle">{subtitle}</div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
            <ModalIllo kind={illoKind}/>
          </div>
          <div className="modal-actions">
            <button className="btn btn-outline">{secondary}</button>
            <button className="btn btn-primary">{primary}</button>
          </div>
        </div>
      </div>
    </Frame>
  );
}

function DetalleBehind() {
  return (
    <>
      <AppBar title="Tasación 1578"/>
      <div className="tabs">
        <div className="tab active">Tasación</div>
        <div className="tab">Comité de tasación</div>
      </div>
      <div className="page" style={{ paddingTop: 14 }}>
        <div className="card">
          <div className="photo-ph" style={{ height: 120, marginBottom: 10 }}>foto</div>
          <span className="badge badge-mustard">A tasar</span>
        </div>
      </div>
    </>
  );
}
function ListadoBehind() {
  return (
    <>
      <BrandBar/>
      <div style={{ padding: '14px 16px' }}>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Tasaciones</div>
        <div className="card-dark" style={{ height: 100, marginBottom: 14 }}/>
      </div>
    </>
  );
}

// ─────────────── 17 MODAL ÉXITO EDICIÓN ───────────────
function ScreenModalEdicion() {
  return <ModalFrame
    label="17 Modal · Edición exitosa"
    title="Tasación editada exitosamente"
    subtitle="La tasación # 1578 ha sido modificada."
    illoKind="check"
  />;
}

// ─────────────── 18 MODAL ARCHIVAR ───────────────
function ScreenModalArchivar() {
  return <ModalFrame
    label="18 Modal · Archivar"
    title="¿Desea archivar su tasación?"
    subtitle="La tasación 1578 está a punto de ser archivada."
    illoKind="archive"
    primary="Archivar"
    secondary="Cancelar"
  />;
}

// ─────────────── 19 MODAL VALORACIÓN EXITOSA ───────────────
function ScreenModalValoracion() {
  return <ModalFrame
    label="19 Modal · Valoración exitosa"
    title="Valoración de tasación exitosa"
    subtitle="La tasación 1578 ha sido valorada. Ya está lista para ser compartida."
    illoKind="claps"
    primary="Ver tasación"
  />;
}

// ─────────────── 19b MODAL ALTA EXITOSA ───────────────
function ScreenModalAlta() {
  return <ModalFrame
    label="19b Modal · Alta exitosa"
    title="Alta de tasación exitosa"
    subtitle="La tasación #1578 ha sido dada de alta. Su tasación queda lista para ser editada."
    illoKind="paper-up"
    primary="Ver tasación"
    behind="listado"
  />;
}

// ─────────────── 19c MODAL LISTA PARA TASAR ───────────────
function ScreenModalLista() {
  return <ModalFrame
    label="19c Modal · Lista para tasar"
    title="Lista para tasar"
    subtitle="La tasación #1578 ha sido modificada de estado. Ya se encuentra lista para tasar en comité de tasación."
    illoKind="pass"
    primary="Ver tasación"
  />;
}

// ─────────────── 19d MODAL PUBLICAR ───────────────
function ScreenModalPublicar() {
  return <ModalFrame
    label="19d Modal · Publicar"
    title="¿Desea publicar su tasación?"
    subtitle="La tasación 1578 está a punto de ser publicada."
    illoKind="paperplane"
    primary="Publicar"
    secondary="Cancelar"
  />;
}

// ─────────────── 20 MIS TASACIONES B2C (EMPTY) ───────────────
function ScreenB2CHome() {
  return (
    <Frame label="20 B2C · Mis Tasaciones (empty)">
      <BrandBar/>
      <div style={{ padding: '18px 16px 100px', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="section-title">Mis tasaciones</div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 14, padding: 24 }}>
          <ModalIllo kind="paper-up"/>
          <div style={{ fontSize: 18, fontWeight: 700, textAlign: 'center', marginTop: -10 }}>
            Todavía no tasaste<br/>ninguna propiedad
          </div>
          <div style={{ fontSize: 14, color: '#6B7280', textAlign: 'center', lineHeight: 1.5 }}>
            Tocá el + para tasar tu primera propiedad y obtené un PDF referencial gratuito.
          </div>

          <button className="btn btn-primary" style={{ marginTop: 8, padding: '14px 28px' }}>
            {Ico.plus({ style: { width: 18, height: 18 } })} Nueva tasación
          </button>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: '#FEF3C7', borderRadius: 10, fontSize: 11, color: '#92400E', lineHeight: 1.5, marginTop: 12 }}>
            {Ico.info({ style: { color: '#92400E', flexShrink: 0, marginTop: 2 } })}
            <span>Las tasaciones referenciales no están certificadas profesionalmente. Para certificación, consultá con un tasador colegiado.</span>
          </div>
        </div>
      </div>
      <BottomNav active="home"/>
    </Frame>
  );
}

// ─────────────── 21 NUEVA TASACIÓN B2C ───────────────
function ScreenB2CNueva() {
  return (
    <Frame label="21 B2C · Nueva Tasación">
      <AppBar title="Nueva tasación"/>
      <div className="page">
        <div style={{ padding: '10px 14px', background: '#FEF3C7', borderRadius: 10, fontSize: 12, color: '#92400E', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          {Ico.info({ style: { color: '#92400E', flexShrink: 0 } })}
          Tasación referencial, no certificada profesionalmente.
        </div>

        <div className="card mb-3">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Tipo de inmueble</div>
          <PropertyChips selected="depto"/>
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
            <div className="photo-ph" style={{ aspectRatio: 1, background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF' }}>+ foto</div>
            <div className="photo-ph" style={{ aspectRatio: 1, background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF' }}>+ foto</div>
            <div className="photo-ph" style={{ aspectRatio: 1, background: '#F4F5F8', border: '1.5px dashed #D1D5DB', color: '#9CA3AF' }}>+ foto</div>
          </div>
        </div>

        <button className="btn btn-primary btn-full">Calcular valor referencial</button>
      </div>
    </Frame>
  );
}

// ─────────────── 22 RESULTADO B2C ───────────────
function ScreenB2CResultado() {
  return (
    <Frame label="22 B2C · Resultado">
      <AppBar title="Tasación referencial"/>
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
            En la zona se relevaron <b>14 inmuebles comparables</b> (2 dorm., 70–90 m²). El valor promedio observado es <b>US$ 1.450 / m²</b>. Tu propiedad cae dentro del rango P40–P60 de la muestra.
          </div>
        </div>

        <div style={{ padding: '12px 14px', background: '#FEF3C7', borderRadius: 12, fontSize: 12, color: '#92400E', lineHeight: 1.5, marginBottom: 16, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          {Ico.info({ style: { color: '#92400E', flexShrink: 0, marginTop: 1 } })}
          <span><b>No certificada profesionalmente.</b> Para una tasación oficial firmada, contactá con un tasador colegiado.</span>
        </div>

        <button className="btn btn-primary btn-full mb-2">{Ico.download()} Descargar PDF</button>
        <button className="btn btn-outline btn-full">{Ico.email()} Enviar a mi email</button>
      </div>
    </Frame>
  );
}

Object.assign(window, {
  ModalFrame, ScreenModalEdicion, ScreenModalArchivar, ScreenModalValoracion,
  ScreenModalAlta, ScreenModalLista, ScreenModalPublicar,
  ScreenB2CHome, ScreenB2CNueva, ScreenB2CResultado,
});
