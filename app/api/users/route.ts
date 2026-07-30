import { prisma } from "@/prisma/prisma-client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot get users" }, { status: 500 });
    }
}

export async function POST(request: NextRequest){
    try {
        const body = await request.json();

        const { name, email, password } = body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const { password: _, ...safeUser } = user;
        return NextResponse.json(safeUser, { status: 201 });
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot create user" }, { status: 500 });
    }

}