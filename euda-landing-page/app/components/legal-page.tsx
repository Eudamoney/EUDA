"use client";

import { useTranslations } from "next-intl";
import { Callout } from "whitelabel-ds";
import { Header } from "./header";
import { SiteFooter } from "./site-footer";

/**
 * A privacy or terms page. The copy lives in messages/*.json under legal.<page>: a title, an "updated" line
 * and sections of { heading, body }. Text in [square brackets] is a placeholder for EUDA (or its legal
 * adviser) to fill in; the draft notice at the top stays until the wording is final.
 */
export function LegalPage({ page }: { page: "privacy" | "terms" }) {
    const t = useTranslations("legal");
    const sections = t.raw(`${page}.sections`) as { heading: string; body: string[] }[];

    return (
        <div className="eu-page">
            <Header />
            <main className="eu-wrap eu-legal">
                <h1 className="eu-h2">{t(`${page}.title`)}</h1>
                <p className="eu-legal__updated">{t(`${page}.updated`)}</p>
                <Callout title={t("draftTitle")}>{t("draftBody")}</Callout>
                {sections.map((s) => (
                    <section key={s.heading} className="eu-legal__section">
                        <h2 className="eu-legal__heading">{s.heading}</h2>
                        {s.body.map((p, i) => (
                            <p key={i} className="eu-body">
                                {p}
                            </p>
                        ))}
                    </section>
                ))}
            </main>
            <SiteFooter />
        </div>
    );
}
