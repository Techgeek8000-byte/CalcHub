import { Metadata } from 'next';
import { calcMetaMap } from '@/lib/calc-meta';
import CalcPageClient from './_client';

interface Props {
  params: Promise<{ calc: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { calc } = await params;
  const meta = calcMetaMap[calc];
  if (!meta) {
    return {
      title: 'CalcHub - Free Online Calculators',
      description: 'Free online calculators for finance, health, math, and everyday use.',
    };
  }
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
    },
  };
}

export default async function CalcPage({ params }: Props) {
  const { calc } = await params;
  const meta = calcMetaMap[calc];
  return <CalcPageClient calcSlug={calc} calcMeta={meta} />;
}
