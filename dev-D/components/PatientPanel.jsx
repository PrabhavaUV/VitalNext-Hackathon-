export default function PatientPanel({ patient }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4">
      <h2 className="text-gray-400 text-sm mb-2">Patient Info</h2>
      <p className="text-white font-bold text-lg">{patient?.name ?? "—"}</p>
      <p className="text-gray-400 text-sm">Age: {patient?.age ?? "—"}</p>
      <p className="text-gray-400 text-sm">Ward: {patient?.ward ?? "—"}</p>
    </div>
  );
}
