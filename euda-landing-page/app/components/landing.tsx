"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button, ButtonFace, Icon } from "whitelabel-ds";
import { Header } from "./header";
import { HowItWorks } from "./how-it-works";
import { SiteFooter } from "./site-footer";
import { useSeen } from "./use-seen";
import { WaitlistForm } from "./waitlist-form";
import { DISCORD_URL, reducedMotion, scrollToWaitlist } from "./landing-utils";

/** Adds .is-in to every .eu-reveal once it scrolls into view, so it rises in (see globals.css). */
function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".eu-reveal");
        if (reducedMotion() || !("IntersectionObserver" in window)) {
            els.forEach((el) => el.classList.add("is-in"));
            return;
        }
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in");
                        io.unobserve(e.target);
                    }
                }),
            { rootMargin: "0px 0px -12% 0px" },
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}

export function Landing() {
    const t = useTranslations();
    useScrollReveal();
    // The closing call to action gets the design system's one-time shine sweep when it comes into view.
    const [ctaRef, ctaSeen] = useSeen<HTMLDivElement>();

    return (
        <div className="eu-page">
            <Header />

            <main>
                {/* Hero */}
                <section className="eu-wrap eu-hero">
                    <h1 className="eu-hero__title eu-enter" style={{ "--i": 0 } as React.CSSProperties}>
                        {t("cta.headline")} <em>{t("cta.headline2")}</em>
                    </h1>
                    <p className="eu-lead eu-hero__lead eu-enter" style={{ "--i": 1 } as React.CSSProperties}>
                        {t("hero.subheadline")} <strong>{t("hero.subheadlineBold")}</strong>
                    </p>

                    <WaitlistForm id="waitlist" className="eu-enter" style={{ "--i": 2 } as React.CSSProperties} />

                </section>

                <HowItWorks />

                {/* Social proof */}
                <section className="eu-section eu-section--tight">
                    <p className="eu-wrap eu-proof eu-reveal">
                        <Icon name="house" size={20} />
                        {t("socialProof.text")}
                    </p>
                </section>

                {/* About */}
                <section id="about" className="eu-section">
                    <div className="eu-wrap eu-split eu-reveal">
                        <div>
                            <span className="eu-eyebrow">EUDA</span>
                            <h2 className="eu-h2">{t("about.title")}</h2>
                        </div>
                        <div className="eu-prose">
                            <p className="eu-body eu-body--large">{t("about.p1")}</p>
                            <p className="eu-body">
                                {t("about.p2pre")} <strong>{t("about.p2bold")}</strong> {t("about.p2post")}
                            </p>
                            <p className="eu-body">{t("about.p3")}</p>
                            <p className="eu-body eu-body--strong">{t("about.p5")}</p>
                        </div>
                    </div>
                </section>

                {/* Final call to action */}
                <section className="eu-section">
                    <div className="eu-wrap">
                        <div className="eu-cta eu-reveal" ref={ctaRef}>
                            <h2 className="eu-cta__title">
                                {t("hero.headline")} <em>{t("hero.headline2")}</em>
                            </h2>
                            <div className="eu-cta__actions">
                                <Button
                                    size="lg"
                                    className={ctaSeen ? "btn-v2--shine" : undefined}
                                    iconEnd={<Icon name="arrow-right" size={16} />}
                                    onClick={scrollToWaitlist}
                                >
                                    {t("cta.joinWaitlist")}
                                </Button>
                                <a className="eu-cta__link" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                                    <ButtonFace variant="secondary" size="lg">
                                        <Icon name="message-circle" size={16} />
                                        {t("cta.joinCommunity")}
                                    </ButtonFace>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}
