import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
    async rewrites() {
        const taxCalcUrl = process.env.TAX_CALCULATOR_URL || 'https://euda-5gdk.vercel.app';
        return [
            // The tax calculator is its own app; one deployment serves every country.
            {
                source: '/tax-calculator/:country(spain|uk)',
                destination: `${taxCalcUrl}/tax-calculator/:country`,
            },
            {
                source: '/tax-calculator/:path*',
                destination: `${taxCalcUrl}/tax-calculator/:path*`,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
