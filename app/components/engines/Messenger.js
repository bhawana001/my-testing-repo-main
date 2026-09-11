"use client";
// Floating customer messenger panel used by the Intercomm skins.
export function MessengerFrame({ open, onToggle, title = "Acme Cloud", subtitle = "The team typically replies in a few minutes", children, testId = "messenger" }) {
  return (
    <div style={{ position: "fixed", right: 20, bottom: 20, zIndex: 60, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
      {open && (
        <div className="ee-card" style={{ width: "min(380px, calc(100vw - 40px))", padding: 0, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,.25)" }} data-testid={testId}>
          <div style={{ background: "var(--ee-accent)", color: "#fff", padding: "14px 16px" }}>
            <div className="ee-strong">{title}</div>
            <div className="ee-tiny" style={{ opacity: 0.85 }}>{subtitle}</div>
          </div>
          <div style={{ padding: 14, maxHeight: "60vh", overflow: "auto" }} className="ee-stack">{children}</div>
        </div>
      )}
      <button type="button" onClick={onToggle} aria-label={open ? "Close messenger" : "Open messenger"} data-testid={`${testId}-launcher`} style={{ width: 56, height: 56, borderRadius: "50%", border: 0, background: "var(--ee-accent)", color: "#fff", fontSize: 24, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,.3)" }}>{open ? "✕" : "💬"}</button>
    </div>
  );
}
export function Bubble({ me, children, testId }) {
  return <div style={{ display: "flex", justifyContent: me ? "flex-end" : "flex-start" }} data-testid={testId}><div className={"ee-bubble" + (me ? " ee-bubble--me" : "")}>{children}</div></div>;
}
