export const DISCORD_URL = "https://discord.gg/wVpEAtb3";

export type Theme = "light" | "dark";
/** The theme a first-time visitor sees. "dark" uses app/theme-dark.css, "light" app/theme-light.css. */
export const DEFAULT_THEME: Theme = "dark";
/** Colour palette on top of the theme: "navy-cream" turns on app/palette-navy-cream.css; "mono" is black and white. */
export const PALETTE: "mono" | "navy-cream" = "navy-cream";
/** Where the visitor's own choice from the header switch is remembered. */
export const THEME_STORAGE_KEY = "euda-theme";

/**
 * Runs in <head> before the page paints, so a saved theme never flashes the default one first.
 * It also sets data-motion="on" unless the visitor asks for reduced motion: the scroll reveals only
 * hide content while that is set, so with no script or reduced motion everything simply shows.
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
)});if(t==="light"||t==="dark")d.setAttribute("data-theme",t);if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-motion","on")}catch(e){}})();`;

export function reducedMotion() {
    return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Scrolls to a section of the home page; from another page (privacy, terms) it goes to the home page section. */
export function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
        return;
    }
    // The layout puts this market's home page in this language on <html data-home>.
    const home = document.documentElement.dataset.home || "/";
    window.location.href = `${home}#${id}`;
}

/** Scrolls to the waitlist form and puts the cursor in the email field. */
export function scrollToWaitlist() {
    scrollToId("waitlist");
    const email = document.querySelector<HTMLInputElement>('#waitlist input[type="email"]');
    email?.focus({ preventScroll: true });
}
