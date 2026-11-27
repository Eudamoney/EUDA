import { defineRouting } from 'next-intl/routing';
import type { Market } from './markets';

/** Every language the site has. Which ones a visitor can reach depends on the market (see markets.ts). */
export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localePrefix: 'as-needed'
});

/**
 * Routing for one market: its default language is served at /, the others under /en etc.
 * Language is never guessed from the browser, so an ad decides the language a visitor lands in
 * (Spanish ads → eudamoney.com, English ads → eudamoney.com/en) and the test results stay clean.
 */
export function marketRouting(market: Market) {
    return defineRouting({
        locales: market.locales,
        defaultLocale: market.defaultLocale,
        localePrefix: 'as-needed',
        localeDetection: false,
    });
}
