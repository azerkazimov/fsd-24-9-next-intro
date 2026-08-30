// /api/product
import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// GET all products or a single product by id
export async function GET(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (id) {
            const product = await prisma.product.findUnique({ where: { id } });
            if (!product) {
                return NextResponse.json({ error: "Product not found" }, { status: 404 });
            }
            return NextResponse.json(product, { status: 200 });
        }

        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot get products" }, { status: 500 });
    }
}

// Create a new product
export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const product = await prisma.product.create({ data: body });
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot create product" }, { status: 500 });
    }
}

// Update a product
export async function PUT(request: NextRequest){
    try {
        const body = await request.json();
        const { id, ...data } = body;
        const product = await prisma.product.update({ where: { id }, data });
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot update product" }, { status: 500 });
    }
}

// Delete a product
export async function DELETE(request: NextRequest){
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const product = await prisma.product.delete({ where: { id: id! } });
        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Cannot delete product" }, { status: 500 });
    }
}