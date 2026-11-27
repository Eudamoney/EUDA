"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AppHeader, Button, Icon, MenuDropdown, MenuItem } from "whitelabel-ds";
import { localePath } from "@/i18n/markets";
import { DISCORD_URL, scrollToWaitlist, scrollToId } from "./landing-utils";
import { useMarket } from "./market-context";
import { ThemeToggle } from "./theme-toggle";
import { Wordmark } from "./wordmark";

export function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const market = useMarket();
    const [stuck, setStuck] = useState(false);
    // AppHeader's mobile="menu" reads window.matchMedia while it first renders, which fails on the
    // server. Render the inline header on the server, then remount with the phone menu in the browser.
    const [inBrowser, setInBrowser] = useState(false);
    useEffect(() => setInBrowser(true), []);

    // The language switch only shows where the market has more than one language (not on eudamoney.co.uk).
    const otherLocale = market.locales.find((l) => l !== locale);
    // The Spain calculator has Spanish too: open it in the language the visitor is reading.
    const calculatorHref = `${market.taxCalculatorPath}${locale === "es" ? "?lang=es" : ""}`;

    useEffect(() => {
        const onScroll = () => setStuck(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AppHeader
            className="eu-header"
            stuck={stuck}
            logo={<Wordmark />}
            brandHref={localePath(market, locale)}
            brandLabel="EUDA"
            key={inBrowser ? "menu" : "inline"}
            mobile={inBrowser ? "menu" : "inline"}
            end={
                <nav className="eu-nav" aria-label={t("about")}>
                    <MenuDropdown
                        trigger={
                            <Button variant="ghost" size="sm" iconEnd={<Icon name="chevron-down" size={14} />}>
                                {t("tools")}
                            </Button>
                        }
                    >
                        <MenuItem
                            label={t(market.taxCalculatorLabel)}
                            icon={<Icon name="landmark" size={16} />}
                            onClick={() => (window.location.href = calculatorHref)}
                        />
                    </MenuDropdown>
                    <a className="eu-nav__link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                        {t("community")}
                    </a>
                    <a
                        className="eu-nav__link"
                        href="#about"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToId("about");
                        }}
                    >
                        {t("about")}
                    </a>
                    {otherLocale && (
                        <a className="eu-nav__link" href={localePath(market, otherLocale)} hrefLang={otherLocale}>
                            <Icon name="globe" size={16} />
                            {otherLocale.toUpperCase()}
                        </a>
                    )}
                    <Button variant="secondary" size="sm" onClick={scrollToWaitlist}>
                        {t("joinWaitlist")}
                    </Button>
                    <ThemeToggle />
                </nav>
            }
        />
    );
}
