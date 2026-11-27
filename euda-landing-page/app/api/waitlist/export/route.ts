import { NextRequest, NextResponse } from "next/server";
import { allSignups } from "../store";

/**
 * Downloads the waitlist as a CSV: /api/waitlist/export?secret=<EXPORT_SECRET>.
 * Columns: Email, City, Market, Language, Signed Up (oldest first).
 */
export async function GET(request: NextRequest) {
    const expected = process.env.EXPORT_SECRET;
    const secret = request.nextUrl.searchParams.get("secret");
    if (!expected || secret !== expected) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Quote every field: cities can contain commas ("Madrid, Spain").
        const cell = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
        let csv = "Email,City,Market,Language,Signed Up\n";
        for (const s of await allSignups()) {
            csv += [s.email, s.city || "Unknown", s.market || "", s.language || "", s.signup_date].map(cell).join(",") + "\n";
        }

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="euda-waitlist-${new Date().toISOString().split("T")[0]}.csv"`,
                "Cache-Control": "no-store",
            },
        });
    } catch (error) {
        console.error("Export error:", error);
        return NextResponse.json({ error: "Failed to export data." }, { status: 500 });
    }
}
