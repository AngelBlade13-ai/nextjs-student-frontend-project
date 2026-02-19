import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  const collection = await getCollection();
  const student = await collection.findOne({ _id: new ObjectId(id) } as never);
  if (!student) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  return NextResponse.json({ ...student, _id: id });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const payload = await request.json();
  if (!isValidStudentInput(payload)) {
    return NextResponse.json({ message: "Invalid student payload." }, { status: 400 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  const collection = await getCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) } as never, { $set: payload });
  if (!result.matchedCount) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  return NextResponse.json({ _id: id, ...payload });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) } as never);
  if (!result.deletedCount) {
    return NextResponse.json({ message: "Student not found." }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
