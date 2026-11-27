"use client";

import { CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, Icon, Tag } from "whitelabel-ds";
import { useMarket } from "./market-context";

/** The example Rent Pot figure the first card ends on. */
const POT_EXAMPLE = 100;

const STEPS = [
    { key: "step1", icon: "landmark" },
    { key: "step2", icon: "zap" },
    { key: "step3", icon: "users" },
] as const;

const BENEFITS = [
    { key: "unlockScore", icon: "gauge" },
    { key: "unlock1", icon: "file-check" },
    { key: "unlock2", icon: "key-round" },
    { key: "unlock3", icon: "scale" },
] as const;

const order = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * How it works: what you do and what you save (steps on a line that draws in, ending on an example
 * Rent Pot figure), beside what you get beyond money (benefits that land one by one).
 */
export function HowItWorks() {
    const t = useTranslations();
    const locale = useLocale();
    const market = useMarket();
    // €100 on the Spanish site, £100 on the UK site.
    const money = new Intl.NumberFormat(locale, { style: "currency", currency: market.currency, maximumFractionDigits: 0 });

    return (
        <section id="how-it-works" className="eu-section eu-journey-section">
            <div className="eu-wrap">
                <header className="eu-journey__head eu-reveal">
                    <span className="eu-eyebrow">{t("journey.eyebrow")}</span>
                    <h2 className="eu-h2">{t("howItWorks.title")}</h2>
                </header>

                <div className="eu-journey">
                    {/* What you do, and what you save */}
                    <Card className="eu-phase eu-reveal" as="section">
                        <h3 className="eu-phase__title">{t("journey.phase1Title")}</h3>
                        <ol className="eu-steps" role="list">
                            {STEPS.map((s, i) => (
                                <li key={s.key} className="eu-step" style={order(i)}>
                                    <span className="eu-step__icon" aria-hidden="true">
                                        <Icon name={s.icon} size={18} />
                                    </span>
                                    <div>
                                        <h4 className="eu-step__title">{t(`journey.${s.key}Title`)}</h4>
                                        <p className="eu-step__body">{t(`journey.${s.key}Body`)}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                        <p className="eu-milestone">
                            <span className="eu-milestone__value">
                                {money.format(POT_EXAMPLE)}
                                <a className="eu-asterisk" href="#amounts-note" aria-label={t("journey.noteLink")}>
                                    *
                                </a>
                            </span>
                            <span className="eu-milestone__label">{t("journey.phase1Milestone")}</span>
                        </p>
                    </Card>

                    {/* What you get beyond money */}
                    <Card className="eu-phase eu-phase--two eu-reveal" as="section">
                        <div className="eu-phase__top">
                            <h3 className="eu-phase__title">{t("journey.phase2Title")}</h3>
                            <p className="eu-step__body">{t("journey.phase2Body")}</p>
                        </div>
                        <ul className="eu-unlocks__list" role="list">
                            {BENEFITS.map((b, i) => (
                                <li key={b.key} className="eu-unlock" style={order(i)}>
                                    <span className="eu-step__icon" aria-hidden="true">
                                        <Icon name={b.icon} size={18} />
                                    </span>
                                    {t(`journey.${b.key}`)}
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                <div className="eu-journey__foot eu-reveal">
                    <ul className="eu-tags" role="list">
                        {(["noFees", "noCatches", "landlord"] as const).map((k, i) => (
                            <li key={k} className="eu-stagger" style={order(i)}>
                                <Tag icon={<Icon name="check" size={14} />}>{t(`howItWorks.${k}`)}</Tag>
                            </li>
                        ))}
                    </ul>
                    <p className="eu-note" id="amounts-note">
                        <span aria-hidden="true">*</span>
                        {t("journey.note")}
                    </p>
                </div>
            </div>
        </section>
    );
}
