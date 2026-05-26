// Tasainmuebles — Prototipo navegable, parte 4: Modales overlay + main App

const { useState: useS4, useEffect: useE4 } = React;

// ─────────────── MODAL OVERLAY ───────────────
function ModalOverlay({ modal, close }) {
  const nav = useNav();
  if (!modal) return null;

  // Cerrar valor (bottom sheet, not centered modal)
  if (modal.kind === 'cerrar') {
    return <CerrarValorSheet close={close}/>;
  }

  const M = {
    alta: {
      title: 'Alta de tasación exitosa',
      sub: 'La tasación #1578 ha sido dada de alta. Tu tasación queda lista para ser editada.',
      illo: 'paper-up',
      primary: 'Ver tasación',
      secondary: 'Cancelar',
      onPrimary: () => { close(); nav.go('detalle', { tasacion: SAMPLE_ROWS[0], tab: 'tasacion' }); },
    },
    edicion: {
      title: 'Tasación editada exitosamente',
      sub: 'La tasación # 1578 ha sido modificada.',
      illo: 'check',
      primary: 'Ver tasación',
      onPrimary: () => { close(); nav.go('detalle', { tasacion: SAMPLE_ROWS[0], tab: 'tasacion' }); },
    },
    archivar: {
      title: '¿Desea archivar su tasación?',
      sub: 'La tasación 1578 está a punto de ser archivada.',
      illo: 'archive',
      primary: 'Archivar',
      onPrimary: () => { close(); nav.go('home'); },
    },
    valoracion: {
      title: 'Valoración de tasación exitosa',
      sub: 'La tasación 1578 ha sido valorada. Ya está lista para ser compartida.',
      illo: 'claps',
      primary: 'Compartir',
      secondary: 'Ver tasación',
      onPrimary: () => { close(); nav.go('compartir'); },
      onSecondary: () => { close(); nav.go('detalle', { tab: 'tasacion' }); },
    },
    lista: {
      title: 'Lista para tasar',
      sub: 'La tasación #1578 ha sido modificada de estado. Ya se encuentra lista para tasar en comité de tasación.',
      illo: 'pass',
      primary: 'Ver tasación',
      onPrimary: () => { close(); nav.go('detalle', { tab: 'comite' }); },
    },
    publicar: {
      title: '¿Desea publicar su tasación?',
      sub: 'La tasación 1578 está a punto de ser publicada.',
      illo: 'paperplane',
      primary: 'Publicar',
      onPrimary: () => { close(); nav.openModal('lista'); },
    },
  };

  const m = M[modal.kind];
  if (!m) return null;

  return (
    <div className="modal-scrim" style={{ background: 'rgba(42,49,64,0.85)', animation: 'fadeIn 200ms ease both' }} onClick={close}>
      <div className="modal" style={{ animation: 'slideUp 220ms cubic-bezier(.2,.7,.3,1) both' }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close}>{Ico.x()}</button>
        <div className="modal-title">{m.title}</div>
        <div className="modal-subtitle">{m.sub}</div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}>
          <ModalIllo kind={m.illo}/>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={m.onSecondary || close}>{m.secondary || 'Cancelar'}</button>
          <button className="btn btn-primary" onClick={m.onPrimary}>{m.primary}</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────── CERRAR VALOR · BOTTOM SHEET ───────────────
function CerrarValorSheet({ close }) {
  const nav = useNav();
  const [choice, setChoice] = useS4('fitt');
  const [ars, setArs] = useS4('');
  const [usd, setUsd] = useS4('');

  const confirm = () => {
    close();
    nav.openModal('valoracion');
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 100 }} onClick={close}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(42,49,64,0.6)', animation: 'fadeIn 200ms ease both' }}/>
      <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: '20px 20px 26px', animation: 'slideUpSheet 280ms cubic-bezier(.2,.7,.3,1) both', maxHeight: '85%', overflow: 'auto' }}>
        <div style={{ width: 40, height: 4, background: '#E5E7EB', borderRadius: 4, margin: '0 auto 18px' }}/>
        <div style={{ fontSize: 19, fontWeight: 700, textAlign: 'center' }}>Cerrar valor del comité</div>
        <div style={{ fontSize: 13, color: '#6B7280', textAlign: 'center', marginBottom: 18 }}>Elegí cómo cerrar la tasación #1578.</div>

        <button onClick={() => setChoice('fitt')} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: choice === 'fitt' ? '1.5px solid #F87171' : '1.5px solid #E5E7EB', background: choice === 'fitt' ? '#FFF7F5' : '#fff', marginBottom: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: 'inherit' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: choice === 'fitt' ? '#EF4444' : '#1F2937' }}>Aceptar valor Fitt-Servini</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>AR$ 142.500.000 · US$ 175.000</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: choice === 'fitt' ? '#F87171' : 'transparent', border: choice === 'fitt' ? 0 : '1.5px solid #D1D5DB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {choice === 'fitt' && Ico.check({ style: { width: 13, height: 13 } })}
          </div>
        </button>

        <button onClick={() => setChoice('override')} style={{ width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, border: choice === 'override' ? '1.5px solid #F87171' : '1.5px solid #E5E7EB', background: choice === 'override' ? '#FFF7F5' : '#fff', marginBottom: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', font: 'inherit' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: choice === 'override' ? '#EF4444' : '#1F2937' }}>Override manual</div>
            <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Ingresar valores propios + motivo</div>
          </div>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: choice === 'override' ? '#F87171' : 'transparent', border: choice === 'override' ? 0 : '1.5px solid #D1D5DB', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {choice === 'override' && Ico.check({ style: { width: 13, height: 13 } })}
          </div>
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
          <div className="field" style={{ margin: 0 }}>
            <label className="field-label">Valor ARS</label>
            <input className="input" placeholder="0" value={ars} onChange={e => setArs(e.target.value)} disabled={choice === 'fitt'} style={{ background: choice === 'fitt' ? '#F9FAFB' : '#fff' }}/>
          </div>
          <div className="field" style={{ margin: 0 }}>
            <label className="field-label">Valor USD</label>
            <input className="input" placeholder="0" value={usd} onChange={e => setUsd(e.target.value)} disabled={choice === 'fitt'} style={{ background: choice === 'fitt' ? '#F9FAFB' : '#fff' }}/>
          </div>
        </div>

        {choice === 'override' && (
          <div className="field" style={{ marginBottom: 12 }}>
            <label className="field-label">Motivo del override</label>
            <textarea className="textarea" placeholder="Explicá por qué te apartás del valor sugerido..."/>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={confirm}>Confirmar cierre</button>
      </div>
    </div>
  );
}

// ─────────────── ROUTER + MAIN APP ───────────────
function App() {
  const [route, setRoute] = useRoute();
  const [modal, setModal] = useS4(null);
  const [history, setHistory] = useS4([]);

  const nav = {
    route,
    go: (screen, params = {}) => {
      setHistory(h => [...h, route]);
      setRoute({ ...params, screen });
    },
    back: () => {
      setHistory(h => {
        const prev = h[h.length - 1];
        if (prev) setRoute(prev);
        else setRoute({ screen: 'bienvenida' });
        return h.slice(0, -1);
      });
    },
    reset: (screen = 'splash') => {
      setHistory([]);
      setRoute({ screen, mode: route.mode });
    },
    openModal: (kind, opts) => setModal({ kind, ...opts }),
    closeModal: () => setModal(null),
  };

  const screens = {
    splash: <Splash/>,
    bienvenida: <Bienvenida/>,
    login: <Login/>,
    registro: <Registro/>,
    home: <HomeTasador/>,
    nueva: <NuevaTasacion/>,
    detalle: <Detalle/>,
    compartir: <Compartir/>,
    'b2c-home': <B2CHome/>,
    'b2c-nueva': <B2CNueva/>,
    'b2c-resultado': <B2CResultado/>,
    comingsoon: <ComingSoon/>,
  };

  return (
    <Ctx.Provider value={nav}>
      <div style={{ position: 'relative' }}>
        {screens[route.screen] || <Bienvenida/>}
        <ModalOverlay modal={modal} close={() => setModal(null)}/>
      </div>
    </Ctx.Provider>
  );
}

Object.assign(window, { App, ModalOverlay, CerrarValorSheet });
