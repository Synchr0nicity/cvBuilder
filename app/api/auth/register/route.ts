import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = String(body.email ?? "")
      .toLowerCase()
      .trim();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");

    if (!email || password || !confirmPassword) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return Response.json(
        { error: "Passwords do not match" },
        { status: 400 },
      );
    }

    if (password.length < 12) {
      return Response.json(
        { error: "Password must be at least 12 characters" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return Response.json(
        {
          error: "User already exists",
        },
        { status: 409 },
      );
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name: username || null, passwordHash },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    return Response.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: `Something went wrong: ${error}` },
      { status: 500 },
    );
  }
}
