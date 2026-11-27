import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPage } from "../../components/legal-page";

// Draft wording: kept out of search results until EUDA's final text replaces the placeholders.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "legal" });
    return { title: `EUDA - ${t("privacy.title")}`, robots: { index: false, follow: true } };
}

export default function Page() {
    return <LegalPage page="privacy" />;
}
