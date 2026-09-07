// /api/product/[id]
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// GET a single product by id
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot get product" }, { status: 500 });
    }
}