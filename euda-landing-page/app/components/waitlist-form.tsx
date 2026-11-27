"use client";

import { useState, FormEvent, CSSProperties } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Callout, Icon, Input, OrbButton } from "whitelabel-ds";
import { useMarket } from "./market-context";

export function WaitlistForm({ id, className, style }: { id?: string; className?: string; style?: CSSProperties }) {
    const t = useTranslations("waitlist");
    const locale = useLocale();
    const market = useMarket();
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Market and language let the London and Madrid sign-ups be compared.
                body: JSON.stringify({ email, city, market: market.id, language: locale }),
            });

            // 201 = joined, 200 = already on the list, 400 = invalid email. The copy is ours, in the visitor's language.
            if (res.ok) {
                setStatus("success");
                setMessage(res.status === 201 ? t("successBody") : t("alreadyJoined"));
                setEmail("");
                setCity("");
            } else {
                setStatus("error");
                setMessage(res.status === 400 ? t("invalidEmail") : t("genericError"));
            }
        } catch {
            setStatus("error");
            setMessage(t("genericError"));
        }

        setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 5000);
    }

    if (status === "success") {
        return (
            <div id={id} className={["eu-waitlist", className].filter(Boolean).join(" ")} style={style} role="status">
                <Callout icon="circle-check" title={t("success")}>
                    {message}
                </Callout>
            </div>
        );
    }

    return (
        <div id={id} className={["eu-waitlist", className].filter(Boolean).join(" ")} style={style}>
            <form className="eu-waitlist__form" onSubmit={handleSubmit}>
                <Input
                    className="eu-waitlist__email"
                    type="email"
                    label={t("emailLabel")}
                    placeholder={t("placeholder")}
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    className="eu-waitlist__city"
                    type="text"
                    label={t("cityLabel")}
                    placeholder={t("cityPlaceholder")}
                    autoComplete="address-level2"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                {/* The design system's "super primary" call to action, used once per page: the orb grows and the
                    arrow nudges on hover. */}
                <OrbButton
                    type="submit"
                    size="lg"
                    loading={status === "loading"}
                    icon={<Icon name="arrow-right" size={16} />}
                >
                    {t("button")}
                </OrbButton>
            </form>
            {status === "error" && (
                <Callout tone="error" role="alert">
                    {message}
                </Callout>
            )}
        </div>
    );
}
