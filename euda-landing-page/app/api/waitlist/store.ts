import { createHash } from "node:crypto";
import { BlobNotFoundError, get, head, list, put } from "@vercel/blob";

/**
 * Waitlist sign-ups, stored in Vercel Blob (the project's Blob store; Vercel sets BLOB_READ_WRITE_TOKEN
 * when the store is connected). One private JSON file per sign-up under waitlist/, named by a SHA-256 of
 * the email, so the email never appears in a file name and a second sign-up finds the first.
 */
export interface Signup {
    email: string;
    city: string;
    market: string;
    language: string;
    signup_date: string;
}

const PREFIX = "waitlist/";

function pathFor(email: string) {
    return `${PREFIX}${createHash("sha256").update(email).digest("hex")}.json`;
}

export async function isSignedUp(email: string): Promise<boolean> {
    try {
        await head(pathFor(email));
        return true;
    } catch (error) {
        if (error instanceof BlobNotFoundError) return false;
        throw error;
    }
}

export async function saveSignup(signup: Signup): Promise<void> {
    await put(pathFor(signup.email), JSON.stringify(signup), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        // Never overwrite: a sign-up that races another for the same email fails instead of replacing it.
        allowOverwrite: false,
    });
}

/** Every sign-up, oldest first. */
export async function allSignups(): Promise<Signup[]> {
    const signups: Signup[] = [];
    let cursor: string | undefined;
    do {
        const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
        const rows = await Promise.all(
            page.blobs.map(async (blob) => {
                const file = await get(blob.pathname, { access: "private", useCache: false });
                if (!file || file.statusCode !== 200) return null;
                return JSON.parse(await new Response(file.stream).text()) as Signup;
            }),
        );
        for (const row of rows) if (row) signups.push(row);
        cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return signups.sort((a, b) => a.signup_date.localeCompare(b.signup_date));
}
