"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Icon, IconButton } from "whitelabel-ds";
import { DEFAULT_THEME, THEME_STORAGE_KEY, Theme, reducedMotion } from "./landing-utils";

type ViewTransition = { ready: Promise<void>; finished: Promise<void>; updateCallbackDone: Promise<void> };
type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => ViewTransition };

/** Sun / moon button that switches the page between the light and dark themes and remembers the choice. */
export function ThemeToggle() {
    const t = useTranslations("nav");
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

    // The boot script in <head> may already have applied a saved theme: start from what is on the page.
    useEffect(() => {
        const current = document.documentElement.getAttribute("data-theme");
        if (current === "light" || current === "dark") setTheme(current);
    }, []);

    function toggle() {
        const next: Theme = theme === "dark" ? "light" : "dark";
        const apply = () => {
            document.documentElement.setAttribute("data-theme", next);
            setTheme(next);
        };
        try {
            localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {
            // Private browsing can block storage; the switch still works for this visit.
        }
        // Cross-fade the whole page where the browser supports view transitions; otherwise switch at once.
        // (Skipped while the page is hidden: the browser aborts the transition there.)
        const doc = document as ViewTransitionDocument;
        if (doc.startViewTransition && !reducedMotion() && !document.hidden) {
            const transition = doc.startViewTransition(apply);
            // A transition can still be cancelled (e.g. the tab is hidden mid-fade); the theme has switched anyway.
            transition.ready.catch(() => {});
            transition.finished.catch(() => {});
        } else {
            apply();
        }
    }

    const label = theme === "dark" ? t("themeToLight") : t("themeToDark");

    return (
        <IconButton className="eu-theme-toggle" variant="ghost" size="sm" label={label} onClick={toggle}>
            <Icon key={theme} name={theme === "dark" ? "sun" : "moon"} size={16} />
        </IconButton>
    );
}
