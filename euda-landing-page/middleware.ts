import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { MARKETS, marketForHost } from './i18n/markets';
import { marketRouting } from './i18n/routing';

// One next-intl handler per market: the request's domain picks which (see i18n/markets.ts).
const handlers = {
    es: createMiddleware(marketRouting(MARKETS.es)),
    uk: createMiddleware(marketRouting(MARKETS.uk)),
};

export default function middleware(request: NextRequest) {
    return handlers[marketForHost(request.headers.get('host')).id](request);
}

export const config = {
    // Match all pathnames except for API routes, static files, and tax calculator rewrites
    matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|_vercel|tax-calculator|.*\\..*).*)']
};
