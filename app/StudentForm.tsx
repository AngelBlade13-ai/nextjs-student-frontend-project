import { useState } from "react";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

interface StudentFormProps {
  student: Student | null;
  onSubmit: (student: Omit<Student, "_id">, id?: string) => void;
}

const initialFormState = (student: Student | null): Omit<Student, "_id"> => {
  if (!student) {
    return { firstName: "", lastName: "", email: "", age: 0, currentCollege: "" };
  }

  return {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    age: student.age,
    currentCollege: student.currentCollege,
  };
};

const StudentForm = ({ student, onSubmit }: StudentFormProps) => {
  const [formState, setFormState] = useState<Omit<Student, "_id">>(() => initialFormState(student));

  const handleChange = (field: keyof Omit<Student, "_id">, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: field === "age" ? Number(value) : value }));
  };

  const handleSubmit = () => {
    onSubmit(formState, student?._id);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{student ? "Update Student" : "Add New Student"}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input type="text" placeholder="First Name" value={formState.firstName} onChange={(e) => handleChange("firstName", e.target.value)} className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 rounded-lg w-full text-black" />
        <input type="text" placeholder="Last Name" value={formState.lastName} onChange={(e) => handleChange("lastName", e.target.value)} className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 rounded-lg w-full text-black" />
        <input type="text" placeholder="Email" value={formState.email} onChange={(e) => handleChange("email", e.target.value)} className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 rounded-lg w-full text-black" />
        <input type="number" placeholder="Age" value={formState.age} onChange={(e) => handleChange("age", e.target.value)} className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 rounded-lg w-full text-black" />
        <input type="text" placeholder="Current College" value={formState.currentCollege} onChange={(e) => handleChange("currentCollege", e.target.value)} className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 rounded-lg w-full text-black sm:col-span-2" />
      </div>
      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm" onClick={handleSubmit} type="button">
        {student ? "Update Student" : "Add New Student"}
      </button>
    </div>
  );
};

export default StudentForm;
