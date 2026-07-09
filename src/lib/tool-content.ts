// CalcHub — Tool page intro text + FAQ data
export const toolContent: Record<string, { intro: string; faqs: { question: string; answer: string }[] }> = {
  'loan-emi': {
    intro: 'Calculate your monthly EMI (Equated Monthly Installment) for any loan — home loan, car loan, personal loan, or education loan — instantly. Enter the loan amount, interest rate, and loan tenure, and get your exact monthly payment, total interest payable, and complete payment breakdown. Our free EMI calculator helps you compare loan offers, plan your budget, and make informed borrowing decisions.',
    faqs: [
      { question: 'How is EMI calculated?', answer: 'EMI is calculated using the formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P = principal loan amount, r = monthly interest rate (annual rate ÷ 12 ÷ 100), and n = total number of monthly payments. Our calculator does this automatically — no math required.' },
      { question: 'What factors affect my EMI?', answer: 'Three factors determine your EMI: (1) Loan amount — higher loan = higher EMI, (2) Interest rate — even a 0.5% difference significantly changes your EMI, and (3) Loan tenure — longer tenure = lower EMI but more total interest. Use our calculator to find the sweet spot.' },
    ],
  },
  'mortgage-calculator': {
    intro: 'Plan your home purchase with our free Mortgage Calculator featuring a full amortization schedule. Enter the home price, down payment, interest rate, and loan term to see your monthly mortgage payment, total interest cost, and a month-by-month breakdown of principal vs. interest. Includes the first 12 months of the amortization table so you can see exactly how your payments are applied.',
    faqs: [
      { question: 'What is an amortization schedule?', answer: 'An amortization schedule is a table showing each monthly payment broken down into the amount going toward principal (reducing your loan balance) vs. interest (the cost of borrowing). Early payments are mostly interest; later payments are mostly principal. Our calculator shows the first 12 months in detail.' },
      { question: 'How much down payment do I need for a house?', answer: 'Conventional loans typically require 5-20% down payment. A 20% down payment lets you avoid Private Mortgage Insurance (PMI). Government-backed loans (FHA, VA, USDA) may require as little as 0-3.5%. Use our calculator to see how different down payments affect your monthly cost.' },
    ],
  },
  'tip-calculator': {
    intro: 'Split restaurant bills and calculate tips effortlessly with our free Tip Calculator. Enter your bill amount, choose a tip percentage (10%, 15%, 18%, 20%, or 25%), and specify the number of people splitting the bill. Instantly see the tip amount, total bill, and each person\'s share — no more awkward math at the dinner table.',
    faqs: [
      { question: 'What is the standard tipping percentage?', answer: 'In the US and Canada, 15-20% of the pre-tax bill is standard for good service. Exceptional service may warrant 22-25%. In Europe, service is often included (check your bill for "service compris"). In Japan and South Korea, tipping is not customary.' },
    ],
  },
  'bmi': {
    intro: 'Check your Body Mass Index (BMI) instantly with our free calculator. Enter your height and weight to see your BMI score and which health category you fall into — underweight, normal, overweight, or obese. BMI is a widely-used screening tool that helps assess weight-related health risks. Note: BMI does not account for muscle mass, so athletes may want to use additional measurements.',
    faqs: [
      { question: 'What is a healthy BMI range?', answer: 'A BMI between 18.5 and 24.9 is considered healthy/normal for most adults. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese. These are general guidelines — consult a healthcare provider for personalized advice.' },
      { question: 'Is BMI accurate for everyone?', answer: 'BMI is a useful screening tool but has limitations. It does not distinguish between muscle and fat, so very muscular people may be classified as "overweight" despite being healthy. It also does not account for body composition differences across ethnicities, ages, and genders.' },
    ],
  },
};
