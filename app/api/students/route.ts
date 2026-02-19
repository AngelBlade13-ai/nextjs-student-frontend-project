import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import type { WithId } from "mongodb";

interface StudentInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

function isValidStudentInput(value: unknown): value is StudentInput {
  if (!value || typeof value !== "object") return false;
  const input = value as Record<string, unknown>;
  return (
    typeof input.firstName === "string" &&
    typeof input.lastName === "string" &&
    typeof input.email === "string" &&
    typeof input.age === "number" &&
    typeof input.currentCollege === "string"
  );
}

async function getCollection() {
  const client = await clientPromise;
  const dbName = process.env.MONGODB_DB || "student_api";
  const collectionName = process.env.MONGODB_COLLECTION || "students";
  return client.db(dbName).collection<StudentInput>(collectionName);
}

export async function GET() {
  const collection = await getCollection();
  const students = (await collection.find().toArray()) as WithId<StudentInput>[];
  return NextResponse.json(students.map((s) => ({ ...s, _id: s._id.toString() })));
}

export async function POST(request: Request) {
  const payload = await request.json();
  if (!isValidStudentInput(payload)) {
    return NextResponse.json({ message: "Invalid student payload." }, { status: 400 });
  }

  const collection = await getCollection();
  const result = await collection.insertOne(payload);
  return NextResponse.json({ _id: result.insertedId.toString(), ...payload }, { status: 201 });
}
