const API_URL = (process.env.NEXT_PUBLIC_STUDENTS_API_URL || "/api/students").replace(/\/$/, "");

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(API_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch students");
  return response.json();
}

async function deleteStudent(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete student");
}

async function submitStudent(studentData: Omit<Student, "_id">, id?: string): Promise<void> {
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) throw new Error("Failed to submit student");
}

export { fetchStudents, deleteStudent, submitStudent };
export type { Student };
