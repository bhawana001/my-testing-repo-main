"use client";
// Form wizard engine: multi-step forms with per-step validation, branching,
// review and a result screen. Values persist in the flow state slice.
import { useState } from "react";
import { Alert, Btn, Card, Check, Field, Input, KV, RadioCard, Select, Stepper, Textarea, useDelay } from "../eval/ui";

/**
 * steps: [{ id, title, fields?: [{name,label,type,required,options,placeholder,help,validate(v, values)}], render?(ctx), next?(values) -> stepId|null, summary?: bool }]
 * wizard state: { step: number, values: {}, done: null | result }
 */
export const SEED_WIZARD = { step: 0, values: {}, done: null, history: [] };

export function validateFields(fields = [], values) {
  const errors = {};
  for (const f of fields) {
    const v = values[f.name];
    const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0) || v === false && f.type === "checkbox" && f.required;
    if (f.required && empty) errors[f.name] = f.requiredMessage || `${f.label} is required.`;
    else if (!empty && f.validate) {
      const msg = f.validate(v, values);
      if (msg) errors[f.name] = msg;
    }
  }
  return errors;
}

export function FieldRenderer({ field, value, onChange, error }) {
  const id = `wf-${field.name}`;
  const common = { id, value: value ?? "", onChange: (e) => onChange(e.target.value), placeholder: field.placeholder, invalid: !!error };
  if (field.type === "radio-cards") {
    return (
      <Field label={field.label} help={field.help} error={error}>
        <div className="ee-stack" role="radiogroup" aria-label={field.label}>
          {field.options.map((o) => (
            <RadioCard key={o.value} name={field.name} value={o.value} checked={value === o.value} onChange={onChange} title={o.label} desc={o.desc} right={o.right} />
          ))}
        </div>
      </Field>
    );
  }
  if (field.type === "checkbox") {
    return (
      <Field error={error}>
        <Check label={field.label} checked={!!value} onChange={(e) => onChange(e.target.checked)} id={id} />
      </Field>
    );
  }
  if (field.type === "select") {
    return (
      <Field label={field.label} help={field.help} error={error} htmlFor={id}>
        <Select {...common}>
          <option value="">{field.placeholder || "Select…"}</option>
          {field.options.map((o) => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
        </Select>
      </Field>
    );
  }
  if (field.type === "textarea") {
    return (
      <Field label={field.label} help={field.help} error={error} htmlFor={id}>
        <Textarea {...common} />
      </Field>
    );
  }
  return (
    <Field label={field.label} help={field.help} error={error} htmlFor={id}>
      <Input {...common} type={field.type || "text"} inputMode={field.inputMode} />
    </Field>
  );
}

export function Wizard({ state, setState, steps, onSubmit, submitLabel = "Submit", title, result, testIdPrefix = "wizard", showStepper = true, ctxExtra }) {
  const delay = useDelay();
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const stepIdx = Math.min(state.step, steps.length - 1);
  const step = steps[stepIdx];
  const values = state.values;

  function setValue(name, v) {
    setState((s) => ({ ...s, values: { ...s.values, [name]: v } }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }
  function goTo(idx) {
    setState((s) => ({ ...s, step: idx, history: [...(s.history || []), stepIdx] }));
  }
  async function next() {
    const errs = validateFields(step.fields, values);
    const custom = step.validate ? step.validate(values) : null;
    if (custom) Object.assign(errs, custom);
    setErrors(errs);
    if (Object.keys(errs).some((k) => errs[k])) return;
    if (stepIdx === steps.length - 1) {
      setBusy(true);
      await delay(600);
      const res = await onSubmit(values);
      setBusy(false);
      setState((s) => ({ ...s, done: res }));
      return;
    }
    const nextId = step.next ? step.next(values) : null;
    const nextIdx = nextId ? steps.findIndex((s) => s.id === nextId) : stepIdx + 1;
    goTo(nextIdx);
  }
  function back() {
    const h = [...(state.history || [])];
    const prev = h.pop();
    setState((s) => ({ ...s, step: prev ?? Math.max(0, stepIdx - 1), history: h }));
  }

  if (state.done) {
    return result ? result(state.done, values) : (
      <Card data-testid={`${testIdPrefix}-result`}>
        <div className="ee-badge ee-badge--ok">Submitted</div>
        <h2 style={{ margin: "10px 0 6px" }}>{state.done.title || "Done"}</h2>
        <p className="ee-muted">{state.done.message}</p>
        {state.done.reference && <div className="ee-mono ee-strong" style={{ marginTop: 10 }} data-testid={`${testIdPrefix}-reference`}>{state.done.reference}</div>}
      </Card>
    );
  }

  const ctx = { values, setValue, errors, ...ctxExtra };
  return (
    <Card data-testid={`${testIdPrefix}-step-${step.id}`}>
      {title && <h2 style={{ fontSize: 20, marginBottom: 12 }}>{title}</h2>}
      {showStepper && <Stepper steps={steps.map((s) => s.title)} current={stepIdx} />}
      <h3 style={{ fontSize: 17, marginBottom: 4 }}>{step.heading || step.title}</h3>
      {step.description && <p className="ee-small ee-muted" style={{ marginBottom: 12 }}>{step.description}</p>}
      <div className="ee-stack" style={{ marginTop: 12 }}>
        {step.render && step.render(ctx)}
        {(step.fields || []).filter((f) => !f.when || f.when(values)).map((f) => (
          <FieldRenderer key={f.name} field={f} value={values[f.name]} onChange={(v) => setValue(f.name, v)} error={errors[f.name]} />
        ))}
        {step.summary && (
          <div data-testid={`${testIdPrefix}-review`}>
            {steps.filter((s) => s.fields).flatMap((s) => s.fields).filter((f) => values[f.name] !== undefined && values[f.name] !== "" && (!f.when || f.when(values))).map((f) => {
              const v = values[f.name];
              const label = f.options ? (f.options.find((o) => (o.value ?? o) === v)?.label ?? v) : typeof v === "boolean" ? (v ? "Yes" : "No") : v;
              return <KV key={f.name} k={f.label} v={String(label)} testId={`review-${f.name}`} />;
            })}
          </div>
        )}
        {errors._form && <Alert tone="err">{errors._form}</Alert>}
      </div>
      <div className="ee-row ee-row--between" style={{ marginTop: 18 }}>
        {stepIdx > 0 ? <Btn variant="secondary" onClick={back} data-testid={`${testIdPrefix}-back`}>Back</Btn> : <span />}
        <Btn onClick={next} loading={busy} data-testid={`${testIdPrefix}-next`}>
          {stepIdx === steps.length - 1 ? submitLabel : step.nextLabel || "Continue"}
        </Btn>
      </div>
    </Card>
  );
}
