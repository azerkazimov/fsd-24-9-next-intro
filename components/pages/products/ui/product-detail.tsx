import Link from "next/link"
import {
    ArrowLeft,
    Battery,
    Gauge,
    Leaf,
    ShieldCheck,
    Zap,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductType } from "../types/product.types"

function formatPrice(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents / 100)
}

function formatDate(value: string | Date) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(new Date(value))
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

const HIGHLIGHTS = [
    {
        icon: Battery,
        title: "Long-range battery",
        description: "Built for extended daily commutes with efficient power delivery.",
    },
    {
        icon: Gauge,
        title: "Responsive performance",
        description: "Smooth acceleration tuned for city streets and open paths.",
    },
    {
        icon: Leaf,
        title: "Zero emissions",
        description: "A cleaner ride with no direct tailpipe pollution.",
    },
    {
        icon: ShieldCheck,
        title: "Reliable build",
        description: "Engineered with durable components for everyday confidence.",
    },
]

export function ProductDetail({ product }: { product: ProductType }) {
    const gradient = getCardGradient(product.id)

    return (
        <main className="container mx-auto px-4 pb-16 pt-28">
            <div className="mb-8">
                <Link href="/products">
                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-full border-[#B2EBF2] bg-white/60 text-[#1A4D56] hover:border-[#8ECFE0] hover:bg-[#D6F3F8]/60"
                    >
                        <ArrowLeft data-icon="inline-start" />
                        Back to products
                    </Button>
                </Link>
            </div>

            <section className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm">
                <div className="grid lg:grid-cols-2">
                    <div
                        className={`relative flex min-h-80 items-center justify-center overflow-hidden bg-linear-to-br ${gradient} lg:min-h-128`}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5),transparent_55%)]" />
                        <div className="absolute -right-10 top-10 size-40 rounded-full bg-white/20 blur-3xl" />
                        <div className="absolute -bottom-12 left-8 size-36 rounded-full bg-white/15 blur-3xl" />

                        <div className="relative flex size-28 items-center justify-center rounded-3xl bg-white/30 shadow-inner backdrop-blur-sm sm:size-32">
                            <Zap
                                className="size-14 text-[#1A4D56] drop-shadow-sm sm:size-16"
                                strokeWidth={1.75}
                            />
                        </div>

                        <Badge
                            variant="secondary"
                            className="absolute left-6 top-6 border-white/40 bg-white/70 text-[#1A4D56] backdrop-blur-sm"
                        >
                            Electric
                        </Badge>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
                            Electric Mobility
                        </p>
                        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                            {product.name}
                        </h1>

                        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                            {product.description ??
                                "Premium electric mobility built for the future."}
                        </p>

                        <div className="mt-8 flex flex-wrap items-end gap-4 border-t border-border/60 pt-8">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                    Price
                                </p>
                                <p className="mt-1 text-4xl font-bold tracking-tight text-[#0F766E]">
                                    {formatPrice(product.price)}
                                </p>
                            </div>
                            <Badge
                                variant="outline"
                                className="mb-1 border-[#B2EBF2] bg-[#D6F3F8]/40 text-[#0F766E]"
                            >
                                Available now
                            </Badge>
                        </div>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button className="h-11 rounded-full bg-linear-to-r from-[#9AE0D3] to-[#67BE9E] px-8 text-sm font-semibold text-white hover:opacity-90">
                                Pre-order
                            </Button>
                            <Button
                                variant="outline"
                                className="h-11 rounded-full border-[#B2EBF2] bg-white/60 px-8 text-[#1A4D56] hover:border-[#8ECFE0] hover:bg-[#D6F3F8]/60"
                            >
                                Contact sales
                            </Button>
                        </div>

                        <p className="mt-6 text-xs text-muted-foreground">
                            Listed on {formatDate(product.createdAt)}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mt-10">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight">
                        Why you&apos;ll love it
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Designed for comfort, efficiency, and everyday reliability.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                        <article
                            key={title}
                            className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-[#8ECFE0]/40 hover:bg-[#D6F3F8]/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#D6F3F8] text-[#0F766E]">
                                    <Icon className="size-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    )
}
