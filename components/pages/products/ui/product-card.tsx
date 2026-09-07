import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductType } from "../types/product.types"

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents / 100)
}

const CARD_GRADIENTS = [
    "from-[#D6F3F8] via-[#A8E6F0] to-[#8ECFE0]",
    "from-[#C8F7E4] via-[#9AE0D3] to-[#67BE9E]",
    "from-[#E0F7FA] via-[#B2EBF2] to-[#80DEEA]",
    "from-[#E8F5E9] via-[#A5D6A7] to-[#66BB6A]",
    "from-[#F1F8E9] via-[#C5E1A5] to-[#9CCC65]",
]

function getCardGradient(id: string) {
    const index =
        id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0) %
        CARD_GRADIENTS.length
    return CARD_GRADIENTS[index]
}

export function ProductCard({ product }: { product: ProductType }) {
    const gradient = getCardGradient(product.id)

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8ECFE0]/40 hover:shadow-[0_20px_40px_-24px_rgba(14,116,144,0.45)]">
            <div
                className={`relative flex h-52 items-center justify-center overflow-hidden bg-linear-to-br ${gradient}`}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_55%)]" />
                <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/20 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                <div className="absolute -bottom-10 -left-6 size-28 rounded-full bg-white/15 blur-2xl" />

                <div className="relative flex size-20 items-center justify-center rounded-2xl bg-white/30 shadow-inner backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                    <Zap className="size-9 text-[#1A4D56] drop-shadow-sm" strokeWidth={1.75} />
                </div>

                <Badge
                    variant="secondary"
                    className="absolute left-4 top-4 border-white/40 bg-white/70 text-[#1A4D56] backdrop-blur-sm"
                >
                    Electric
                </Badge>
            </div>

            <div className="flex flex-1 flex-col p-5">
                <div className="space-y-2">
                    <h2 className="line-clamp-1 text-lg font-semibold tracking-tight">
                        {product.name}
                    </h2>
                    <p className="line-clamp-2 min-h-10 text-sm leading-relaxed text-muted-foreground">
                        {product.description ?? "Premium electric mobility built for the future."}
                    </p>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/60 pt-5">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            From
                        </p>
                        <p className="text-2xl font-bold tracking-tight text-[#0F766E]">
                            {formatPrice(product.price)}
                        </p>
                    </div>

                    <Link href={`/products/${product.id}`}>
                        <Button
                            variant="outline"
                            className="shrink-0 rounded-full border-[#B2EBF2] bg-white/60 px-4 text-[#1A4D56] hover:border-[#8ECFE0] hover:bg-[#D6F3F8]/60"
                        >
                            View
                            <ArrowRight data-icon="inline-end" />
                        </Button>
                    </Link>
                </div>
            </div>
        </article>
    )
}
