import ukSpendingData from './ukSpendingData.json';
import { shareSpending } from './taxCalculations';
import type { IRPFBracketResult, SpendingSource, TaxBreakdown } from './taxCalculations';

/**
 * UK income tax and National Insurance, tax year 2026/27 (6 April 2026 – 5 April 2027), for
 * England, Wales and Northern Ireland. Scotland sets its own income tax bands and is not covered yet.
 * Checked 27 Nov 2026 against GOV.UK (links in countries.ts): income tax rates and allowances; rates and
 * thresholds for employers 2026 to 2027; self-employed National Insurance rates. Thresholds are frozen
 * until 5 April 2031 (Budget 2025). Check again each April.
 */
export const UK_TAX_YEAR = '2026/27';

/** Personal allowance, and the income above which it is reduced by £1 for every £2. */
export const PERSONAL_ALLOWANCE = 12_570;
export const ALLOWANCE_TAPER_START = 100_000;

/** Income tax bands, as taxable income (income above the personal allowance). */
export const INCOME_TAX_BANDS = [
    { name: 'Basic rate', upTo: 37_700, rate: 0.2 },
    { name: 'Higher rate', upTo: 125_140, rate: 0.4 },
    { name: 'Additional rate', upTo: Infinity, rate: 0.45 },
];

/** Employee National Insurance (Class 1, primary): annual primary threshold and upper earnings limit. */
export const EMPLOYEE_NI = { threshold: 12_570, upperLimit: 50_270, mainRate: 0.08, upperRate: 0.02 };
/** Employer National Insurance (Class 1, secondary): paid on top of salary, not on the payslip. */
export const EMPLOYER_NI = { threshold: 5_000, rate: 0.15 };
/** Self-employed National Insurance (Class 4) on profits. Class 2 is no longer compulsory. */
export const SELF_EMPLOYED_NI = { threshold: 12_570, upperLimit: 50_270, mainRate: 0.06, upperRate: 0.02 };

export type UkWorker = 'employee' | 'selfEmployed';

export function personalAllowanceFor(income: number): number {
    const lost = Math.max(0, (income - ALLOWANCE_TAPER_START) / 2);
    return Math.max(0, PERSONAL_ALLOWANCE - lost);
}

/** Income tax, with each band shown on the income axis (the 0% personal allowance first). */
export function ukIncomeTax(income: number): { total: number; bands: IRPFBracketResult[]; allowance: number } {
    const allowance = personalAllowanceFor(income);
    const bands: IRPFBracketResult[] = [];
    if (income <= 0) return { total: 0, bands, allowance };

    bands.push({ from: 0, to: Math.min(income, allowance), rate: 0, taxableInBracket: Math.min(income, allowance), taxPaid: 0 });

    const taxable = Math.max(0, income - allowance);
    let total = 0;
    let prev = 0;
    for (const band of INCOME_TAX_BANDS) {
        if (taxable <= prev) break;
        const top = Math.min(taxable, band.upTo);
        const inBand = top - prev;
        const tax = inBand * band.rate;
        bands.push({ from: allowance + prev, to: allowance + top, rate: band.rate, taxableInBracket: inBand, taxPaid: tax });
        total += tax;
        prev = band.upTo;
    }
    return { total, bands, allowance };
}

/** National Insurance in two bands: the main rate up to the upper limit, a lower rate above it. */
export function ukNationalInsurance(
    income: number,
    ni: { threshold: number; upperLimit: number; mainRate: number; upperRate: number },
): { total: number; bands: IRPFBracketResult[] } {
    const bands: IRPFBracketResult[] = [];
    const main = Math.max(0, Math.min(income, ni.upperLimit) - ni.threshold);
    const upper = Math.max(0, income - ni.upperLimit);
    if (main > 0) bands.push({ from: ni.threshold, to: ni.threshold + main, rate: ni.mainRate, taxableInBracket: main, taxPaid: main * ni.mainRate });
    if (upper > 0) bands.push({ from: ni.upperLimit, to: income, rate: ni.upperRate, taxableInBracket: upper, taxPaid: upper * ni.upperRate });
    return { total: bands.reduce((sum, b) => sum + b.taxPaid, 0), bands };
}

/**
 * Employees enter their gross salary; self-employed people enter their profit (income after allowable
 * expenses), which is what both income tax and Class 4 NI are charged on.
 */
export function getUkTaxBreakdown(amount: number, worker: UkWorker, period: 'monthly' | 'yearly'): TaxBreakdown {
    const income = period === 'monthly' ? amount * 12 : amount;
    const tax = ukIncomeTax(income);
    const ni = ukNationalInsurance(income, worker === 'employee' ? EMPLOYEE_NI : SELF_EMPLOYED_NI);
    const total = tax.total + ni.total;

    return {
        gross: income,
        net: income - total,
        totalTax: total,
        incomeTax: tax.total,
        social: ni.total,
        spending: shareSpending(total, ukSpendingData as SpendingSource[]),
        details: {
            taxableBase: Math.max(0, income - tax.allowance),
            irpfBrackets: tax.bands,
            uk: {
                personalAllowance: tax.allowance,
                allowanceLost: PERSONAL_ALLOWANCE - tax.allowance,
                niBands: ni.bands,
                employerNI: worker === 'employee' ? Math.max(0, income - EMPLOYER_NI.threshold) * EMPLOYER_NI.rate : undefined,
            },
        },
    };
}
