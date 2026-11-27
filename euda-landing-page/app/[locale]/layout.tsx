import type { Metadata } from "next";
import Script from "next/script";
import { headers } from "next/headers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MARKETS, localePath, marketForHost, type Locale } from '@/i18n/markets';
import { DEFAULT_THEME, PALETTE, THEME_BOOT_SCRIPT } from "../components/landing-utils";
import { MarketProvider } from "../components/market-context";
import "whitelabel-ds/styles.css";
import "../theme-light.css";
import "../theme-dark.css";
import "../palette-navy-cream.css";
import "../globals.css";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

async function currentMarket() {
    return marketForHost((await headers()).get("host"));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const market = await currentMarket();
    const t = await getTranslations({ locale, namespace: "meta" });
    const es = MARKETS.es;
    return {
        metadataBase: new URL(`https://${market.domain}`),
        title: t("title"),
        description: t("description"),
        // Tell search engines the Spanish, English (Spain) and UK sites are versions of each other.
        alternates: {
            canonical: localePath(market, locale),
            languages: {
                "es-ES": `https://${es.domain}${localePath(es, "es")}`,
                en: `https://${es.domain}${localePath(es, "en")}`,
                "en-GB": `https://${MARKETS.uk.domain}/`,
            },
        },
        icons: {
            icon: [
                { url: "/favicon.svg", type: "image/svg+xml" },
                { url: "/favicon.png", type: "image/png" },
            ],
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;
    const market = await currentMarket();

    // Each market only offers its own languages (eudamoney.co.uk has no Spanish).
    if (!market.locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        // data-ds-v2 opts the page into the design system's styles. The library sets it on the client,
        // but setting it here too means the server-rendered HTML is styled before hydration.
        // The boot script can change data-theme (a saved choice) and add data-motion before React loads,
        // so <html> is allowed to differ from the server render.
        // data-home is this market's home page in this language: links back to home sections use it.
        <html
            lang={locale}
            data-ds-v2=""
            data-theme={DEFAULT_THEME}
            data-palette={PALETTE}
            data-market={market.id}
            data-home={localePath(market, locale)}
            suppressHydrationWarning
        >
            <head>
                <Script id="theme-boot" strategy="beforeInteractive">
                    {THEME_BOOT_SCRIPT}
                </Script>
            </head>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <MarketProvider market={market}>{children}</MarketProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
