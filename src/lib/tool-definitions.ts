export interface CalcTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "finance" | "health" | "math" | "everyday";
  gradient: string;
}

export const calcTools: CalcTool[] = [
  // Finance
  { id: "loan-emi", name: "Loan EMI Calculator", description: "Calculate monthly EMI, total interest and payment schedule for any loan", icon: "🏦", category: "finance", gradient: "from-emerald-500 to-teal-500" },
  { id: "compound-interest", name: "Compound Interest", description: "See how your money grows with compound interest over time", icon: "📈", category: "finance", gradient: "from-emerald-400 to-cyan-500" },
  { id: "salary-tax", name: "Salary Tax Calculator", description: "Calculate income tax on your monthly or annual salary", icon: "💰", category: "finance", gradient: "from-teal-500 to-emerald-600" },
  { id: "tip-calculator", name: "Tip Calculator", description: "Split bills and calculate tips for any group size", icon: "💵", category: "finance", gradient: "from-emerald-600 to-emerald-500" },
  { id: "mortgage-calculator", name: "Mortgage Calculator", description: "Calculate monthly mortgage payments, total interest, and amortization schedule", icon: "🏠", category: "finance", gradient: "from-teal-500 to-cyan-500" },
  { id: "discount", name: "Discount Calculator", description: "Calculate sale prices, savings, and final amounts after discount", icon: "🏷️", category: "finance", gradient: "from-teal-400 to-emerald-500" },
  { id: "profit-margin", name: "Profit Margin", description: "Calculate profit margin, markup, and gross profit from cost and revenue", icon: "📊", category: "finance", gradient: "from-cyan-500 to-teal-500" },
  // Health
  { id: "bmi", name: "BMI Calculator", description: "Calculate your Body Mass Index and see your health category", icon: "⚖️", category: "health", gradient: "from-orange-400 to-amber-500" },
  { id: "calorie", name: "Calorie Calculator", description: "Find your daily calorie needs based on age, weight, and activity level", icon: "🍎", category: "health", gradient: "from-amber-400 to-orange-500" },
  { id: "body-fat", name: "Body Fat Calculator", description: "Estimate your body fat percentage using body measurements", icon: "🏋️", category: "health", gradient: "from-orange-500 to-rose-400" },
  { id: "ideal-weight", name: "Ideal Weight", description: "Find your ideal weight range based on height and gender", icon: "🎯", category: "health", gradient: "from-rose-400 to-orange-400" },
  { id: "pregnancy-due", name: "Due Date Calculator", description: "Estimate your pregnancy due date from the last period", icon: "🤰", category: "health", gradient: "from-amber-500 to-orange-400" },
  // Math
  { id: "percentage", name: "Percentage Calculator", description: "Calculate percentages, increases, decreases, and ratios instantly", icon: "百分之", category: "math", gradient: "from-violet-500 to-purple-500" },
  { id: "age-calculator", name: "Age Calculator", description: "Calculate exact age in years, months, days, hours, and minutes", icon: "🎂", category: "math", gradient: "from-purple-500 to-violet-400" },
  { id: "unit-converter", name: "Unit Converter", description: "Convert between length, weight, temperature, volume, and more", icon: "📏", category: "math", gradient: "from-violet-400 to-indigo-500" },
  { id: "gpa", name: "GPA Calculator", description: "Calculate your Grade Point Average from course grades and credits", icon: "🎓", category: "math", gradient: "from-indigo-500 to-violet-500" },
  { id: "grade", name: "Grade Calculator", description: "Calculate your final grade from assignments, tests, and weights", icon: "📝", category: "math", gradient: "from-purple-400 to-pink-400" },
  // Everyday
  { id: "fuel-cost", name: "Fuel Cost Calculator", description: "Calculate trip fuel cost based on distance, mileage, and fuel price", icon: "⛽", category: "everyday", gradient: "from-cyan-500 to-blue-500" },
  { id: "currency", name: "Currency Converter", description: "Convert between major world currencies with approximate rates", icon: "💱", category: "everyday", gradient: "from-blue-500 to-cyan-400" },
  { id: "timezone", name: "Time Zone Converter", description: "Convert time between different time zones around the world", icon: "🌍", category: "everyday", gradient: "from-cyan-400 to-teal-400" },
  { id: "password-gen", name: "Password Generator", description: "Generate strong, secure random passwords with custom settings", icon: "🔐", category: "everyday", gradient: "from-slate-600 to-slate-500" },
];

export const categoryLabels: Record<string, string> = {
  finance: "Finance",
  health: "Health & Fitness",
  math: "Math & Science",
  everyday: "Everyday Tools",
};

export const categoryGradients: Record<string, string> = {
  finance: "gradient-finance",
  health: "gradient-health",
  math: "gradient-math",
  everyday: "gradient-everyday",
};