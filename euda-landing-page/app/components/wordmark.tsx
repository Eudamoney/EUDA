import type { SVGProps } from "react";

/**
 * The EUDA wordmark drawn inline, so it takes its colours from design system tokens and follows the
 * theme: "Eu" in the primary text colour, "da" in the tertiary grey, like the second line of each headline.
 * Same artwork as public/euda-wordmark.svg (94 × 42). Other props (the header's and footer's logo class,
 * aria-hidden) are passed through to the <svg>.
 */
export function Wordmark({ title, ...props }: { title?: string } & SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 94 42" width="94" height="42" role={title ? "img" : undefined} aria-label={title} {...props}>
            <text
                x="0"
                y="35"
                fontFamily="'DM Serif Display', serif"
                fontStyle="italic"
                fontSize="42"
                letterSpacing="-0.84"
            >
                <tspan fill="var(--content-primary)">Eu</tspan>
                <tspan fill="var(--content-tertiary)">da</tspan>
            </text>
        </svg>
    );
}
