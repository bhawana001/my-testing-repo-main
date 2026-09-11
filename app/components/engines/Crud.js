"use client";
// CRUD engine: filterable/sortable data table with create/edit/delete modal,
// plus a Kanban board with drag-and-drop and keyboard/click fallbacks.
import { useMemo, useState } from "react";
import { Badge, Btn, Card, Field, Input, Modal, Select, Table, Textarea } from "../eval/ui";

export function nextId(prefix, rows) {
  const max = rows.reduce((m, r) => Math.max(m, Number(String(r.id).replace(/\D/g, "")) || 0), 0);
  return `${prefix}-${max + 1}`;
}

/** RecordForm: fields [{name,label,type,options,required}] */
export function RecordForm({ fields, values, onChange, errors = {} }) {
  return (
    <div className="ee-stack">
      {fields.map((f) => {
        const id = `rf-${f.name}`;
        const v = values[f.name] ?? "";
        const set = (val) => onChange({ ...values, [f.name]: val });
        return (
          <Field key={f.name} label={f.label} htmlFor={id} error={errors[f.name]} help={f.help}>
            {f.type === "select" ? (
              <Select id={id} value={v} onChange={(e) => set(e.target.value)} invalid={!!errors[f.name]}>
                <option value="">Select…</option>
                {f.options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
              </Select>
            ) : f.type === "textarea" ? (
              <Textarea id={id} value={v} onChange={(e) => set(e.target.value)} invalid={!!errors[f.name]} />
            ) : (
              <Input id={id} type={f.type || "text"} value={v} onChange={(e) => set(e.target.value)} placeholder={f.placeholder} invalid={!!errors[f.name]} />
            )}
          </Field>
        );
      })}
    </div>
  );
}

export function validateRecord(fields, values) {
  const errors = {};
  for (const f of fields) {
    if (f.required && (values[f.name] === undefined || values[f.name] === "")) errors[f.name] = `${f.label} is required.`;
    else if (f.validate && values[f.name] !== "" && values[f.name] !== undefined) {
      const m = f.validate(values[f.name], values);
      if (m) errors[f.name] = m;
    }
  }
  return errors;
}

/**
 * DataTable: rows, columns [{key,label,render,sortable,align}], fields (for create/edit),
 * onChange(rows), filters [{key,label,options}], searchKeys, idPrefix, title, canCreate/canEdit/canDelete
 */
export function DataTable({ rows, onChange, columns, fields = [], filters = [], searchKeys = [], idPrefix = "REC", title, canCreate = true, canEdit = true, canDelete = true, createLabel = "New", defaults = {}, onRowClick, extraActions, testIdPrefix = "table", emptyText = "No records", initialSort, transformNew }) {
  const [q, setQ] = useState("");
  const [filterVals, setFilterVals] = useState({});
  const [sort, setSort] = useState(initialSort || null);
  const [modal, setModal] = useState(null); // { mode: "create"|"edit", values }
  const [errors, setErrors] = useState({});

  const shown = useMemo(() => {
    let r = rows;
    const term = q.trim().toLowerCase();
    if (term && searchKeys.length) r = r.filter((row) => searchKeys.some((k) => String(row[k] ?? "").toLowerCase().includes(term)));
    for (const [k, v] of Object.entries(filterVals)) if (v) r = r.filter((row) => String(row[k]) === String(v));
    if (sort) {
      r = [...r].sort((a, b) => {
        const av = a[sort.key], bv = b[sort.key];
        const c = typeof av === "number" && typeof bv === "number" ? av - bv : String(av ?? "").localeCompare(String(bv ?? ""));
        return sort.dir === "asc" ? c : -c;
      });
    }
    return r;
  }, [rows, q, filterVals, sort, searchKeys]);

  function save() {
    const errs = validateRecord(fields, modal.values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (modal.mode === "create") {
      let rec = { id: nextId(idPrefix, rows), ...defaults, ...modal.values, createdAt: "2026-09-14T10:00:00Z" };
      if (transformNew) rec = transformNew(rec, rows);
      onChange([rec, ...rows]);
    } else {
      onChange(rows.map((r) => (r.id === modal.values.id ? { ...r, ...modal.values, updatedAt: "2026-09-14T10:05:00Z" } : r)));
    }
    setModal(null);
  }
  function remove(row) {
    onChange(rows.filter((r) => r.id !== row.id));
  }

  const cols = [
    ...columns.map((c) => ({
      ...c,
      label: c.sortable ? (
        <button type="button" className="ee-link" style={{ color: "inherit", textTransform: "inherit", letterSpacing: "inherit", fontSize: "inherit" }} onClick={() => setSort((s) => (s && s.key === c.key ? { key: c.key, dir: s.dir === "asc" ? "desc" : "asc" } : { key: c.key, dir: "asc" }))} aria-label={`Sort by ${c.label}`}>
          {c.label} {sort?.key === c.key ? (sort.dir === "asc" ? "▲" : "▼") : ""}
        </button>
      ) : c.label,
    })),
    ...(canEdit || canDelete || extraActions
      ? [{
          key: "__actions",
          label: "",
          align: "right",
          render: (r) => (
            <span className="ee-row" style={{ gap: 6, justifyContent: "flex-end" }} onClick={(e) => e.stopPropagation()}>
              {extraActions && extraActions(r)}
              {canEdit && <Btn size="sm" variant="secondary" onClick={() => { setErrors({}); setModal({ mode: "edit", values: { ...r } }); }} aria-label={`Edit ${r.id}`}>Edit</Btn>}
              {canDelete && <Btn size="sm" variant="secondary" onClick={() => remove(r)} aria-label={`Delete ${r.id}`}>Delete</Btn>}
            </span>
          ),
        }]
      : []),
  ];

  return (
    <div data-testid={testIdPrefix}>
      <div className="ee-row ee-row--between" style={{ marginBottom: 12 }}>
        <div className="ee-row" style={{ flex: 1 }}>
          {title && <h2 style={{ fontSize: 18, marginRight: 8 }}>{title}</h2>}
          {searchKeys.length > 0 && <Input type="search" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label={`Search ${title || "records"}`} style={{ maxWidth: 260 }} />}
          {filters.map((f) => (
            <Select key={f.key} value={filterVals[f.key] || ""} onChange={(e) => setFilterVals({ ...filterVals, [f.key]: e.target.value })} aria-label={`Filter by ${f.label}`} style={{ width: "auto" }}>
              <option value="">All {f.label}</option>
              {f.options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
            </Select>
          ))}
        </div>
        <span className="ee-small ee-muted" data-testid={`${testIdPrefix}-count`}>{shown.length} of {rows.length}</span>
        {canCreate && <Btn onClick={() => { setErrors({}); setModal({ mode: "create", values: { ...defaults } }); }} data-testid={`${testIdPrefix}-create`}>+ {createLabel}</Btn>}
      </div>
      <Table cols={cols} rows={shown} rowKey={(r) => r.id} empty={emptyText} onRowClick={onRowClick} />
      <Modal open={!!modal} title={modal?.mode === "create" ? `${createLabel}` : `Edit ${modal?.values?.id || ""}`} onClose={() => setModal(null)}>
        {modal && (
          <div className="ee-stack">
            <RecordForm fields={fields} values={modal.values} onChange={(v) => setModal({ ...modal, values: v })} errors={errors} />
            <div className="ee-row ee-row--end">
              <Btn variant="secondary" onClick={() => setModal(null)}>Cancel</Btn>
              <Btn onClick={save} data-testid={`${testIdPrefix}-save`}>{modal.mode === "create" ? "Create" : "Save changes"}</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

/**
 * Kanban: columns [{id,label}], cards [{id,title,stage,...}], onMove(cardId, toStage), renderCard(card)
 * Supports HTML5 drag-and-drop and a per-card "Move to" select for reliability.
 */
export function Kanban({ columns, cards, onMove, renderCard, stageKey = "stage", testIdPrefix = "kanban", onCardClick }) {
  const [over, setOver] = useState(null);
  return (
    <div className="ee-kanban" data-testid={testIdPrefix}>
      {columns.map((col) => {
        const items = cards.filter((c) => c[stageKey] === col.id);
        return (
          <div key={col.id} className="ee-kanban__col" data-over={over === col.id ? "true" : "false"} data-testid={`${testIdPrefix}-col-${col.id}`}
            onDragOver={(e) => { e.preventDefault(); setOver(col.id); }} onDragLeave={() => setOver(null)}
            onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); setOver(null); if (id) onMove(id, col.id); }}>
            <div className="ee-kanban__head">
              <span>{col.label}</span>
              <span data-testid={`${testIdPrefix}-count-${col.id}`}>{items.length}</span>
            </div>
            {items.map((c) => (
              <div key={c.id} className="ee-kanban__card" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", c.id)} data-testid={`${testIdPrefix}-card-${c.id}`} onClick={() => onCardClick?.(c)}>
                {renderCard ? renderCard(c) : <div className="ee-strong">{c.title}</div>}
                <div className="ee-row ee-row--between ee-tiny ee-muted" style={{ marginTop: 6 }} onClick={(e) => e.stopPropagation()}>
                  <span>{c.id}</span>
                  <Select value={c[stageKey]} onChange={(e) => onMove(c.id, e.target.value)} aria-label={`Move ${c.title} to stage`} style={{ width: "auto", padding: "2px 6px", fontSize: 12 }}>
                    {columns.map((k) => <option key={k.id} value={k.id}>{k.label}</option>)}
                  </Select>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function StatusBadge({ value, map = {} }) {
  const tone = map[value] || (/(done|closed|won|paid|active|resolved|approved|complete)/i.test(value) ? "ok" : /(blocked|lost|failed|declined|overdue|breach)/i.test(value) ? "err" : /(pending|open|new|waiting|review)/i.test(value) ? "warn" : undefined);
  return <Badge tone={tone}>{value}</Badge>;
}
