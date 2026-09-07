import { ProductType } from "@/components/pages/products/types/product.types"
import { ProductCard } from "@/components/pages/products/ui/product-card"
import { Bike, Sparkles } from "lucide-react"

export default async function ProductsPage() {
    const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        cache: "no-store",
    })

    if (!products.ok) {
        return (
            <main className="container mx-auto px-4 pb-16 pt-28">
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
                    <p className="text-lg font-semibold text-destructive">
                        Failed to load products
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please try again in a moment.
                    </p>
                </div>
            </main>
        )
    }

    const productsData: ProductType[] = await products.json()

    return (
        <main className="container mx-auto px-4 pb-16 pt-28">
            <section className="relative mb-12 overflow-hidden rounded-3xl bg-linear-to-br from-[#0F172A] via-[#134E4A] to-[#0D9488] px-6 py-12 text-white sm:px-10 sm:py-14">
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[#5EEAD4]/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-1/4 size-48 rounded-full bg-[#67E8F9]/15 blur-3xl" />

                <div className="relative z-10 max-w-2xl">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase text-teal-100/90 backdrop-blur-sm">
                        <Sparkles className="size-3.5" />
                        Our Collection
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Electric Rides
                    </h1>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-teal-50/80 sm:text-lg">
                        Explore our lineup of sleek, sustainable e-bikes and scooters —
                        designed for urban freedom with zero compromise on style.
                    </p>
                </div>
            </section>

            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#D6F3F8] text-[#0F766E]">
                        <Bike className="size-5" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-foreground">
                            {productsData.length}{" "}
                            {productsData.length === 1 ? "model" : "models"} available
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Curated for performance and everyday comfort
                        </p>
                    </div>
                </div>
            </div>

            {productsData.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
                    <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#D6F3F8] text-[#0F766E]">
                        <Bike className="size-7" />
                    </div>
                    <p className="text-lg font-semibold">No products yet</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Check back soon — new electric rides are on the way.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {productsData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </main>
    )
}
