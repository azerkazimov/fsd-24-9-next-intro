
import { ProductType } from "@/components/pages/products/types/product.types"
import { ProductDetail } from "@/components/pages/products/ui/product-detail"
import { notFound } from "next/navigation"

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/${id}`,
        { cache: "no-store" },
    )

    if (!response.ok) {
        notFound()
    }

    const product: ProductType = await response.json()

    if (!product?.id) {
        notFound()
    }

    return (
        <>
            <ProductDetail product={product} />

        </>
    )
}
