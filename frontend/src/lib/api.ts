export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export async function getReport(type: string) {
  const res = await fetch(`${API_URL}/api/reports/${type}`);
  if (!res.ok) throw new Error("Failed to fetch report");
  return res.json();
}

