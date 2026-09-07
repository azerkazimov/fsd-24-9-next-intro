"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const navItems = [
    {
        label: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        label: "Users",
        href: "/admin/users",
        icon: Users,
    },
] as const

export function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="flex w-64 shrink-0 flex-col border-r border-white/30 bg-white/40 backdrop-blur-md">

            {/* Sidebar header */}
            <div className="px-6 py-6">
                <Link href="/admin" className="block">
                    <p className="text-xs font-medium tracking-[0.25em] text-[#546E7A] uppercase">
                        EV-b
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-[#1A1A1A]">
                        Admin
                    </h2>
                </Link>
            </div>

            <Separator className="bg-white/40" />

            {/* Admin navigation */}
            <nav className="flex flex-1 flex-col gap-1 p-4">
                {navItems.map(({ label, href, icon: Icon, ...item }) => {
                    const exact = "exact" in item && item.exact
                    const isActive = exact
                        ? pathname === href
                        : pathname === href || pathname.startsWith(`${href}/`)

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-linear-to-r from-[#A7FFEB]/80 to-[#64FFDA]/60 text-[#1A1A1A] shadow-sm"
                                    : "text-[#546E7A] hover:bg-white/50 hover:text-[#1A1A1A]"
                            )}
                        >
                            <Icon className="size-4 shrink-0" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            {/* Sidebar footer */}
            <div className="border-t border-white/30 p-4">
                <Link
                    href="/"
                    className="flex items-center justify-center rounded-xl border border-white/50 bg-white/30 px-3 py-2 text-sm font-medium text-[#546E7A] transition-colors hover:bg-white/50 hover:text-[#1A1A1A]"
                >
                    Back to site
                </Link>
            </div>
        </aside>
    )
}
