import { ProductManager } from "@/components/base/admin/products/product-manager"
import { prisma } from "@/prisma/prisma-client"

export default async function AdminProductPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    })

    return <ProductManager initialProducts={products} />
}
