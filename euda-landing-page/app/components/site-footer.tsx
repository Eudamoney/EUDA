"use client";

import { useLocale, useTranslations } from "next-intl";
import { AppFooter } from "whitelabel-ds";
import { localePath } from "@/i18n/markets";
import { useMarket } from "./market-context";
import { Wordmark } from "./wordmark";

/** Footer shared by the landing page and the legal pages. */
export function SiteFooter() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const market = useMarket();

    return (
        <AppFooter
            className="eu-footer"
            brand={<Wordmark title="EUDA" />}
            linksLabel={t("legalLinks")}
            links={
                <>
                    <a className="ds-app-footer-v2__link" href={localePath(market, locale, "/terms")}>
                        {t("terms")}
                    </a>
                    <a className="ds-app-footer-v2__link" href={localePath(market, locale, "/privacy")}>
                        {t("privacy")}
                    </a>
                    <a className="ds-app-footer-v2__link" href="mailto:hello@euda.dev">
                        {t("contact")}
                    </a>
                </>
            }
            legal={t("copyright")}
        />
    );
}
