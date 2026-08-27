import { Locale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import {NextIntlClientProvider} from "next-intl"


type LocaleLayoutProps = {
    children: React.ReactNode;
    params: {
        locale: Locale;
    }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const { locale } = await params; // en | az => dynamic routing
    if (!hasLocale(routing.locales, locale)) notFound()

    setRequestLocale(locale)
    const messages = await getMessages()

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
    )
}