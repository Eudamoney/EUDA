import { getTaxBreakdown } from './taxCalculations';
import type { TaxBreakdown } from './taxCalculations';
import { getUkTaxBreakdown, UK_TAX_YEAR } from './ukTax';
import type { UkWorker } from './ukTax';

export type CountryId = 'spain' | 'uk';
type Period = 'monthly' | 'yearly';

export interface CountryConfig {
    id: CountryId;
    name: string;
    flag: string;
    currencySymbol: string;
    /** Languages the calculator offers for this country (the toggle only shows with more than one). */
    languages: ('en' | 'es')[];
    /** The worker types the toggle offers, first one selected by default. */
    workers: { id: string; label: string; amountHint: string }[];
    labels: { incomeTax: string; social: string };
    calculate: (amount: number, worker: string, period: Period) => TaxBreakdown;
    /** Sentence over the chart; {0} is the total contribution. */
    spendingIntro: string;
    tableIntro: string;
    shareText: (total: string) => string;
    dataNote: string;
    sources: { label: string; url: string }[];
    pageTitle: string;
    pageDescription: string;
}

// Spain keeps the exact wording it had, so its Spanish translations (translations-es.json) still match.
const SPAIN: CountryConfig = {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    currencySymbol: '€',
    languages: ['en', 'es'],
    workers: [
        { id: 'autonomo', label: 'Autonomo', amountHint: 'Earnings...' },
        { id: 'employee', label: 'Employee', amountHint: 'Earnings...' },
    ],
    labels: { incomeTax: 'Income Tax (IRPF)', social: 'Social Security' },
    calculate: (amount, worker, period) => getTaxBreakdown(amount, worker as 'employee' | 'autonomo', period),
    spendingIntro: 'Based on 2024 state budgets, here is how your €{0} is distributed.',
    tableIntro: 'Every euro accounted for, down to the subcategory level.',
    shareText: (total) => `I contributed €${total} to Spanish public services! 🇪🇸\nSee where your tax goes:`,
    dataNote: 'Data sourced from Spain General State Budgets 2024',
    sources: [
        { label: 'IGAE COFOG Data', url: 'https://www.igae.pap.hacienda.gob.es/sitios/igae/es-ES/Contabilidad/ContabilidadNacional/Publicaciones/paginas/iacogof.aspx' },
        { label: 'Presupuestos Generales', url: 'https://transparencia.gob.es/en/publicidad-activa/por-materias/informacion-economico-presupuestaria/presupuestos-generales-estado/pge-gastos' },
        { label: 'Tax Agency', url: 'https://sede.agenciatributaria.gob.es/Sede/en_gb/educacion-civico-tributaria/programa-educacion-civico-tributaria/que-son-impuestos/contenidos/gastos-publicos/distribucion-funcional-gasto-publico.html' },
    ],
    pageTitle: 'EUDA | Tax Spend Calculator — Spain',
    pageDescription: 'Calculate your tax and social security contributions in Spain and see how your money is spent on public services like health and education.',
};

/** ukSpendingData.json: HM Treasury PESA 2026 (July 2026), Table 5.2, 2025-26 outturn, as shares of total
 *  expenditure on services (£1,227.6bn). "Debt interest and related" is COFOG's public debt transactions line. */
export const UK_SPENDING_YEAR = '2025-26';

const UK: CountryConfig = {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currencySymbol: '£',
    languages: ['en'],
    workers: [
        { id: 'employee', label: 'Employee', amountHint: 'Salary before tax...' },
        { id: 'selfEmployed', label: 'Self-employed', amountHint: 'Profit after expenses...' },
    ],
    labels: { incomeTax: 'Income Tax', social: 'National Insurance' },
    calculate: (amount, worker, period) => getUkTaxBreakdown(amount, worker as UkWorker, period),
    spendingIntro: `Based on UK public spending in ${UK_SPENDING_YEAR}, here is how your £{0} is distributed.`,
    tableIntro: 'Every pound accounted for, down to the subcategory level.',
    shareText: (total) => `I contributed £${total} to UK public services! 🇬🇧\nSee where your tax goes:`,
    dataNote: `${UK_TAX_YEAR} tax rates for England, Wales and Northern Ireland. Spending shares from HM Treasury (PESA 2026), ${UK_SPENDING_YEAR}.`,
    sources: [
        { label: 'Income Tax rates (GOV.UK)', url: 'https://www.gov.uk/government/publications/rates-and-allowances-income-tax/income-tax-rates-and-allowances-current-and-past' },
        { label: 'National Insurance 2026/27 (GOV.UK)', url: 'https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027' },
        { label: 'Self-employed NI (GOV.UK)', url: 'https://www.gov.uk/self-employed-national-insurance-rates' },
        { label: 'Public spending, PESA 2026 (HM Treasury)', url: 'https://www.gov.uk/government/statistics/public-expenditure-statistical-analyses-2026' },
    ],
    pageTitle: 'EUDA | Tax Spend Calculator — UK',
    pageDescription: 'Calculate your income tax and National Insurance in the UK and see how your money is spent on public services like the NHS, pensions and schools.',
};

export const COUNTRIES: Record<CountryId, CountryConfig> = { spain: SPAIN, uk: UK };

/** The country comes from the address: /tax-calculator/uk or /tax-calculator/spain (the default). */
export function countryFromPath(pathname: string): CountryId {
    return /\/tax-calculator\/uk(\/|$)/.test(pathname) ? 'uk' : 'spain';
}
