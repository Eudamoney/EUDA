import { NextRequest, NextResponse } from "next/server";
import { isSignedUp, saveSignup } from "./store";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MARKETS = ["es", "uk"];
const LANGUAGES = ["es", "en"];

// 201 = joined, 200 = already on the list, 400 = invalid email, 500 = storage failed.
// The landing page shows its own copy for each; the tax calculator shows `message` / `error`.
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = body.email?.trim()?.toLowerCase();
        const city = body.city?.trim() || "Unknown";
        // Which site the sign-up came from (es = eudamoney.com, uk = eudamoney.co.uk) and its language.
        // Older pages (the tax calculator) don't send them: stored as "unknown".
        const market = MARKETS.includes(body.market) ? body.market : "unknown";
        const language = LANGUAGES.includes(body.language) ? body.language : "unknown";

        if (!email || !EMAIL_REGEX.test(email)) {
            return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
        }

        if (await isSignedUp(email)) {
            return NextResponse.json(
                { message: "You're already on the waitlist! We'll be in touch soon." },
                { status: 200 },
            );
        }

        await saveSignup({ email, city, market, language, signup_date: new Date().toISOString() });

        return NextResponse.json({ message: "Welcome to the waitlist! We'll be in touch soon." }, { status: 201 });
    } catch (error) {
        console.error("Waitlist error:", error);
        return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
