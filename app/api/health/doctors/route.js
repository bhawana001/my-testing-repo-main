// Doctors listing — Use case #4 (schema / field validation).
// GET /api/health/doctors[?specialty=Dermatologist]
const DOCTORS = [
  { id: "doc_101", name: "Dr. Aastha Jain", specialty: "Gynecologist", fee: 649, rating: 4.8, experience: 8, verified: true },
  { id: "doc_102", name: "Dr. Shalabh Singla", specialty: "Dermatologist", fee: 799, rating: 4.7, experience: 9, verified: true },
  { id: "doc_103", name: "Dr. Hitesh Viradiya", specialty: "Dermatologist", fee: 799, rating: 4.9, experience: 11, verified: true },
  { id: "doc_104", name: "Dr. Rakesh Menon", specialty: "General Physician", fee: 499, rating: 4.6, experience: 12, verified: true },
  { id: "doc_105", name: "Dr. Simoni Sarodia", specialty: "Psychiatrist", fee: 899, rating: 4.8, experience: 13, verified: true },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty");

  let doctors = DOCTORS;
  if (specialty) {
    doctors = DOCTORS.filter(
      (d) => d.specialty.toLowerCase() === specialty.toLowerCase()
    );
  }

  return Response.json(
    { ok: true, count: doctors.length, doctors },
    { status: 200 }
  );
}
