import { prisma } from "@/lib/prismaDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);
    const { name, email, password } = body;
    if (!name || !email || !password) {
        return NextResponse.json("Missing Fields", { status: 400 });
      }
    
      const exist = await prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });
    
      if (exist) {
        return NextResponse.json("User already exists!", { status: 500 });
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
    
      await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
        },
      });
    
      return NextResponse.json("User created successfully!", { status: 200 });
    }
