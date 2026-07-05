// ============================================================
// calculators.ts – 20 Calculator Tools
// Exports: calculate(toolId, values), getCalcFields(toolId)
// ============================================================

export interface CalcField {
  id: string;
  label: string;
  type: "number" | "select" | "date";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string }[];
}

// ─── Unit conversion tables ───────────────────────────────────

export const UNIT_OPTIONS: Record<string, { label: string; value: string }[]> = {
  length: [
    { label: "m", value: "m" }, { label: "km", value: "km" }, { label: "cm", value: "cm" },
    { label: "mm", value: "mm" }, { label: "inch", value: "inch" }, { label: "foot", value: "foot" },
    { label: "yard", value: "yard" }, { label: "mile", value: "mile" },
  ],
  weight: [
    { label: "kg", value: "kg" }, { label: "g", value: "g" }, { label: "mg", value: "mg" },
    { label: "lb", value: "lb" }, { label: "oz", value: "oz" }, { label: "ton", value: "ton" },
  ],
  temperature: [
    { label: "Celsius", value: "C" }, { label: "Fahrenheit", value: "F" }, { label: "Kelvin", value: "K" },
  ],
  volume: [
    { label: "L", value: "L" }, { label: "mL", value: "mL" }, { label: "gallon", value: "gallon" },
    { label: "quart", value: "quart" }, { label: "pint", value: "pint" }, { label: "cup", value: "cup" },
  ],
  speed: [
    { label: "km/h", value: "km/h" }, { label: "m/s", value: "m/s" }, { label: "mph", value: "mph" }, { label: "knots", value: "knots" },
  ],
};

const LENGTH_UNITS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  inch: 0.0254,
  foot: 0.3048,
  yard: 0.9144,
  mile: 1609.344,
};

const WEIGHT_UNITS: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.453592,
  oz: 0.0283495,
  ton: 1000,
};

const VOLUME_UNITS: Record<string, number> = {
  L: 1,
  mL: 0.001,
  gallon: 3.78541,
  quart: 0.946353,
  pint: 0.473176,
  cup: 0.236588,
};

const SPEED_UNITS: Record<string, number> = {
  "km/h": 1,
  "m/s": 3.6,
  mph: 1.60934,
  knots: 1.852,
};

// ─── Exchange rates (base USD) ───────────────────────────────

const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  PKR: 278,
  EUR: 0.92,
  GBP: 0.79,
  SAR: 3.75,
  AED: 3.67,
  INR: 83.5,
  CNY: 7.25,
  JPY: 161,
  TRY: 32.5,
};

// ─── Timezone offsets (hours from UTC) ───────────────────────

const TIMEZONE_OFFSETS: Record<string, number> = {
  UTC: 0,
  PKT: 5,
  EST: -5,
  PST: -8,
  GMT: 0,
  CET: 1,
  IST: 5.5,
  JST: 9,
  AEST: 10,
};

// ─── Helper: safe number ─────────────────────────────────────

function num(v: unknown, fallback = 0): number {
  const n = Number(v);
  return isFinite(n) ? n : fallback;
}

// ================================================================
// FIELD DEFINITIONS
// ================================================================

const FIELD_DEFS: Record<string, CalcField[]> = {
  // ── FINANCE ─────────────────────────────────────────────────
  "loan-emi": [
    { id: "loanAmount", label: "Loan Amount", type: "number", placeholder: "e.g. 500000", min: 1000 },
    { id: "interestRate", label: "Annual Interest Rate (%)", type: "number", placeholder: "e.g. 12", min: 0.1, step: 0.1 },
    { id: "loanTerm", label: "Loan Term (months)", type: "number", placeholder: "e.g. 60", min: 1 },
  ],

  "compound-interest": [
    { id: "principal", label: "Principal Amount", type: "number", placeholder: "e.g. 100000", min: 1 },
    { id: "rate", label: "Annual Rate %", type: "number", placeholder: "e.g. 8", min: 0.1, step: 0.1 },
    { id: "time", label: "Time (years)", type: "number", placeholder: "e.g. 5", min: 1 },
    {
      id: "frequency", label: "Compounding Frequency", type: "select",
      options: [
        { label: "Annually", value: "1" },
        { label: "Semi-annually", value: "2" },
        { label: "Quarterly", value: "4" },
        { label: "Monthly", value: "12" },
      ],
    },
  ],

  "salary-tax": [
    { id: "annualSalary", label: "Annual Salary (PKR)", type: "number", placeholder: "e.g. 1200000", min: 1 },
  ],

  "tip-calculator": [
    { id: "billAmount", label: "Bill Amount", type: "number", placeholder: "e.g. 1500", min: 0.01 },
    { id: "tipPercentage", label: "Tip Percentage (%)", type: "number", placeholder: "15", min: 0, step: 1 },
    { id: "people", label: "Number of People", type: "number", placeholder: "1", min: 1 },
  ],

  discount: [
    { id: "originalPrice", label: "Original Price", type: "number", placeholder: "e.g. 5000", min: 0.01 },
    { id: "discountPercentage", label: "Discount (%)", type: "number", placeholder: "e.g. 20", min: 0, max: 100, step: 1 },
  ],

  "profit-margin": [
    { id: "cost", label: "Cost", type: "number", placeholder: "e.g. 500", min: 0 },
    { id: "revenue", label: "Revenue", type: "number", placeholder: "e.g. 800", min: 0 },
  ],

  // ── HEALTH ──────────────────────────────────────────────────
  bmi: [
    { id: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g. 70", min: 1 },
    { id: "height", label: "Height (m)", type: "number", placeholder: "e.g. 1.75", min: 0.5, step: 0.1 },
    {
      id: "gender", label: "Gender", type: "select",
      options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
    },
  ],

  calorie: [
    { id: "weight", label: "Weight (kg)", type: "number", placeholder: "e.g. 70", min: 1 },
    { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 175", min: 1 },
    { id: "age", label: "Age (years)", type: "number", placeholder: "e.g. 30", min: 1 },
    {
      id: "gender", label: "Gender", type: "select",
      options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
    },
    {
      id: "activity", label: "Activity Level", type: "select",
      options: [
        { label: "Sedentary", value: "1.2" },
        { label: "Lightly Active", value: "1.375" },
        { label: "Moderately Active", value: "1.55" },
        { label: "Very Active", value: "1.725" },
        { label: "Extra Active", value: "1.9" },
      ],
    },
  ],

  "body-fat": [
    {
      id: "gender", label: "Gender", type: "select",
      options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
    },
    { id: "waist", label: "Waist (cm)", type: "number", placeholder: "e.g. 85", min: 1 },
    { id: "neck", label: "Neck (cm)", type: "number", placeholder: "e.g. 38", min: 1 },
    { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 175", min: 1 },
    { id: "hip", label: "Hip (cm) – Women only", type: "number", placeholder: "e.g. 95", min: 1 },
  ],

  "ideal-weight": [
    { id: "height", label: "Height (cm)", type: "number", placeholder: "e.g. 170", min: 50, step: 0.1 },
    {
      id: "gender", label: "Gender", type: "select",
      options: [{ label: "Male", value: "male" }, { label: "Female", value: "female" }],
    },
    {
      id: "frame", label: "Body Frame", type: "select",
      options: [{ label: "Small", value: "small" }, { label: "Medium", value: "medium" }, { label: "Large", value: "large" }],
    },
  ],

  "pregnancy-due": [
    { id: "lastPeriod", label: "Last Menstrual Period", type: "date" },
  ],

  // ── MATH ────────────────────────────────────────────────────
  percentage: [
    {
      id: "mode", label: "Calculation Mode", type: "select",
      options: [
        { label: "What is X% of Y", value: "percentOf" },
        { label: "X is what % of Y", value: "whatPercent" },
        { label: "Percentage change from X to Y", value: "percentChange" },
      ],
    },
    { id: "value1", label: "Value 1", type: "number", placeholder: "e.g. 25" },
    { id: "value2", label: "Value 2", type: "number", placeholder: "e.g. 200" },
  ],

  "age-calculator": [
    { id: "birthDate", label: "Date of Birth", type: "date" },
  ],

  "unit-converter": [
    {
      id: "category", label: "Category", type: "select",
      options: [
        { label: "Length", value: "length" },
        { label: "Weight", value: "weight" },
        { label: "Temperature", value: "temperature" },
        { label: "Volume", value: "volume" },
        { label: "Speed", value: "speed" },
      ],
    },
    { id: "fromUnit", label: "From", type: "select", options: [] },
    { id: "toUnit", label: "To", type: "select", options: [] },
    { id: "inputValue", label: "Value", type: "number", placeholder: "e.g. 100" },
  ],

  gpa: [
    { id: "grade1", label: "Course 1 Grade", type: "select", options: [
      { label: "A", value: "4" }, { label: "A-", value: "3.7" }, { label: "B+", value: "3.3" },
      { label: "B", value: "3" }, { label: "B-", value: "2.7" }, { label: "C+", value: "2.3" },
      { label: "C", value: "2" }, { label: "C-", value: "1.7" }, { label: "D+", value: "1.3" },
      { label: "D", value: "1" }, { label: "F", value: "0" },
    ]},
    { id: "credits1", label: "Course 1 Credits", type: "number", min: 0, step: 1 },
    { id: "grade2", label: "Course 2 Grade", type: "select", options: [
      { label: "A", value: "4" }, { label: "A-", value: "3.7" }, { label: "B+", value: "3.3" },
      { label: "B", value: "3" }, { label: "B-", value: "2.7" }, { label: "C+", value: "2.3" },
      { label: "C", value: "2" }, { label: "C-", value: "1.7" }, { label: "D+", value: "1.3" },
      { label: "D", value: "1" }, { label: "F", value: "0" },
    ]},
    { id: "credits2", label: "Course 2 Credits", type: "number", min: 0, step: 1 },
    { id: "grade3", label: "Course 3 Grade", type: "select", options: [
      { label: "A", value: "4" }, { label: "A-", value: "3.7" }, { label: "B+", value: "3.3" },
      { label: "B", value: "3" }, { label: "B-", value: "2.7" }, { label: "C+", value: "2.3" },
      { label: "C", value: "2" }, { label: "C-", value: "1.7" }, { label: "D+", value: "1.3" },
      { label: "D", value: "1" }, { label: "F", value: "0" },
    ]},
    { id: "credits3", label: "Course 3 Credits", type: "number", min: 0, step: 1 },
    { id: "grade4", label: "Course 4 Grade", type: "select", options: [
      { label: "A", value: "4" }, { label: "A-", value: "3.7" }, { label: "B+", value: "3.3" },
      { label: "B", value: "3" }, { label: "B-", value: "2.7" }, { label: "C+", value: "2.3" },
      { label: "C", value: "2" }, { label: "C-", value: "1.7" }, { label: "D+", value: "1.3" },
      { label: "D", value: "1" }, { label: "F", value: "0" },
    ]},
    { id: "credits4", label: "Course 4 Credits", type: "number", min: 0, step: 1 },
  ],

  grade: [
    { id: "score1", label: "Score 1", type: "number", min: 0, max: 100 },
    { id: "weight1", label: "Weight 1 (%)", type: "number", min: 0, max: 100, step: 1 },
    { id: "score2", label: "Score 2", type: "number", min: 0, max: 100 },
    { id: "weight2", label: "Weight 2 (%)", type: "number", min: 0, max: 100, step: 1 },
    { id: "score3", label: "Score 3", type: "number", min: 0, max: 100 },
    { id: "weight3", label: "Weight 3 (%)", type: "number", min: 0, max: 100, step: 1 },
    { id: "score4", label: "Score 4", type: "number", min: 0, max: 100 },
    { id: "weight4", label: "Weight 4 (%)", type: "number", min: 0, max: 100, step: 1 },
    { id: "score5", label: "Score 5", type: "number", min: 0, max: 100 },
    { id: "weight5", label: "Weight 5 (%)", type: "number", min: 0, max: 100, step: 1 },
  ],

  // ── EVERYDAY ───────────────────────────────────────────────
  "fuel-cost": [
    { id: "distance", label: "Distance (km)", type: "number", placeholder: "e.g. 300", min: 1 },
    { id: "mileage", label: "Mileage (km/L)", type: "number", placeholder: "e.g. 15", min: 1 },
    { id: "fuelPrice", label: "Fuel Price (PKR/L)", type: "number", placeholder: "e.g. 280", min: 1 },
  ],

  currency: [
    { id: "amount", label: "Amount", type: "number", placeholder: "e.g. 100", min: 0 },
    {
      id: "fromCurrency", label: "From Currency", type: "select",
      options: [
        { label: "USD", value: "USD" }, { label: "PKR", value: "PKR" },
        { label: "EUR", value: "EUR" }, { label: "GBP", value: "GBP" },
        { label: "SAR", value: "SAR" }, { label: "AED", value: "AED" },
        { label: "INR", value: "INR" }, { label: "CNY", value: "CNY" },
        { label: "JPY", value: "JPY" }, { label: "TRY", value: "TRY" },
      ],
    },
    {
      id: "toCurrency", label: "To Currency", type: "select",
      options: [
        { label: "USD", value: "USD" }, { label: "PKR", value: "PKR" },
        { label: "EUR", value: "EUR" }, { label: "GBP", value: "GBP" },
        { label: "SAR", value: "SAR" }, { label: "AED", value: "AED" },
        { label: "INR", value: "INR" }, { label: "CNY", value: "CNY" },
        { label: "JPY", value: "JPY" }, { label: "TRY", value: "TRY" },
      ],
    },
  ],

  timezone: [
    { id: "time", label: "Time (HH:MM)", type: "select", options: [] },
    { id: "fromDate", label: "Date", type: "date" },
    {
      id: "fromTimezone", label: "From Timezone", type: "select",
      options: [
        { label: "UTC (UTC+0)", value: "UTC" }, { label: "PKT (UTC+5)", value: "PKT" },
        { label: "EST (UTC-5)", value: "EST" }, { label: "PST (UTC-8)", value: "PST" },
        { label: "GMT (UTC+0)", value: "GMT" }, { label: "CET (UTC+1)", value: "CET" },
        { label: "IST (UTC+5:30)", value: "IST" }, { label: "JST (UTC+9)", value: "JST" },
        { label: "AEST (UTC+10)", value: "AEST" },
      ],
    },
    {
      id: "toTimezone", label: "To Timezone", type: "select",
      options: [
        { label: "UTC (UTC+0)", value: "UTC" }, { label: "PKT (UTC+5)", value: "PKT" },
        { label: "EST (UTC-5)", value: "EST" }, { label: "PST (UTC-8)", value: "PST" },
        { label: "GMT (UTC+0)", value: "GMT" }, { label: "CET (UTC+1)", value: "CET" },
        { label: "IST (UTC+5:30)", value: "IST" }, { label: "JST (UTC+9)", value: "JST" },
        { label: "AEST (UTC+10)", value: "AEST" },
      ],
    },
  ],

  "password-gen": [
    { id: "length", label: "Password Length", type: "number", placeholder: "16", min: 4, max: 64, step: 1 },
    {
      id: "uppercase", label: "Include Uppercase", type: "select",
      options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }],
    },
    {
      id: "lowercase", label: "Include Lowercase", type: "select",
      options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }],
    },
    {
      id: "numbers", label: "Include Numbers", type: "select",
      options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }],
    },
    {
      id: "symbols", label: "Include Symbols", type: "select",
      options: [{ label: "Yes", value: "true" }, { label: "No", value: "false" }],
    },
  ],
};

// ================================================================
// getCalcFields
// ================================================================

export function getCalcFields(toolId: string): CalcField[] {
  return FIELD_DEFS[toolId] ?? [];
}

// ================================================================
// calculate
// ================================================================

export function calculate(
  toolId: string,
  values: Record<string, string | number>,
): unknown {
  switch (toolId) {
    // ── FINANCE ────────────────────────────────────────────────
    case "loan-emi":
      return calcLoanEMI(values);
    case "compound-interest":
      return calcCompoundInterest(values);
    case "salary-tax":
      return calcSalaryTax(values);
    case "tip-calculator":
      return calcTip(values);
    case "discount":
      return calcDiscount(values);
    case "profit-margin":
      return calcProfitMargin(values);

    // ── HEALTH ─────────────────────────────────────────────────
    case "bmi":
      return calcBMI(values);
    case "calorie":
      return calcCalorie(values);
    case "body-fat":
      return calcBodyFat(values);
    case "ideal-weight":
      return calcIdealWeight(values);
    case "pregnancy-due":
      return calcPregnancyDue(values);

    // ── MATH ───────────────────────────────────────────────────
    case "percentage":
      return calcPercentage(values);
    case "age-calculator":
      return calcAge(values);
    case "unit-converter":
      return calcUnitConverter(values);
    case "gpa":
      return calcGPA(values);
    case "grade":
      return calcGrade(values);

    // ── EVERYDAY ───────────────────────────────────────────────
    case "fuel-cost":
      return calcFuelCost(values);
    case "currency":
      return calcCurrency(values);
    case "timezone":
      return calcTimezone(values);
    case "password-gen":
      return calcPasswordGen(values);

    default:
      return "Unknown calculator";
  }
}

// ================================================================
// FINANCE CALCULATORS
// ================================================================

function calcLoanEMI(v: Record<string, string | number>) {
  const P = num(v.loanAmount);
  const annualRate = num(v.interestRate);
  const n = num(v.loanTerm);

  if (P <= 0 || annualRate <= 0 || n <= 0) return "Please provide valid positive values.";

  const r = annualRate / 100 / 12;
  const factor = Math.pow(1 + r, n);
  const emi = (P * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  // Monthly breakdown
  const monthlyBreakdown: { month: number; emi: string; principal: string; interest: string; balance: string }[] = [];
  let balance = P;
  for (let i = 1; i <= n; i++) {
    const interestPart = balance * r;
    const principalPart = emi - interestPart;
    balance -= principalPart;
    if (balance < 0) balance = 0;
    monthlyBreakdown.push({
      month: i,
      emi: emi.toFixed(2),
      principal: principalPart.toFixed(2),
      interest: interestPart.toFixed(2),
      balance: balance.toFixed(2),
    });
  }

  return {
    emi: emi.toFixed(2),
    totalPayment: totalPayment.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    monthlyBreakdown,
  };
}

function calcCompoundInterest(v: Record<string, string | number>) {
  const P = num(v.principal);
  const rate = num(v.rate);
  const t = num(v.time);
  const n = num(v.frequency);

  if (P <= 0 || rate <= 0 || t <= 0 || n <= 0) return "Please provide valid positive values.";

  const r = rate / 100;
  const A = P * Math.pow(1 + r / n, n * t);
  const totalInterest = A - P;

  const yearByYear: { year: number; amount: string; interest: string }[] = [];
  for (let year = 1; year <= t; year++) {
    const amount = P * Math.pow(1 + r / n, n * year);
    yearByYear.push({
      year,
      amount: amount.toFixed(2),
      interest: (amount - P).toFixed(2),
    });
  }

  return {
    totalAmount: A.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    yearByYear,
  };
}

function calcSalaryTax(v: Record<string, string | number>) {
  const salary = num(v.annualSalary);
  if (salary <= 0) return "Please enter a valid annual salary.";

  let tax = 0;
  if (salary > 6000000) {
    tax = 1230000 + (salary - 6000000) * 0.35;
  } else if (salary > 3600000) {
    tax = 510000 + (salary - 3600000) * 0.3;
  } else if (salary > 2400000) {
    tax = 210000 + (salary - 2400000) * 0.25;
  } else if (salary > 1200000) {
    tax = 30000 + (salary - 1200000) * 0.15;
  } else if (salary > 600000) {
    tax = (salary - 600000) * 0.05;
  }

  const effectiveRate = (tax / salary) * 100;
  const monthlySalary = salary / 12;
  const monthlyTax = tax / 12;
  const takeHomeMonthly = monthlySalary - monthlyTax;
  const takeHomeAnnual = salary - tax;

  return {
    totalTax: tax.toFixed(2),
    effectiveRate: effectiveRate.toFixed(2) + "%",
    monthlySalary: monthlySalary.toFixed(2),
    monthlyTax: monthlyTax.toFixed(2),
    takeHomeMonthly: takeHomeMonthly.toFixed(2),
    takeHomeAnnual: takeHomeAnnual.toFixed(2),
  };
}

function calcTip(v: Record<string, string | number>) {
  const bill = num(v.billAmount);
  const tipPct = num(v.tipPercentage, 15);
  const people = num(v.people, 1);

  if (bill <= 0) return "Please enter a valid bill amount.";

  const tipAmount = bill * (tipPct / 100);
  const totalAmount = bill + tipAmount;
  const perPerson = people > 0 ? totalAmount / people : totalAmount;

  return {
    tipAmount: tipAmount.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    perPerson: perPerson.toFixed(2),
  };
}

function calcDiscount(v: Record<string, string | number>) {
  const price = num(v.originalPrice);
  const disc = num(v.discountPercentage);

  if (price <= 0) return "Please enter a valid price.";
  if (disc < 0 || disc > 100) return "Discount must be between 0 and 100.";

  const savings = price * (disc / 100);
  const finalPrice = price - savings;

  return {
    savings: savings.toFixed(2),
    finalPrice: finalPrice.toFixed(2),
  };
}

function calcProfitMargin(v: Record<string, string | number>) {
  const cost = num(v.cost);
  const revenue = num(v.revenue);

  if (revenue < 0) return "Revenue cannot be negative.";

  const profit = revenue - cost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;

  return {
    profit: profit.toFixed(2),
    margin: margin.toFixed(2) + "%",
    markup: markup.toFixed(2) + "%",
  };
}

// ================================================================
// HEALTH CALCULATORS
// ================================================================

function calcBMI(v: Record<string, string | number>) {
  const weight = num(v.weight);
  const height = num(v.height);

  if (weight <= 0 || height <= 0) return "Please enter valid weight and height.";

  const bmi = weight / (height * height);
  let category: string;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  const healthyRange = "18.5 – 24.9";

  return {
    bmi: bmi.toFixed(1),
    category,
    healthyRange,
  };
}

function calcCalorie(v: Record<string, string | number>) {
  const weight = num(v.weight);
  const height = num(v.height);
  const age = num(v.age);
  const gender = String(v.gender ?? "male");
  const activity = num(v.activity, 1.2);

  if (weight <= 0 || height <= 0 || age <= 0) return "Please provide valid values.";

  let bmr: number;
  if (gender === "female") {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  }

  const tdee = bmr * activity;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    maintain: Math.round(tdee),
    lose: Math.round(tdee - 500),
    gain: Math.round(tdee + 500),
  };
}

function calcBodyFat(v: Record<string, string | number>) {
  const gender = String(v.gender ?? "male");
  const waist = num(v.waist);
  const neck = num(v.neck);
  const height = num(v.height);
  const hip = num(v.hip);

  if (waist <= 0 || neck <= 0 || height <= 0) return "Please enter valid measurements.";
  if (gender === "female" && hip <= 0) return "Hip measurement is required for female body fat calculation.";

  let bodyFat: number;
  if (gender === "male") {
    const diff = waist - neck;
    if (diff <= 0) return "Waist must be greater than neck for males.";
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(height)) - 450;
  } else {
    const sum = waist + hip - neck;
    if (sum <= 0) return "Invalid measurements for female body fat calculation.";
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(sum) + 0.22100 * Math.log10(height)) - 450;
  }

  let category: string;
  if (gender === "male") {
    if (bodyFat < 6) category = "Essential Fat";
    else if (bodyFat < 14) category = "Athletes";
    else if (bodyFat < 18) category = "Fitness";
    else if (bodyFat < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bodyFat < 14) category = "Essential Fat";
    else if (bodyFat < 21) category = "Athletes";
    else if (bodyFat < 25) category = "Fitness";
    else if (bodyFat < 32) category = "Average";
    else category = "Obese";
  }

  const weight = num(v.weight, 0);
  const leanMass = weight > 0 ? (weight * (1 - bodyFat / 100)).toFixed(1) : "N/A";

  return {
    bodyFat: bodyFat.toFixed(1) + "%",
    category,
    leanMass: weight > 0 ? leanMass + " kg" : "Provide weight for lean mass",
  };
}

function calcIdealWeight(v: Record<string, string | number>) {
  const heightCm = num(v.height);
  const gender = String(v.gender ?? "male");
  const frame = String(v.frame ?? "medium");

  if (heightCm <= 0) return "Please enter a valid height.";

  let base: number;
  if (gender === "male") {
    base = 48 + 2.7 * ((heightCm - 152.4) / 2.54);
  } else {
    base = 45.5 + 2.2 * ((heightCm - 152.4) / 2.54);
  }

  let idealLow: number;
  let idealMid: number;
  let idealHigh: number;

  if (frame === "small") {
    idealLow = Math.round((base * 0.9 - base * 0.1) * 10) / 10;
    idealMid = Math.round(base * 0.9 * 10) / 10;
    idealHigh = Math.round(base * 10) / 10;
  } else if (frame === "large") {
    idealLow = Math.round(base * 10) / 10;
    idealMid = Math.round(base * 1.1 * 10) / 10;
    idealHigh = Math.round((base * 1.1 + base * 0.1) * 10) / 10;
  } else {
    idealLow = Math.round(base * 0.9 * 10) / 10;
    idealMid = Math.round(base * 10) / 10;
    idealHigh = Math.round(base * 1.1 * 10) / 10;
  }

  const hamwi = Math.round(base * 10) / 10;

  return {
    idealLow: idealLow.toFixed(1) + " kg",
    idealMid: idealMid.toFixed(1) + " kg",
    idealHigh: idealHigh.toFixed(1) + " kg",
    hamwi: hamwi.toFixed(1) + " kg",
  };
}

function calcPregnancyDue(v: Record<string, string | number>) {
  const lmpStr = String(v.lastPeriod ?? "");
  if (!lmpStr) return "Please select the last menstrual period date.";

  const lmp = new Date(lmpStr);
  if (isNaN(lmp.getTime())) return "Invalid date provided.";

  const now = new Date();
  if (lmp.getTime() > now.getTime()) return "Last period date cannot be in the future.";

  const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

  const diffMs = now.getTime() - lmp.getTime();
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const weeks = Math.max(0, Math.floor(diffDays / 7));
  const days = Math.max(0, diffDays % 7);

  let trimester: number;
  if (weeks < 13) trimester = 1;
  else if (weeks < 27) trimester = 2;
  else trimester = 3;

  const daysRemaining = Math.max(0, Math.ceil((dueDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));

  return {
    dueDate: dueDate.toISOString().split("T")[0],
    currentWeek: weeks,
    currentDay: days,
    trimester,
    daysRemaining,
  };
}

// ================================================================
// MATH CALCULATORS
// ================================================================

function calcPercentage(v: Record<string, string | number>) {
  const mode = String(v.mode ?? "percentOf");
  const val1 = num(v.value1);
  const val2 = num(v.value2);

  switch (mode) {
    case "percentOf": {
      if (val2 === 0) return "Y cannot be zero.";
      const result = (val1 / 100) * val2;
      return { result: result.toFixed(2), label: `${val1}% of ${val2} = ${result.toFixed(2)}` };
    }
    case "whatPercent": {
      if (val2 === 0) return "Y cannot be zero.";
      const result = (val1 / val2) * 100;
      return { result: result.toFixed(2) + "%", label: `${val1} is ${result.toFixed(2)}% of ${val2}` };
    }
    case "percentChange": {
      if (val1 === 0) return "X cannot be zero.";
      const result = ((val2 - val1) / Math.abs(val1)) * 100;
      const direction = result >= 0 ? "increase" : "decrease";
      return { result: Math.abs(result).toFixed(2) + "%", label: `${Math.abs(result).toFixed(2)}% ${direction} from ${val1} to ${val2}` };
    }
    default:
      return "Invalid mode selected.";
  }
}

function calcAge(v: Record<string, string | number>) {
  const dobStr = String(v.birthDate ?? "");
  if (!dobStr) return "Please select your date of birth.";

  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return "Invalid date provided.";

  const now = new Date();
  if (dob.getTime() > now.getTime()) return "Birth date cannot be in the future.";

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = now.getTime() - dob.getTime();
  const totalDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const totalHours = Math.floor(diffMs / (60 * 60 * 1000));
  const totalMinutes = Math.floor(diffMs / (60 * 1000));

  // Next birthday
  let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday.getTime() <= now.getTime()) {
    nextBirthday = new Date(now.getFullYear() + 1, dob.getMonth(), dob.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (24 * 60 * 60 * 1000));

  return {
    years,
    months,
    days,
    totalDays,
    totalHours,
    totalMinutes,
    nextBirthday: nextBirthday.toISOString().split("T")[0] + ` (${daysUntilBirthday} days away)`,
  };
}

function calcUnitConverter(v: Record<string, string | number>) {
  const category = String(v.category ?? "length");
  const fromUnit = String(v.fromUnit ?? "m");
  const toUnit = String(v.toUnit ?? "km");
  const inputValue = num(v.inputValue);

  if (category === "temperature") {
    return convertTemperature(inputValue, fromUnit, toUnit);
  }

  const unitTable: Record<string, Record<string, number>> = {
    length: LENGTH_UNITS,
    weight: WEIGHT_UNITS,
    volume: VOLUME_UNITS,
    speed: SPEED_UNITS,
  };

  const table = unitTable[category];
  if (!table) return "Invalid category.";
  if (!(fromUnit in table) || !(toUnit in table)) return "Invalid unit selection.";

  const baseValue = inputValue * table[fromUnit];
  const convertedValue = baseValue / table[toUnit];

  return { convertedValue: convertedValue.toFixed(4) };
}

function convertTemperature(value: number, from: string, to: string) {
  let celsius: number;
  // Convert to Celsius first
  switch (from) {
    case "C": celsius = value; break;
    case "F": celsius = (value - 32) * (5 / 9); break;
    case "K": celsius = value - 273.15; break;
    default: return "Invalid temperature unit.";
  }

  // Convert from Celsius to target
  let result: number;
  switch (to) {
    case "C": result = celsius; break;
    case "F": result = celsius * (9 / 5) + 32; break;
    case "K": result = celsius + 273.15; break;
    default: return "Invalid temperature unit.";
  }

  return { convertedValue: result.toFixed(4) };
}

function calcGPA(v: Record<string, string | number>) {
  let totalGradePoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= 4; i++) {
    const grade = num(v[`grade${i}`]);
    const credits = num(v[`credits${i}`]);
    if (credits > 0) {
      totalGradePoints += grade * credits;
      totalCredits += credits;
    }
  }

  if (totalCredits === 0) return "Please enter at least one course with credits.";

  const gpa = totalGradePoints / totalCredits;

  return {
    gpa: gpa.toFixed(2),
    totalCredits,
    totalGradePoints: totalGradePoints.toFixed(2),
  };
}

function calcGrade(v: Record<string, string | number>) {
  let weightedSum = 0;
  let totalWeight = 0;

  for (let i = 1; i <= 5; i++) {
    const score = num(v[`score${i}`]);
    const weight = num(v[`weight${i}`]);
    if (weight > 0) {
      weightedSum += score * weight;
      totalWeight += weight;
    }
  }

  if (totalWeight === 0) return "Please enter at least one score with weight.";

  const weightedAverage = weightedSum / totalWeight;

  let letterGrade: string;
  if (weightedAverage >= 93) letterGrade = "A";
  else if (weightedAverage >= 90) letterGrade = "A-";
  else if (weightedAverage >= 87) letterGrade = "B+";
  else if (weightedAverage >= 83) letterGrade = "B";
  else if (weightedAverage >= 80) letterGrade = "B-";
  else if (weightedAverage >= 77) letterGrade = "C+";
  else if (weightedAverage >= 73) letterGrade = "C";
  else if (weightedAverage >= 70) letterGrade = "C-";
  else if (weightedAverage >= 67) letterGrade = "D+";
  else if (weightedAverage >= 60) letterGrade = "D";
  else letterGrade = "F";

  return {
    weightedAverage: weightedAverage.toFixed(2),
    letterGrade,
  };
}

// ================================================================
// EVERYDAY CALCULATORS
// ================================================================

function calcFuelCost(v: Record<string, string | number>) {
  const distance = num(v.distance);
  const mileage = num(v.mileage);
  const fuelPrice = num(v.fuelPrice);

  if (distance <= 0 || mileage <= 0 || fuelPrice <= 0) return "Please provide valid positive values.";

  const fuelNeeded = distance / mileage;
  const totalCost = fuelNeeded * fuelPrice;
  const costPerKm = totalCost / distance;

  return {
    fuelNeeded: fuelNeeded.toFixed(2) + " L",
    totalCost: totalCost.toFixed(2) + " PKR",
    costPerKm: costPerKm.toFixed(2) + " PKR/km",
  };
}

function calcCurrency(v: Record<string, string | number>) {
  const amount = num(v.amount);
  const from = String(v.fromCurrency ?? "USD");
  const to = String(v.toCurrency ?? "PKR");

  if (amount < 0) return "Amount cannot be negative.";
  if (!EXCHANGE_RATES[from] || !EXCHANGE_RATES[to]) return "Invalid currency selection.";

  // Convert to USD first, then to target
  const inUSD = amount / EXCHANGE_RATES[from];
  const convertedAmount = inUSD * EXCHANGE_RATES[to];
  const rate = EXCHANGE_RATES[to] / EXCHANGE_RATES[from];

  return {
    convertedAmount: convertedAmount.toFixed(2),
    rate: rate.toFixed(4),
  };
}

function calcTimezone(v: Record<string, string | number>) {
  const timeStr = String(v.time ?? "");
  const fromDateStr = String(v.fromDate ?? "");
  const fromTz = String(v.fromTimezone ?? "UTC");
  const toTz = String(v.toTimezone ?? "PKT");

  if (!timeStr || !fromDateStr) return "Please provide time and date.";

  // Parse HH:MM format (value may be passed as string or number)
  const timeParts = String(timeStr).split(":");
  if (timeParts.length < 2) return "Invalid time format. Use HH:MM.";

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);

  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return "Invalid time. Hours: 0-23, Minutes: 0-59.";
  }

  const date = new Date(fromDateStr);
  if (isNaN(date.getTime())) return "Invalid date provided.";

  // Create a UTC timestamp from the source timezone
  const fromOffset = TIMEZONE_OFFSETS[fromTz] ?? 0;
  const toOffset = TIMEZONE_OFFSETS[toTz] ?? 0;

  // Minutes since midnight in source timezone
  const sourceMinutes = hours * 60 + minutes;

  // Convert source time to UTC (subtract source offset)
  const utcMinutes = sourceMinutes - fromOffset * 60;

  // Convert UTC to target timezone (add target offset)
  const targetMinutes = utcMinutes + toOffset * 60;

  // Normalize to 0-1439
  let normalizedMinutes = ((targetMinutes % 1440) + 1440) % 1440;
  const targetHours = Math.floor(normalizedMinutes / 60);
  const targetMins = normalizedMinutes % 60;

  // Calculate date difference
  const dayDiff = Math.floor(targetMinutes / 1440) - Math.floor(utcMinutes / 1440);

  let dateDifference = "";
  if (dayDiff > 0) dateDifference = `+${dayDiff} day${dayDiff > 1 ? "s" : ""}`;
  else if (dayDiff < 0) dateDifference = `${dayDiff} day${dayDiff < -1 ? "s" : ""}`;
  else dateDifference = "Same day";

  const convertedTime = `${String(targetHours).padStart(2, "0")}:${String(targetMins).padStart(2, "0")}`;

  return {
    convertedTime,
    timezoneNames: `${fromTz} → ${toTz}`,
    dateDifference,
  };
}

function calcPasswordGen(v: Record<string, string | number>) {
  const length = Math.min(64, Math.max(4, Math.round(num(v.length, 16))));
  const useUpper = String(v.uppercase ?? "true") === "true";
  const useLower = String(v.lowercase ?? "true") === "true";
  const useNumbers = String(v.numbers ?? "true") === "true";
  const useSymbols = String(v.symbols ?? "true") === "true";

  if (!useUpper && !useLower && !useNumbers && !useSymbols) {
    return "Select at least one character type.";
  }

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let chars = "";
  const required: string[] = [];

  if (useUpper) { chars += upper; required.push(upper); }
  if (useLower) { chars += lower; required.push(lower); }
  if (useNumbers) { chars += numbers; required.push(numbers); }
  if (useSymbols) { chars += symbols; required.push(symbols); }

  // Generate password ensuring at least one from each selected type
  const arr: string[] = [];
  for (const req of required) {
    arr.push(req[Math.floor(Math.random() * req.length)]);
  }
  while (arr.length < length) {
    arr.push(chars[Math.floor(Math.random() * chars.length)]);
  }

  // Shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const password = arr.join("");

  // Strength assessment
  let strength: string;
  let score = 0;
  if (length >= 8) score++;
  if (length >= 12) score++;
  if (length >= 16) score++;
  if (useUpper) score++;
  if (useLower) score++;
  if (useNumbers) score++;
  if (useSymbols) score++;

  if (score <= 3) strength = "Weak";
  else if (score <= 5) strength = "Medium";
  else if (score <= 6) strength = "Strong";
  else strength = "Very Strong";

  return { password, strength };
}