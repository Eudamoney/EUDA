/**
 * Markets are separate from languages. The domain decides the market:
 *   eudamoney.com    → Spain: Spanish at /, English at /en, €, Spain tax calculator
 *   eudamoney.co.uk  → UK: English only, £, UK tax calculator
 * Every other host (localhost, Vercel preview URLs) is Spain. To preview the UK site locally,
 * open http://uk.localhost:3001 (browsers send *.localhost to this machine).
 */
export type Locale = "en" | "es";
export type MarketId = "es" | "uk";

export interface Market {
    id: MarketId;
    domain: string;
    /** Served without a prefix (/); the other languages get /en etc. */
    defaultLocale: Locale;
    locales: Locale[];
    currency: "EUR" | "GBP";
    taxCalculatorPath: string;
    /** Key in messages nav.* for the Tools menu item. */
    taxCalculatorLabel: "taxCalculatorSpain" | "taxCalculatorUk";
}

export const MARKETS: Record<MarketId, Market> = {
    es: {
        id: "es",
        domain: "eudamoney.com",
        defaultLocale: "es",
        locales: ["es", "en"],
        currency: "EUR",
        taxCalculatorPath: "/tax-calculator/spain",
        taxCalculatorLabel: "taxCalculatorSpain",
    },
    uk: {
        id: "uk",
        domain: "eudamoney.co.uk",
        defaultLocale: "en",
        locales: ["en"],
        currency: "GBP",
        taxCalculatorPath: "/tax-calculator/uk",
        taxCalculatorLabel: "taxCalculatorUk",
    },
};

export function marketForHost(host: string | null | undefined): Market {
    const name = (host ?? "").split(":")[0].toLowerCase();
    const uk = name === "eudamoney.co.uk" || name.endsWith(".eudamoney.co.uk") || name === "uk.localhost";
    return uk ? MARKETS.uk : MARKETS.es;
}

/** A path on the current market's site in a given language, e.g. ("/privacy", "en") → "/en/privacy" on eudamoney.com. */
export function localePath(market: Market, locale: string, path = "/"): string {
    const rest = path === "/" ? "" : path;
    if (locale === market.defaultLocale) return rest || "/";
    return `/${locale}${rest}`;
}
