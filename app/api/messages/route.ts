import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await auth();
    const activeUserId = (session?.user as any)?.id;

    if (!activeUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const targetUserId = searchParams.get("userId") || searchParams.get("receiverId");

    if (!targetUserId) {
      return NextResponse.json({ error: "Target userId is required" }, { status: 400 });
    }

    // Retrieve conversation history
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: activeUserId, receiverId: targetUserId },
          { senderId: targetUserId, receiverId: activeUserId }
        ]
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const activeUserId = (session?.user as any)?.id;

    if (!activeUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { receiverId, content } = body;

    if (!receiverId || !content) {
      return NextResponse.json({ error: "Missing receiverId or content" }, { status: 400 });
    }

    const newMessage = await prisma.message.create({
      data: {
        senderId: activeUserId,
        receiverId,
        content
      }
    });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
