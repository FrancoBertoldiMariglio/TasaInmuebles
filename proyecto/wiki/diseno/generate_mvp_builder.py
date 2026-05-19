#!/usr/bin/env python3
"""Genera mvp-builder.html desde wiki/requisitos/ para la reunion con sponsor.

Re-ejecutable: cada vez que el wiki cambie, correr este script para refrescar la HTML.

JS usa DOM API pura (createElement / textContent / appendChild) en lugar de innerHTML,
para evitar superficie XSS. Mermaid se renderiza via mermaid.run() sobre nodos con textContent.
"""
import os, re, json, yaml, datetime
from pathlib import Path

ROOT = Path("/Users/francobertoldi/Documents/Cocucci")
WIKI = ROOT / "proyecto" / "wiki"
REQ = WIKI / "requisitos"
OUTPUT = ROOT / "mvp-builder.html"

FOLDERS = ["05_negocio", "06_usuario", "07_software/BR", "07_software/NF", "07_software/RF"]


def parse_md(filepath: Path):
    name = filepath.name
    if name.startswith("_"):
        return None
    with open(filepath) as f:
        content = f.read()
    frontmatter = {}
    body = content
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", content, re.DOTALL)
    if m:
        try:
            frontmatter = yaml.safe_load(m.group(1)) or {}
        except Exception:
            frontmatter = {}
        body = m.group(2)

    title = ""
    title_m = re.search(r"^# (.+)$", body, re.MULTILINE)
    if title_m:
        title = title_m.group(1).strip()

    resumen = ""
    res_m = re.search(r"##\s*Resumen\s*\n+(.+?)(?=\n##|\n---|\Z)", body, re.DOTALL)
    if res_m:
        resumen = res_m.group(1).strip()
    else:
        first_para = re.search(r"^# .+?\n+(.+?)(?=\n\n|\n##|\Z)", body, re.DOTALL)
        if first_para:
            resumen = first_para.group(1).strip()[:400]

    return {
        "id": frontmatter.get("id", name.replace(".md", "")),
        "title": title,
        "filepath": str(filepath.relative_to(WIKI.parent)),
        "tipo": str(frontmatter.get("tipo", "")),
        "nivel": str(frontmatter.get("nivel", "")),
        "fase": str(frontmatter.get("fase", "")),
        "estado": str(frontmatter.get("estado", "")),
        "moscow": str(frontmatter.get("moscow", "")),
        "estilo": str(frontmatter.get("estilo", "")),
        "clasificacion": str(frontmatter.get("clasificacion", "")),
        "categoria": str(frontmatter.get("categoria", "")),
        "stakeholders": frontmatter.get("stakeholders", []) or [],
        "trazabilidad": frontmatter.get("trazabilidad", {}) or {},
        "cu_origen_top": frontmatter.get("cu_origen", ""),  # algunos RF lo tienen al nivel raiz
        "resumen": resumen,
        "body": body,
    }


artifacts = {}
for folder in FOLDERS:
    for f in sorted((REQ / folder).glob("*.md")):
        art = parse_md(f)
        if art:
            artifacts[art["id"]] = art


def kind_of(aid: str) -> str:
    if aid.startswith("CU-UI"): return "CU"
    if aid.startswith("RF-"): return "RF"
    if aid.startswith("AC-"): return "AC"
    if aid.startswith("BR-NEG"): return "BR-NEG"
    if aid.startswith("BR-"): return "BR"
    return "?"


def is_mvp(art):
    fase = (art.get("fase") or "").upper()
    estado = (art.get("estado") or "").upper()
    if "MVP" in fase: return True
    if "FASE 2" in fase or "FASE 3" in fase or "PENDIENTE-FASE" in estado: return False
    return None


def cascade_from_cu(cu_id: str):
    if cu_id not in artifacts: return []
    out = set()
    t = artifacts[cu_id]["trazabilidad"]
    for cat in ["negocio", "software_rf", "software_ac", "software_br"]:
        for v in (t.get(cat) or []):
            out.add(v)
    for rf in (t.get("software_rf") or []):
        rf_art = artifacts.get(rf)
        if rf_art:
            rf_t = rf_art["trazabilidad"]
            for v in (rf_t.get("br_aplicables") or []):
                out.add(v)
            for v in (rf_t.get("ac_aplicables") or []):
                out.add(v)
    return sorted(out)


cascade = {aid: cascade_from_cu(aid) for aid in artifacts if aid.startswith("CU-UI")}
mvp_cus_default = sorted([a["id"] for a in artifacts.values() if a["id"].startswith("CU-UI") and is_mvp(a) is True])
transversales = sorted([a["id"] for a in artifacts.values() if (a.get("trazabilidad") or {}).get("transversal") is True])
excluded_by_default = ["BR-001"]

arrasted_by = {}
for cu, deps in cascade.items():
    for d in deps:
        arrasted_by.setdefault(d, []).append(cu)


def safe_mermaid_id(s: str) -> str:
    return re.sub(r"[^a-zA-Z0-9]", "_", s)


def clean_action_text(s: str) -> str:
    """Limpia markdown inline para meter texto puro en un nodo mermaid (sin truncar)."""
    s = re.sub(r"\[\[T-\d+\]\]", "", s)  # elimina refs glosario
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)  # quita bold
    s = re.sub(r"\*([^*]+)\*", r"\1", s)  # quita italic
    s = re.sub(r"`([^`]+)`", r"\1", s)  # quita inline code
    s = re.sub(r"\s+", " ", s).strip()
    s = s.replace('"', "'")
    return s


def wrap_for_mermaid(s: str, width: int = 55) -> str:
    """Word-wrap usando <br/> cada `width` chars aprox, respetando palabras."""
    words = s.split(" ")
    lines, current = [], ""
    for w in words:
        # Si una palabra individual excede el ancho, la dejamos sola en su línea
        if len(w) > width:
            if current: lines.append(current); current = ""
            lines.append(w)
            continue
        if not current:
            current = w
        elif len(current) + 1 + len(w) <= width:
            current = current + " " + w
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return "<br/>".join(lines)


def parse_flow_steps(body: str):
    """Extrae steps del ## Flujo principal. Retorna lista de (actor|None, accion)."""
    # Aceptamos varios titulos: "Flujo principal", "Flujo principal (camino de exito)", "Flujo principal (nivel valor)", "Flujo"
    m = re.search(
        r"##\s*Flujo\s*(?:principal[^\n]*|\b[^\n]*)\n+(.+?)(?=\n##\s|\n---\s*\n|\Z)",
        body, re.DOTALL | re.IGNORECASE
    )
    if not m:
        return []
    section = m.group(1)
    steps = []
    # Tabla con header "| # | Actor | Accion |"
    tbl_rows = re.findall(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(.+?)\s*\|\s*$", section, re.MULTILINE)
    if tbl_rows:
        for _n, actor, action in tbl_rows:
            steps.append((actor.strip(), clean_action_text(action)))
        return steps
    # Lista numerada "1. ..." al inicio de linea (ignora sub-items con sangria)
    list_items = re.findall(r"^(\d+)\.\s+(.+?)(?=\n\d+\.\s|\n##\s|\n---\s*\n|\Z)", section, re.DOTALL | re.MULTILINE)
    for _n, text in list_items:
        # En lista, intentar inferir actor por primera palabra (Tasador/Plataforma/Cliente/Comite)
        action_text = text.strip().replace("\n", " ")
        actor_match = re.match(r"^(Tasador|Plataforma|Cliente B2C|Cliente|Admin|Comit[eé]|App|Sistema|Usuario)\b", action_text)
        if actor_match:
            actor = actor_match.group(1)
            action = action_text[len(actor):].lstrip(" :,-")
            steps.append((actor, clean_action_text(action)))
        else:
            steps.append((None, clean_action_text(action_text)))
    return steps


ACTOR_CLASSES = {
    "Tasador": "actor_tasador",
    "Plataforma": "actor_plataforma",
    "Sistema": "actor_plataforma",
    "App": "actor_plataforma",
    "Cliente": "actor_cliente",
    "Cliente B2C": "actor_cliente",
    "Comité": "actor_comite",
    "Comite": "actor_comite",
    "Admin": "actor_admin",
    "Usuario": "actor_cliente",
}


def mermaid_flow_for_cu(cu_id: str) -> str:
    """Genera flowchart TD del Flujo principal del CU."""
    art = artifacts.get(cu_id)
    if not art:
        return ""
    steps = parse_flow_steps(art["body"])
    if not steps:
        return ""  # CU sin flujo parseable
    lines = ["flowchart TD"]
    lines.append('  classDef actor_tasador fill:#fee2e2,stroke:#f87171,stroke-width:1px')
    lines.append('  classDef actor_plataforma fill:#dbeafe,stroke:#60a5fa,stroke-width:1px')
    lines.append('  classDef actor_cliente fill:#fef3c7,stroke:#fbbf24,stroke-width:1px')
    lines.append('  classDef actor_comite fill:#dcfce7,stroke:#10b981,stroke-width:1px')
    lines.append('  classDef actor_admin fill:#e0e7ff,stroke:#6366f1,stroke-width:1px')
    actor_groups = {}
    for i, (actor, action) in enumerate(steps, start=1):
        node = f"S{i}"
        wrapped = wrap_for_mermaid(f"{i}. {action}", width=55)
        if actor:
            label = f"<b>{actor}</b><br/>{wrapped}"
        else:
            label = wrapped
        lines.append(f'  {node}["{label}"]')
        if i > 1:
            lines.append(f'  S{i-1} --> {node}')
        if actor:
            for prefix, cls in ACTOR_CLASSES.items():
                if actor.lower().startswith(prefix.lower()):
                    actor_groups.setdefault(cls, []).append(node)
                    break
    for cls, nodes in actor_groups.items():
        lines.append(f'  class {",".join(nodes)} {cls}')
    return "\n".join(lines)


mermaid_diagrams = {cu: mermaid_flow_for_cu(cu) for cu in artifacts if cu.startswith("CU-UI")}
# Quitamos los vacios (CUs sin ## Flujo principal parseable)
mermaid_diagrams = {k: v for k, v in mermaid_diagrams.items() if v}


AUTOGEN_START = "<!-- AUTOGEN:trazabilidad START -->"
AUTOGEN_END = "<!-- AUTOGEN:trazabilidad END -->"
# Captura el separador `---` previo + el bloque autogen + newlines posteriores
AUTOGEN_RE = re.compile(
    r"\n*(?:---\s*\n+)?" + re.escape(AUTOGEN_START) + r"[\s\S]*?" + re.escape(AUTOGEN_END) + r"\n*",
    re.DOTALL
)


def strip_autogen(body: str) -> str:
    """Remueve el bloque autogen (incluyendo su separador) para no duplicarlo al renderizar."""
    return AUTOGEN_RE.sub("\n", body).rstrip() + "\n"


def relpath_to_artifact(from_filepath: str, target_id: str) -> str:
    """Calcula path relativo desde el archivo from_filepath al archivo del target_id."""
    target = artifacts.get(target_id)
    if not target:
        return ""
    # both filepaths estan relative to WIKI.parent. Hacemos relpath via Path
    src_dir = (WIKI.parent / from_filepath).parent
    tgt_path = WIKI.parent / target["filepath"]
    try:
        return str(Path(os.path.relpath(tgt_path, src_dir)))
    except ValueError:
        return target["filepath"]


def link_to(from_filepath: str, target_id: str) -> str:
    """Markdown link al target artifact (o badge si no existe)."""
    target = artifacts.get(target_id)
    if not target:
        return f"`{target_id}` *(no existe en el wiki)*"
    rel = relpath_to_artifact(from_filepath, target_id)
    title = target.get("title", "") or ""
    title = re.sub(r"^[A-Z0-9\-]+\s*[—\-:]\s*", "", title)
    if title:
        return f"[{target_id}]({rel}) — {title}"
    return f"[{target_id}]({rel})"


def reverse_lookup_by_artifact(target_id: str):
    """Para un artefacto target, devuelve los CUs/RFs que lo referencian."""
    refs = []
    for aid, art in artifacts.items():
        t = art["trazabilidad"]
        candidates = []
        # CU.software_*  / CU.negocio
        for field in ("negocio", "software_rf", "software_ac", "software_br", "usuario", "software", "br_aplicables", "ac_aplicables", "rf_afectados"):
            v = t.get(field)
            if isinstance(v, list) and target_id in v:
                candidates.append(field)
        # cu_origen (puede ser str o list)
        cu_o = t.get("cu_origen")
        if isinstance(cu_o, list) and target_id in cu_o:
            candidates.append("cu_origen")
        elif isinstance(cu_o, str) and target_id in cu_o:
            candidates.append("cu_origen")
        if candidates:
            refs.append((aid, candidates))
    return refs


def build_autogen_section(art) -> str:
    """Construye el bloque AUTOGEN para inyectar en un .md."""
    aid = art["id"]
    k = kind_of(aid)
    fp = art["filepath"]
    t = art["trazabilidad"]
    lines = ["## Trazabilidad detallada (auto-generada)", ""]
    lines.append("> Generado por `proyecto/wiki/diseno/generate_mvp_builder.py`. **No editar a mano** — se sobrescribe en cada corrida. Si querés modificar relaciones, editá el frontmatter `trazabilidad:` del archivo y volvé a correr el generador.")
    lines.append("")

    # Diagrama de flujo (solo CUs con flujo parseable)
    if k == "CU" and aid in mermaid_diagrams:
        lines += ["### Diagrama de flujo", "", "```mermaid", mermaid_diagrams[aid], "```", ""]

    # Hipervinculos forward
    if k == "CU":
        fwd = [
            ("Resuelve problema de negocio", t.get("negocio") or []),
            ("Implementado por (RF)", t.get("software_rf") or []),
            ("Verificado por (AC)", t.get("software_ac") or []),
            ("Sujeto a reglas de negocio (BR software)", t.get("software_br") or []),
        ]
    elif k == "RF":
        cu_origin_field = art.get("cu_origen_top") or t.get("cu_origen") or ""
        cu_origin_list = []
        if isinstance(cu_origin_field, list):
            cu_origin_list = cu_origin_field
        elif isinstance(cu_origin_field, str) and cu_origin_field.strip():
            cu_origin_list = [c.strip() for c in re.split(r"[,;()\s]+", cu_origin_field) if re.match(r"CU-UI-\d+", c.strip())]
        fwd = [
            ("Originado por (CU)", cu_origin_list),
            ("Implementa visión (BR-NEG)", t.get("negocio") or []),
            ("Aplica reglas de negocio (BR software)", t.get("br_aplicables") or []),
            ("Verificado por (AC)", t.get("ac_aplicables") or []),
        ]
    elif k == "AC":
        cu_o = t.get("cu_origen") or []
        if isinstance(cu_o, str): cu_o = [cu_o]
        fwd = [
            ("Originado por (CU)", cu_o),
            ("Aplica a (RF)", t.get("rf_afectados") or []),
        ]
    elif k == "BR":
        fwd = [
            ("Aplica a (RF)", t.get("rf_afectados") or []),
        ]
    elif k == "BR-NEG":
        fwd = [
            ("Resuelto por (CU usuario)", t.get("usuario") or []),
            ("Implementado por (RF software)", t.get("software") or []),
        ]
    else:
        fwd = []

    fwd_blocks = [(label, items) for label, items in fwd if items]
    if fwd_blocks:
        lines += ["### Referencias salientes", ""]
        for label, items in fwd_blocks:
            lines.append(f"#### {label}")
            lines.append("")
            for item_id in items:
                lines.append(f"- {link_to(fp, item_id)}")
            lines.append("")

    # Referencias entrantes (reverse lookup)
    rev = reverse_lookup_by_artifact(aid)
    if rev:
        lines += ["### Referencias entrantes", ""]
        by_kind = {"CU": [], "RF": [], "AC": [], "BR": [], "BR-NEG": []}
        for ref_id, fields in rev:
            by_kind.setdefault(kind_of(ref_id), []).append((ref_id, fields))
        kind_labels = {"CU": "Casos de Uso (Usuario)", "RF": "Requisitos Funcionales", "AC": "Atributos de Calidad", "BR": "Reglas de Negocio (Software)", "BR-NEG": "Reglas de Negocio (Negocio)"}
        for kk in ["CU", "RF", "AC", "BR", "BR-NEG"]:
            if not by_kind.get(kk): continue
            lines.append(f"#### {kind_labels[kk]}")
            lines.append("")
            for ref_id, fields in sorted(by_kind[kk]):
                lines.append(f"- {link_to(fp, ref_id)} *(via `{', '.join(fields)}`)*")
            lines.append("")

    return "\n".join(lines).rstrip() + "\n"


def inject_autogen_into_md(filepath: Path, content: str) -> bool:
    """Inyecta el bloque AUTOGEN en filepath. Idempotente.

    Retorna True si modifico el archivo.
    """
    text = filepath.read_text()
    # block siempre incluye el separador `---` antes para distincion visual
    block = f"\n\n---\n\n{AUTOGEN_START}\n{content}\n{AUTOGEN_END}\n"
    if AUTOGEN_RE.search(text):
        new_text = AUTOGEN_RE.sub(block, text)
    else:
        new_text = text.rstrip() + block
    if new_text != text:
        filepath.write_text(new_text)
        return True
    return False


# ---- Inyectar AUTOGEN en cada artefacto ----
injected_count = 0
for aid, art in artifacts.items():
    content = build_autogen_section(art)
    if not content.strip():
        continue
    fp = WIKI.parent / art["filepath"]
    if fp.exists():
        if inject_autogen_into_md(fp, content):
            injected_count += 1

# Re-leer bodies con el autogen ya inyectado, pero stripearlo para el JSON del HTML
for aid, art in artifacts.items():
    fp = WIKI.parent / art["filepath"]
    if fp.exists():
        full = fp.read_text()
        body_only = re.match(r"^---\n.*?\n---\n(.*)$", full, re.DOTALL)
        if body_only:
            art["body"] = strip_autogen(body_only.group(1))
        else:
            art["body"] = strip_autogen(full)


def read_md_safe(path: Path) -> str:
    try: return path.read_text()
    except Exception: return ""


context = {
    "fundamentos": read_md_safe(REQ / "00_fundamentos.md"),
    "preguntas_pendientes": read_md_safe(WIKI / "00_preguntas_pendientes.md"),
    "stakeholders_matriz": read_md_safe(REQ / "01_stakeholders" / "matriz-poder-interes.md"),
    "stakeholders_snowman": read_md_safe(REQ / "01_stakeholders" / "snowman.md"),
    "enfoque_ir": read_md_safe(REQ / "02_enfoque-IR.md"),
    "requisitos_globales": read_md_safe(REQ / "04_requisitos-globales.md"),
    "decisiones_pendientes": read_md_safe(REQ / "10_decisiones" / "pendientes.md"),
}


data = {
    "artifacts": artifacts,
    "cascade": cascade,
    "arrastedBy": arrasted_by,
    "mvpCusDefault": mvp_cus_default,
    "transversales": transversales,
    "excludedByDefault": excluded_by_default,
    "mermaid": mermaid_diagrams,
    "context": context,
    "generated": datetime.datetime.now().isoformat(),
}

# Escape para embeber seguro en HTML <script>:
# - ensure_ascii=True evita U+2028/U+2029 que rompen literals JS
# - </ → <\/ evita que el HTML parser cierre el <script> prematuramente
DATA_JSON = json.dumps(data, ensure_ascii=True).replace("</", "<\\/")


HTML_TEMPLATE = r'''<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>MVP Builder — Tasa Inmuebles</title>
<style>
:root{--primary:#f87171;--primary-soft:#fee2e2;--surface-dark:#2a3140;--success:#10b981;--warning:#fbbf24;--info:#60a5fa;--bg:#f4f5f8;--card:#fff;--text:#1f2937;--muted:#9ca3af;--border:#e5e7eb}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.5}
header{background:var(--surface-dark);color:#fff;padding:10px 20px;display:flex;align-items:center;gap:16px;position:sticky;top:0;z-index:100;box-shadow:0 2px 8px rgba(0,0,0,.1);flex-wrap:nowrap}
header .brand{display:flex;flex-direction:column;flex-shrink:1;min-width:0}
header h1{font-size:16px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
header .subtitle{font-size:11px;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
header .spacer{flex:1}
header .stats{font-size:11px;opacity:.75;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;white-space:nowrap}
header .controls{display:flex;gap:6px;align-items:center;flex-shrink:0}
header button{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);padding:6px 12px;border-radius:6px;cursor:pointer;font-size:12px;white-space:nowrap}
header button:hover{background:rgba(255,255,255,.2)}
header button.primary{background:var(--primary);border-color:var(--primary);font-weight:600}
header button.primary:hover{background:#ef5350}
#context-panel{background:#fff;border-bottom:1px solid var(--border);padding:16px 24px;max-height:65vh;overflow-y:auto;display:none}
#context-panel.open{display:block}
#context-panel h2{font-size:14px;margin-bottom:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
#context-panel details{margin-bottom:10px;border:1px solid var(--border);border-radius:8px}
#context-panel summary{padding:12px 16px;cursor:pointer;font-weight:600;font-size:14px}
#context-panel summary:hover{background:var(--bg)}
#context-panel details[open] summary{border-bottom:1px solid var(--border)}
#context-panel .ctx-body{padding:16px 18px;max-height:520px;overflow-y:auto}
.board{display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px;height:calc(100vh - 60px)}
.zone{background:#fff;border-radius:12px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.zone-header{padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:var(--bg)}
.zone-header h2{font-size:16px;font-weight:600}
.zone-header .counter{background:var(--primary);color:#fff;padding:2px 10px;border-radius:12px;font-size:12px;font-weight:600}
.filters{padding:8px 16px;border-bottom:1px solid var(--border);display:flex;gap:6px;flex-wrap:wrap;align-items:center}
.filters input[type=search]{flex:1;min-width:200px;padding:6px 10px;border:1px solid var(--border);border-radius:6px;font-size:13px}
.filters .chip{padding:4px 10px;border:1px solid var(--border);border-radius:12px;background:#fff;cursor:pointer;font-size:12px;font-weight:500;color:var(--muted);user-select:none}
.filters .chip.active{background:var(--primary-soft);border-color:var(--primary);color:var(--primary)}
.items{flex:1;overflow-y:auto;padding:12px}
.items-group{margin-bottom:18px}
.items-group-title{font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px;padding-left:4px;display:flex;justify-content:space-between}
.card{background:#fff;border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:8px;cursor:grab;transition:all .15s ease;position:relative}
.card:hover{border-color:var(--primary);transform:translateY(-1px);box-shadow:0 2px 8px rgba(0,0,0,.08)}
.card:active{cursor:grabbing}
.card.dragging{opacity:.4}
.card.in-mvp{opacity:.45;background:#fafbfc;cursor:default}
.card.in-mvp:hover{opacity:.7;transform:none;border-color:var(--border);box-shadow:none}
.card.in-mvp .card-id{color:var(--muted)}
.card-head{display:flex;align-items:center;gap:8px;margin-bottom:6px}
.card-id{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;font-weight:700;color:var(--primary)}
.card-title{font-size:13px;font-weight:500;flex:1}
.card-body{font-size:12px;color:var(--muted);line-height:1.4;max-height:36px;overflow:hidden;text-overflow:ellipsis}
.card-badges{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px}
.badge{font-size:10px;padding:2px 6px;border-radius:4px;font-weight:600;text-transform:uppercase;letter-spacing:.3px}
.badge.mvp{background:#d1fae5;color:#047857}
.badge.fase2{background:#e0e7ff;color:#4338ca}
.badge.fase3{background:#fce7f3;color:#9d174d}
.badge.transversal{background:#fef3c7;color:#92400e}
.badge.duplicate{background:#fee2e2;color:#b91c1c}
.badge.cu{background:#fef3c7;color:#92400e}
.badge.rf{background:#dcfce7;color:#166534}
.badge.ac{background:#fce7f3;color:#9d174d}
.badge.br{background:#fed7aa;color:#9a3412}
.badge.brneg{background:#dbeafe;color:#1e40af}
.badge.arrastado{background:var(--primary-soft);color:var(--primary);font-weight:500;text-transform:none}
.zone-mvp .items{background:#fcfcfd}
.zone-mvp.drag-over{background:var(--primary-soft)}
.zone-catalog.drag-over{background:#f0f9ff}
.empty-state{text-align:center;padding:40px 20px;color:var(--muted);font-size:13px}
dialog{border:none;border-radius:12px;padding:0;max-width:1200px;max-height:92vh;width:92%;box-shadow:0 20px 60px rgba(0,0,0,.25);position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);margin:0}
dialog::backdrop{background:rgba(0,0,0,.55)}
dialog header{position:relative;display:flex;align-items:center;justify-content:space-between;padding:18px 24px;background:var(--surface-dark);color:#fff}
dialog header h3{font-size:17px;font-weight:600}
dialog header button.close{background:transparent;border:none;color:#fff;font-size:28px;cursor:pointer;line-height:1;padding:0;width:32px;height:32px}
.modal-body{padding:24px 28px;max-height:75vh;overflow-y:auto;font-size:15px;line-height:1.6}
.modal-body h4{font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-top:22px;margin-bottom:10px}
.modal-body h4:first-child{margin-top:0}
.modal-body pre{background:var(--bg);padding:14px;border-radius:6px;overflow-x:auto;font-size:13px;line-height:1.5;white-space:pre-wrap;word-wrap:break-word}
.modal-body .meta{display:grid;grid-template-columns:max-content 1fr;gap:8px 20px;font-size:14px}
.modal-body .meta dt{color:var(--muted);font-weight:600}
.modal-foot{padding:12px 20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:8px}
.modal-foot button{padding:8px 16px;border:1px solid var(--border);background:#fff;border-radius:6px;cursor:pointer;font-size:13px}
.modal-foot button.primary{background:var(--primary);color:#fff;border-color:var(--primary)}
.mermaid{background:var(--bg);padding:16px;border-radius:8px;text-align:center;margin:0 0 16px 0}
.md-rendered{font-size:14px;line-height:1.6;color:var(--text)}
.md-rendered h1,.md-rendered h2,.md-rendered h3,.md-rendered h4{margin-top:18px;margin-bottom:8px;font-weight:600}
.md-rendered h1{font-size:20px;border-bottom:1px solid var(--border);padding-bottom:6px}
.md-rendered h2{font-size:17px;color:var(--surface-dark)}
.md-rendered h3{font-size:15px;color:var(--surface-dark)}
.md-rendered h4{font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.3px}
.md-rendered p{margin:8px 0}
.md-rendered ul,.md-rendered ol{margin:8px 0;padding-left:24px}
.md-rendered li{margin:3px 0}
.md-rendered code{background:#f1f5f9;padding:1px 5px;border-radius:3px;font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:#475569}
.md-rendered pre{background:#0f172a;color:#e2e8f0;padding:12px;border-radius:6px;overflow-x:auto;font-size:12px;line-height:1.5;margin:10px 0}
.md-rendered pre code{background:transparent;color:inherit;padding:0;font-size:12px}
.md-rendered blockquote{border-left:3px solid var(--primary);padding:4px 12px;margin:10px 0;color:var(--muted);font-style:italic;background:#fef9f9}
.md-rendered table{border-collapse:collapse;margin:12px 0;font-size:13px;width:100%}
.md-rendered th,.md-rendered td{border:1px solid var(--border);padding:6px 10px;text-align:left;vertical-align:top}
.md-rendered th{background:var(--bg);font-weight:600}
.md-rendered tr:nth-child(even) td{background:#fafbfc}
.md-rendered a{color:var(--primary);text-decoration:none}
.md-rendered a:hover{text-decoration:underline}
.md-rendered hr{border:none;border-top:1px solid var(--border);margin:18px 0}
.md-rendered strong{font-weight:700;color:var(--surface-dark)}
.md-fallback{background:var(--bg);padding:12px;border-radius:6px;font-size:12px;white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.flash{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--surface-dark);color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;box-shadow:0 4px 16px rgba(0,0,0,.2);opacity:0;transition:opacity .2s;z-index:1000;pointer-events:none}
.flash.show{opacity:1}
</style>
</head>
<body>
<header>
  <div class="brand">
    <h1>MVP Builder — Tasa Inmuebles</h1>
    <div class="subtitle">reunión sponsor / Hito 1 demo Colegio</div>
  </div>
  <div class="spacer"></div>
  <span class="stats" id="header-stats">—</span>
  <div class="controls">
    <button id="btn-context" title="Mostrar/ocultar contexto">Contexto</button>
    <button id="btn-reset" title="Resetear al MVP default">Reset</button>
    <button id="btn-create-doc" class="primary">Crear doc-mvp</button>
  </div>
</header>

<section id="context-panel">
  <h2>Contexto del proyecto (informativo)</h2>
  <details><summary>Fundamentos (Cockburn 3 pilares)</summary><div class="ctx-body" data-ctx="fundamentos"></div></details>
  <details><summary>Stakeholders — matriz poder/interés</summary><div class="ctx-body" data-ctx="stakeholders_matriz"></div></details>
  <details><summary>Snowman DSDM (6 roles)</summary><div class="ctx-body" data-ctx="stakeholders_snowman"></div></details>
  <details><summary>Enfoque IR (MoSCoW, dual-track, Cynefin)</summary><div class="ctx-body" data-ctx="enfoque_ir"></div></details>
  <details><summary>Requisitos Globales (RG-001..006)</summary><div class="ctx-body" data-ctx="requisitos_globales"></div></details>
  <details><summary>Decisiones pendientes (DP / DS / Q)</summary><div class="ctx-body" data-ctx="decisiones_pendientes"></div></details>
  <details><summary>Preguntas abiertas (Q01..Q12)</summary><div class="ctx-body" data-ctx="preguntas_pendientes"></div></details>
</section>

<main class="board">
  <section class="zone zone-catalog">
    <div class="zone-header"><h2>Catálogo</h2><span class="counter" id="catalog-counter">0</span></div>
    <div class="filters">
      <input type="search" id="search" placeholder="Buscar por id, título, palabra clave...">
      <span class="chip active" data-filter="all">Todos</span>
      <span class="chip" data-filter="CU">CU</span>
      <span class="chip" data-filter="RF">RF</span>
      <span class="chip" data-filter="AC">AC</span>
      <span class="chip" data-filter="BR">BR</span>
      <span class="chip" data-filter="BR-NEG">BR-NEG</span>
    </div>
    <div class="items" id="catalog-items"></div>
  </section>

  <section class="zone zone-mvp" id="mvp-zone">
    <div class="zone-header"><h2>En MVP</h2><span class="counter" id="mvp-counter">0</span></div>
    <div class="filters">
      <span class="chip active" data-mvp-filter="all">Todos</span>
      <span class="chip" data-mvp-filter="CU">CU</span>
      <span class="chip" data-mvp-filter="RF">RF</span>
      <span class="chip" data-mvp-filter="AC">AC</span>
      <span class="chip" data-mvp-filter="BR">BR</span>
      <span class="chip" data-mvp-filter="BR-NEG">BR-NEG</span>
    </div>
    <div class="items" id="mvp-items"></div>
  </section>
</main>

<dialog id="card-modal">
  <header><h3 id="modal-title">—</h3><button class="close" id="close-card-modal">&times;</button></header>
  <div class="modal-body" id="modal-body"></div>
</dialog>

<dialog id="doc-modal">
  <header><h3>Documento MVP generado</h3><button class="close" id="close-doc-modal">&times;</button></header>
  <div class="modal-body"><pre id="doc-preview"></pre></div>
  <div class="modal-foot">
    <button id="btn-copy-doc">Copiar al portapapeles</button>
    <button id="btn-download-doc" class="primary">Descargar .md</button>
  </div>
</dialog>

<div class="flash" id="flash">—</div>

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/marked@11/marked.min.js"></script>
<script>
const DATA = __DATA_JSON__;
mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "default" });

let mvpItems = new Set();
let filterCatalog = "all";
let filterMvp = "all";
let searchTerm = "";

function kindOf(id) {
  if (id.startsWith("CU-UI")) return "CU";
  if (id.startsWith("RF-")) return "RF";
  if (id.startsWith("AC-")) return "AC";
  if (id.startsWith("BR-NEG")) return "BR-NEG";
  if (id.startsWith("BR-")) return "BR";
  return "?";
}

function isMvpFlagged(art) {
  const fase = (art.fase || "").toUpperCase();
  const estado = (art.estado || "").toUpperCase();
  if (fase.includes("MVP")) return true;
  if (fase.includes("FASE 2") || fase.includes("FASE 3") || estado.includes("PENDIENTE-FASE")) return false;
  return null;
}

function loadDefaultMvp() {
  mvpItems = new Set();
  for (const cu of DATA.mvpCusDefault) addToMvp(cu, true);
  for (const t of DATA.transversales) mvpItems.add(t);
  for (const x of DATA.excludedByDefault) mvpItems.delete(x);
}

function addToMvp(id, cascade) {
  mvpItems.add(id);
  if (cascade && id.startsWith("CU-UI")) {
    for (const dep of (DATA.cascade[id] || [])) mvpItems.add(dep);
  }
}

function removeFromMvp(id) {
  mvpItems.delete(id);
  if (id.startsWith("CU-UI")) {
    const deps = DATA.cascade[id] || [];
    const stillBy = new Set();
    for (const otherCu of mvpItems) {
      if (otherCu.startsWith("CU-UI") && otherCu !== id) {
        for (const d of (DATA.cascade[otherCu] || [])) stillBy.add(d);
      }
    }
    const wouldRemove = deps.filter(d => !stillBy.has(d) && !DATA.transversales.includes(d));
    if (wouldRemove.length > 0) {
      const ok = confirm("Quitar " + id + " va a remover " + wouldRemove.length + " items que ningun otro CU arrastra:\n\n" + wouldRemove.join(", ") + "\n\n¿Quitarlos tambien?");
      if (ok) {
        for (const w of wouldRemove) mvpItems.delete(w);
      }
    }
  }
}

function arrastedByMvpCus(id) {
  return (DATA.arrastedBy[id] || []).filter(cu => mvpItems.has(cu));
}

function el(tag, props, ...children) {
  const node = document.createElement(tag);
  if (props) {
    for (const k of Object.keys(props)) {
      if (k === "class") node.className = props[k];
      else if (k === "text") node.textContent = props[k];
      else if (k === "html") { /* never use */ }
      else if (k === "dataset") { for (const dk of Object.keys(props[k])) node.dataset[dk] = props[k][dk]; }
      else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), props[k]);
      else node.setAttribute(k, props[k]);
    }
  }
  for (const c of children) {
    if (c == null) continue;
    if (typeof c === "string") node.appendChild(document.createTextNode(c));
    else node.appendChild(c);
  }
  return node;
}

function buildBadge(text, cls) {
  return el("span", { class: "badge " + cls, text: text });
}

function buildCard(art, opts) {
  opts = opts || {};
  const k = kindOf(art.id);
  const mvpFlag = isMvpFlagged(art);
  const isTransversal = DATA.transversales.includes(art.id);
  const isDuplicate = art.id === "BR-001";
  const inMvp = mvpItems.has(art.id);
  const arrastBy = opts.showArrast ? arrastedByMvpCus(art.id) : [];
  // En el catalogo, items que ya estan en MVP se atenuan
  const mutedInCatalog = opts.context === "catalog" && inMvp;

  const badges = el("div", { class: "card-badges" });
  badges.appendChild(buildBadge(k, k.toLowerCase().replace("-", "")));
  if (mutedInCatalog) {
    badges.appendChild(buildBadge("✓ en MVP", "mvp"));
  } else if (mvpFlag === true) {
    badges.appendChild(buildBadge("MVP-flag", "mvp"));
  } else if (mvpFlag === false) {
    const isF3 = (art.fase || "").toLowerCase().includes("fase 3");
    badges.appendChild(buildBadge(isF3 ? "Fase 3" : "Fase 2", isF3 ? "fase3" : "fase2"));
  }
  if (isTransversal) badges.appendChild(buildBadge("Transversal", "transversal"));
  if (isDuplicate) badges.appendChild(buildBadge("Duplicado de BR-NEG-004", "duplicate"));
  if (arrastBy.length > 0) {
    const b = buildBadge("← " + arrastBy.length + " CU" + (arrastBy.length > 1 ? "s" : ""), "arrastado");
    b.title = arrastBy.join(", ");
    badges.appendChild(b);
  }

  const titleClean = (art.title || art.id).replace(/^[A-Z0-9\-]+\s*[—\-:]\s*/, "");

  const head = el("div", { class: "card-head" },
    el("span", { class: "card-id", text: art.id }),
    el("span", { class: "card-title", text: titleClean })
  );

  const card = el("div", {
    class: "card" + (mutedInCatalog ? " in-mvp" : ""),
    draggable: mutedInCatalog ? "false" : "true",
    dataset: { id: art.id }
  }, head);

  if (art.resumen) {
    const oneLine = art.resumen.replace(/\s+/g, " ").substring(0, 140);
    card.appendChild(el("div", { class: "card-body", text: oneLine + "…" }));
  }
  card.appendChild(badges);
  return card;
}

function buildGroup(label, count, cards) {
  const head = el("div", { class: "items-group-title" },
    el("span", { text: label }),
    el("span", { text: String(count) })
  );
  const group = el("div", { class: "items-group" }, head);
  for (const c of cards) group.appendChild(c);
  return group;
}

function matchesSearch(art, term) {
  if (!term) return true;
  const haystack = (art.id + " " + (art.title || "") + " " + (art.resumen || "")).toLowerCase();
  return haystack.includes(term.toLowerCase());
}

function renderCatalog() {
  const container = document.getElementById("catalog-items");
  container.replaceChildren();
  const list = Object.values(DATA.artifacts).filter(a => {
    const k = kindOf(a.id);
    if (filterCatalog !== "all" && k !== filterCatalog) return false;
    if (!matchesSearch(a, searchTerm)) return false;
    return true;
  });
  const groups = { CU: [], RF: [], AC: [], BR: [], "BR-NEG": [] };
  for (const a of list) {
    const k = kindOf(a.id);
    if (groups[k]) groups[k].push(a);
  }
  const labels = { CU: "Casos de Uso (Usuario)", RF: "Requisitos Funcionales", AC: "Atributos de Calidad", BR: "Reglas de Negocio (Software)", "BR-NEG": "Reglas de Negocio (Negocio)" };
  let any = false;
  for (const k of ["CU", "RF", "AC", "BR", "BR-NEG"]) {
    if (groups[k].length === 0) continue;
    groups[k].sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
    const cards = groups[k].map(a => buildCard(a, { showArrast: false, context: "catalog" }));
    container.appendChild(buildGroup(labels[k], groups[k].length, cards));
    any = true;
  }
  if (!any) {
    container.appendChild(el("div", { class: "empty-state", text: "Sin resultados" }));
  }
  document.getElementById("catalog-counter").textContent = String(list.length);
}

function renderMvp() {
  const container = document.getElementById("mvp-items");
  container.replaceChildren();
  const list = Array.from(mvpItems).map(id => DATA.artifacts[id]).filter(Boolean).filter(a => filterMvp === "all" || kindOf(a.id) === filterMvp);
  const groups = { CU: [], RF: [], AC: [], BR: [], "BR-NEG": [] };
  for (const a of list) {
    const k = kindOf(a.id);
    if (groups[k]) groups[k].push(a);
  }
  const labels = { CU: "Casos de Uso", RF: "RF", AC: "AC", BR: "BR", "BR-NEG": "BR-NEG" };
  let any = false;
  for (const k of ["CU", "RF", "AC", "BR", "BR-NEG"]) {
    if (groups[k].length === 0) continue;
    groups[k].sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }));
    const cards = groups[k].map(a => buildCard(a, { showArrast: true, context: "mvp" }));
    container.appendChild(buildGroup(labels[k], groups[k].length, cards));
    any = true;
  }
  if (mvpItems.size === 0) {
    container.appendChild(el("div", { class: "empty-state", text: "Arrastrá artefactos desde el catálogo para armar el MVP" }));
  } else if (!any) {
    container.appendChild(el("div", { class: "empty-state", text: "No hay items de ese tipo en MVP" }));
  }
  document.getElementById("mvp-counter").textContent = String(mvpItems.size);
  updateHeaderStats();
}

function updateHeaderStats() {
  const stats = { CU: 0, RF: 0, AC: 0, BR: 0, "BR-NEG": 0 };
  for (const id of mvpItems) {
    const k = kindOf(id);
    if (stats[k] !== undefined) stats[k]++;
  }
  document.getElementById("header-stats").textContent =
    "MVP: " + mvpItems.size + " | CU " + stats.CU + " · RF " + stats.RF + " · AC " + stats.AC + " · BR " + stats.BR + " · BR-NEG " + stats["BR-NEG"];
}

function renderAll() {
  renderCatalog();
  renderMvp();
}

function flash(msg) {
  const f = document.getElementById("flash");
  f.textContent = msg;
  f.classList.add("show");
  setTimeout(() => f.classList.remove("show"), 2000);
}

// Drag & drop
let draggingId = null;
document.addEventListener("dragstart", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  draggingId = card.dataset.id;
  card.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
});
document.addEventListener("dragend", (e) => {
  const card = e.target.closest(".card");
  if (card) card.classList.remove("dragging");
  document.querySelectorAll(".zone").forEach(z => z.classList.remove("drag-over"));
  draggingId = null;
});
document.querySelectorAll(".zone").forEach(zone => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    zone.classList.add("drag-over");
  });
  zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("drag-over");
    if (!draggingId) return;
    const targetIsMvp = zone.classList.contains("zone-mvp");
    const targetIsCatalog = zone.classList.contains("zone-catalog");
    const wasInMvp = mvpItems.has(draggingId);

    if (targetIsMvp && !wasInMvp) {
      addToMvp(draggingId, true);
      const k = kindOf(draggingId);
      if (k === "CU") {
        const cs = (DATA.cascade[draggingId] || []).length;
        flash(draggingId + " agregado al MVP + " + cs + " dependientes por cascada");
      } else {
        flash(draggingId + " agregado al MVP");
      }
      renderAll();
    } else if (targetIsCatalog && wasInMvp) {
      removeFromMvp(draggingId);
      flash(draggingId + " quitado del MVP");
      renderAll();
    }
  });
});

// Card click → modal
document.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  if (["INPUT","BUTTON","SELECT","TEXTAREA"].includes(e.target.tagName)) return;
  openCardModal(card.dataset.id);
});

function renderMarkdownInto(parent, mdText) {
  // Convertir MD a HTML y montar via DOMParser (sin innerHTML).
  if (!mdText) return;
  if (typeof marked === "undefined" || !marked.parse) {
    // Fallback si marked no cargo (sin internet)
    parent.appendChild(el("pre", { class: "md-fallback", text: mdText }));
    return;
  }
  try {
    const htmlStr = marked.parse(mdText, { breaks: false, gfm: true });
    const wrapper = el("div", { class: "md-rendered" });
    const doc = new DOMParser().parseFromString(htmlStr, "text/html");
    while (doc.body.firstChild) wrapper.appendChild(doc.body.firstChild);
    parent.appendChild(wrapper);
  } catch (e) {
    console.error("Markdown render error:", e);
    parent.appendChild(el("pre", { class: "md-fallback", text: mdText }));
  }
}

function openCardModal(id) {
  const art = DATA.artifacts[id];
  if (!art) return;
  document.getElementById("modal-title").textContent = art.title || art.id;
  const body = document.getElementById("modal-body");
  body.replaceChildren();

  // 1) Diagrama Mermaid arriba (si existe — solo CUs)
  let mer = null;
  if (DATA.mermaid[id]) {
    body.appendChild(el("h4", { text: "Diagrama de flujo del CU" }));
    mer = el("div", { class: "mermaid", text: DATA.mermaid[id] });
    body.appendChild(mer);
  }

  // 2) Metadatos
  const meta = el("dl", { class: "meta" });
  function addMeta(label, value) {
    if (!value) return;
    meta.appendChild(el("dt", { text: label }));
    meta.appendChild(el("dd", { text: value }));
  }
  addMeta("Archivo", art.filepath);
  addMeta("Tipo", art.tipo || kindOf(art.id));
  addMeta("Nivel", art.nivel);
  addMeta("Fase", art.fase);
  addMeta("Estado", art.estado);
  addMeta("MoSCoW", art.moscow);
  addMeta("Estilo", art.estilo);
  addMeta("Clasificación", art.clasificacion);
  addMeta("Categoría", art.categoria);
  body.appendChild(el("h4", { text: "Metadatos" }));
  body.appendChild(meta);

  // 3) Trazabilidad de frontmatter
  const t = art.trazabilidad || {};
  const trazKeys = Object.keys(t);
  if (trazKeys.length > 0) {
    body.appendChild(el("h4", { text: "Trazabilidad (frontmatter)" }));
    const trazDl = el("dl", { class: "meta" });
    for (const k of trazKeys) {
      trazDl.appendChild(el("dt", { text: k }));
      const v = t[k];
      const text = Array.isArray(v) ? v.join(", ") : String(v);
      trazDl.appendChild(el("dd", { text: text }));
    }
    body.appendChild(trazDl);
  }

  // 4) Body renderizado como Markdown
  if (art.body) {
    body.appendChild(el("h4", { text: "Contenido (.md renderizado)" }));
    renderMarkdownInto(body, art.body);
  }

  document.getElementById("card-modal").showModal();
  // Renderizar mermaid despues de abrir modal (necesita estar en DOM visible)
  if (mer) {
    setTimeout(() => {
      mermaid.run({ nodes: [mer] }).catch(err => console.error("Mermaid error:", err));
    }, 60);
  }
}

document.getElementById("close-card-modal").addEventListener("click", () => document.getElementById("card-modal").close());
document.getElementById("close-doc-modal").addEventListener("click", () => document.getElementById("doc-modal").close());

document.querySelectorAll(".chip[data-filter]").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip[data-filter]").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    filterCatalog = chip.dataset.filter;
    renderCatalog();
  });
});
document.querySelectorAll(".chip[data-mvp-filter]").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip[data-mvp-filter]").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    filterMvp = chip.dataset.mvpFilter;
    renderMvp();
  });
});
document.getElementById("search").addEventListener("input", (e) => {
  searchTerm = e.target.value;
  renderCatalog();
});

document.getElementById("btn-context").addEventListener("click", () => {
  document.getElementById("context-panel").classList.toggle("open");
});
// Renderizar contexto solo al abrir su <details> por primera vez (lazy)
document.querySelectorAll(".ctx-body").forEach(el2 => {
  const details = el2.closest("details");
  if (!details) return;
  details.addEventListener("toggle", () => {
    if (!details.open || el2.dataset.rendered === "1") return;
    el2.replaceChildren();
    const k = el2.dataset.ctx;
    const md = DATA.context[k] || "(vacío)";
    renderMarkdownInto(el2, md);
    el2.dataset.rendered = "1";
  }, { once: false });
});

document.getElementById("btn-reset").addEventListener("click", () => {
  if (!confirm("¿Resetear al MVP por default (7 CUs + cascada + transversales)?")) return;
  loadDefaultMvp();
  renderAll();
  flash("MVP reseteado al default");
});

document.getElementById("btn-create-doc").addEventListener("click", () => {
  const md = generateMvpDoc();
  document.getElementById("doc-preview").textContent = md;
  document.getElementById("doc-modal").showModal();
});
document.getElementById("btn-copy-doc").addEventListener("click", () => {
  const md = document.getElementById("doc-preview").textContent;
  navigator.clipboard.writeText(md).then(() => flash("Copiado al portapapeles"));
});
document.getElementById("btn-download-doc").addEventListener("click", () => {
  const md = document.getElementById("doc-preview").textContent;
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const today = new Date().toISOString().slice(0, 10);
  a.href = url; a.download = "mvp-decisions-" + today + ".md";
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  flash("Descargado");
});

function generateMvpDoc() {
  const today = new Date().toISOString().slice(0, 10);
  const time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  const ids = Array.from(mvpItems).filter(id => DATA.artifacts[id]);
  const groups = { CU: [], RF: [], AC: [], BR: [], "BR-NEG": [] };
  for (const id of ids) {
    const k = kindOf(id);
    if (groups[k]) groups[k].push(id);
  }
  for (const k in groups) {
    groups[k].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  }
  const labels = {
    CU: "Casos de Uso (Nivel Usuario)",
    RF: "Requisitos Funcionales (Nivel Software)",
    AC: "Atributos de Calidad (No Funcionales)",
    BR: "Reglas de Negocio (Software, operativas)",
    "BR-NEG": "Reglas de Negocio (Nivel Negocio, conceptuales)"
  };

  let md = "# Decisiones de Scope MVP — Tasa Inmuebles\n";
  md += "*Hito 1 — Demo Colegio de Arquitectos (~2026-06-25)*\n\n";
  md += "> Documento generado el " + today + " " + time + " desde `mvp-builder.html`. Lista los artefactos del wiki que entran al MVP, con referencia al archivo fuente. **Snapshot de la decisión de scope, no reemplaza el wiki.**\n\n";
  md += "**Total de artefactos en MVP**: " + mvpItems.size + "\n";
  md += "- Casos de Uso: " + groups.CU.length + "\n";
  md += "- Requisitos Funcionales: " + groups.RF.length + "\n";
  md += "- Atributos de Calidad: " + groups.AC.length + "\n";
  md += "- Reglas de Negocio (Software): " + groups.BR.length + "\n";
  md += "- Reglas de Negocio (Negocio): " + groups["BR-NEG"].length + "\n\n";
  md += "---\n\n";

  for (const k of ["CU", "RF", "AC", "BR", "BR-NEG"]) {
    if (groups[k].length === 0) continue;
    md += "## " + labels[k] + " (" + groups[k].length + ")\n\n";
    md += "| ID | Título | Fase | Archivo |\n|---|---|---|---|\n";
    for (const id of groups[k]) {
      const art = DATA.artifacts[id];
      const title = (art.title || "").replace(/\|/g, "\\|");
      md += "| **" + id + "** | " + title + " | " + (art.fase || "—") + " | `" + art.filepath + "` |\n";
    }
    md += "\n";
  }

  md += "---\n\n## Anexo A — Contexto del proyecto\n\n";
  md += "> Los siguientes artefactos NO son scope MVP en el sentido estricto, pero son contexto necesario para entender las decisiones. Referencias a archivos del wiki para consulta.\n\n";
  md += "### Fundamentos (Cockburn 3 pilares)\n- `proyecto/wiki/requisitos/00_fundamentos.md`\n\n";
  md += "### Stakeholders\n- `proyecto/wiki/requisitos/01_stakeholders/matriz-poder-interes.md` (matriz poder/interés, 22 stakeholders)\n- `proyecto/wiki/requisitos/01_stakeholders/snowman.md` (6 roles DSDM)\n\n";
  md += "### Enfoque IR\n- `proyecto/wiki/requisitos/02_enfoque-IR.md` (MoSCoW + dual-track + Cynefin)\n\n";
  md += "### Requisitos Globales\n- `proyecto/wiki/requisitos/04_requisitos-globales.md` (RG-001..006, invariantes del sistema)\n\n";
  md += "### Decisiones Pendientes\n- `proyecto/wiki/requisitos/10_decisiones/pendientes.md` (DP, DS, Q abiertas)\n- `proyecto/wiki/00_preguntas_pendientes.md` (Q01..Q12)\n\n";

  md += "---\n\n## Anexo B — Trazabilidad MVP (cascada por CU)\n\n";
  for (const cu of groups.CU) {
    const deps = (DATA.cascade[cu] || []).filter(d => mvpItems.has(d));
    md += "- **" + cu + "** arrastra (" + deps.length + "): " + (deps.length ? deps.join(", ") : "—") + "\n";
  }

  md += "\n---\n\n## Anexo C — Artefactos del wiki NO incluidos\n\n";
  const allIds = Object.keys(DATA.artifacts);
  const notIn = allIds.filter(id => !mvpItems.has(id));
  const notInByKind = { CU: [], RF: [], AC: [], BR: [], "BR-NEG": [] };
  for (const id of notIn) {
    const k = kindOf(id);
    if (notInByKind[k]) notInByKind[k].push(id);
  }
  for (const k in notInByKind) {
    if (notInByKind[k].length === 0) continue;
    notInByKind[k].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
    md += "- **" + labels[k] + "** (" + notInByKind[k].length + "): " + notInByKind[k].join(", ") + "\n";
  }

  md += "\n---\n\n*Generado por mvp-builder.html. Wiki: `/Users/francobertoldi/Documents/Cocucci/proyecto/wiki/`*\n";
  return md;
}

loadDefaultMvp();
renderAll();
</script>
</body>
</html>
'''

html_output = HTML_TEMPLATE.replace("__DATA_JSON__", DATA_JSON)
OUTPUT.write_text(html_output)

print("OK generado: " + str(OUTPUT))
print("  Total artefactos: " + str(len(artifacts)))
print("  CU MVP default: " + str(len(mvp_cus_default)))
print("  Transversales: " + str(len(transversales)))
print("  Excluidos por default: " + str(len(excluded_by_default)))
print("  Diagramas de flujo: " + str(len(mermaid_diagrams)))
print("  MDs inyectados con AUTOGEN: " + str(injected_count))
print("  Tamano HTML: " + str(OUTPUT.stat().st_size) + " bytes")
