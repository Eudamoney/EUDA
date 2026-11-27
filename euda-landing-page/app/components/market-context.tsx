"use client";

import { createContext, useContext } from "react";
import { MARKETS, type Market } from "@/i18n/markets";

const MarketContext = createContext<Market>(MARKETS.es);

/** Makes the request's market (from its domain, worked out in the layout) available to client components. */
export function MarketProvider({ market, children }: { market: Market; children: React.ReactNode }) {
    return <MarketContext.Provider value={market}>{children}</MarketContext.Provider>;
}

export function useMarket() {
    return useContext(MarketContext);
}
