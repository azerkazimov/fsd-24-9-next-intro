import Image from "next/image"
import Link from "next/link"

const FOOTER_LINKS = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative mt-16 overflow-hidden bg-linear-to-br from-[#0F172A] via-[#134E4A] to-[#0D9488] text-white">
            <div className="pointer-events-none absolute -right-20 top-0 size-64 rounded-full bg-[#5EEAD4]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 left-1/3 size-56 rounded-full bg-[#67E8F9]/10 blur-3xl" />

            <div className="container relative z-10 mx-auto px-4 py-12 sm:py-14">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-sm">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={56}
                                height={56}
                                className="brightness-0 invert"
                            />
                        </Link>
                        <p className="mt-4 text-sm leading-relaxed text-teal-50/75">
                            Sustainable electric mobility for the modern city. Ride the
                            future with style, comfort, and zero emissions.
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 sm:gap-16">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                                Navigation
                            </h3>
                            <ul className="mt-4 space-y-2.5">
                                {FOOTER_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-teal-50/80 transition-colors hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                                Contact
                            </h3>
                            <ul className="mt-4 space-y-2.5 text-sm text-teal-50/80">
                                <li>hello@ev-b.com</li>
                                <li>+994 12 345 67 89</li>
                                <li>Baku, Azerbaijan</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 text-xs text-teal-100/60 sm:flex-row">
                    <p>&copy; {year} EV-B. All rights reserved.</p>
                    <p>Designed for a cleaner tomorrow.</p>
                </div>
            </div>
        </footer>
    )
}
