import Link from "next/link"
import { Package, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { prisma } from "@/prisma/prisma-client"

export default async function AdminPage() {
    const [productCount, userCount] = await Promise.all([
        prisma.product.count(),
        prisma.user.count(),
    ])

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-[#546E7A]">
                    Overview of your store and user activity.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-white/40 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="size-4" />
                            Products
                        </CardTitle>
                        <CardDescription>Total items in catalog</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-end justify-between gap-4">
                        <p className="text-4xl font-bold text-[#1A1A1A]">
                            {productCount}
                        </p>
                        <Link href="/admin/product">
                            <Button variant="outline" size="sm">
                                Manage
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-white/40 bg-white/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="size-4" />
                            Users
                        </CardTitle>
                        <CardDescription>Registered accounts</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-end justify-between gap-4">
                        <p className="text-4xl font-bold text-[#1A1A1A]">
                            {userCount}
                        </p>
                        <Link href="/admin/users">
                            <Button variant="outline" size="sm">
                                View all
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
