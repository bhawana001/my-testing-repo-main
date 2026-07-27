// Book a consultation — Use cases #3 (seed-then-verify), #8 (curl), #11 (E2E).
// Also drives the "Consult with a Doctor" UI modal.
// POST /api/health/consult  body: { symptom, phone, doctorId? }
// Valid -> 201 with a booking; invalid input -> 400.
const SPECIALTY_MAP = [
  { kw: ["fever", "cold", "cough", "flu"], spec: "General Physician" },
  { kw: ["skin", "acne", "pimple", "rash"], spec: "Dermatologist" },
  { kw: ["pregnan", "period", "menstru"], spec: "Gynecologist" },
  { kw: ["child", "baby", "kid"], spec: "Pediatrician" },
  { kw: ["depress", "anxiety", "stress", "sleep"], spec: "Psychiatrist" },
  { kw: ["performance", "bed", "erectile", "libido"], spec: "Sexologist" },
  { kw: ["teeth", "tooth", "dental", "gum"], spec: "Dentist" },
];

function matchSpecialty(symptom) {
  const s = (symptom || "").toLowerCase();
  for (const m of SPECIALTY_MAP) {
    if (m.kw.some((k) => s.includes(k))) return m.spec;
  }
  return "General Physician";
}

export async function POST(request) {
  let body = {};
  try {
    body = await request.json();
  } catch {
    // fall through to validation
  }

  const { symptom, phone } = body;

  const errors = [];
  if (typeof symptom !== "string" || symptom.trim().length < 4) {
    errors.push("symptom must be at least 4 characters");
  }
  if (typeof phone !== "string" || !/^\d{10}$/.test(phone.trim())) {
    errors.push("phone must be a valid 10-digit number");
  }
  if (errors.length) {
    return Response.json({ ok: false, error: errors.join("; ") }, { status: 400 });
  }

  const consultId = "csl_" + Math.random().toString(36).slice(2, 10);
  return Response.json(
    {
      ok: true,
      consultId,
      status: "booked",
      symptom: symptom.trim(),
      specialty: matchSpecialty(symptom),
      otpSent: true,
      createdAt: new Date().toISOString(),
    },
    { status: 201 }
  );
}
