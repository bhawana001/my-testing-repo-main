import Link from "next/link";

// Small fixed pill dropped onto every clone (via each clone's layout) so a
// visitor can jump back to the Real Evals clone list. Position:fixed keeps it
// out of the clone's layout flow; the clones themselves are untouched.
export default function BackToEvals() {
  return (
    <Link
      href="/"
      title="Take me back to the clone list"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        zIndex: 2147483000,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        color: "#fff",
        textDecoration: "none",
        background:
          "linear-gradient(135deg, #ff5b6e 0%, #ff9a5a 45%, #b98cf0 100%)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.28)",
        border: "1px solid rgba(255,255,255,0.55)",
        backdropFilter: "blur(4px)",
        lineHeight: 1,
        letterSpacing: "0.01em",
      }}
    >
      ← Clone list
    </Link>
  );
}
