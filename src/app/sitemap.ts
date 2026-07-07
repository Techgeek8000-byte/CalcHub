import { MetadataRoute } from 'next';

const baseUrl = 'https://calc-hub-ashy.vercel.app';

const calcIds = [
  'loan-emi', 'compound-interest', 'salary-tax', 'tip-calculator', 'discount', 'profit-margin',
  'bmi', 'calorie', 'body-fat', 'ideal-weight', 'pregnancy-due',
  'percentage', 'age-calculator', 'unit-converter', 'gpa', 'grade',
  'fuel-cost', 'currency', 'timezone', 'password-gen',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const calcPages = calcIds.map((id) => ({
    url: `${baseUrl}/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...calcPages];
}
