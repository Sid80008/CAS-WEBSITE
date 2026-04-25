import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, parentName, phone, email, grade, gender, address } = body;

    if (!studentName || !parentName || !phone || !grade) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const admission = await prisma.admission.create({
      data: {
        studentName,
        parentName,
        phone,
        email: email || "",
        grade,
        status: "PENDING",
      }
    });

    return NextResponse.json(admission);
  } catch (err: any) {
    console.error("Admission submission error:", err);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
