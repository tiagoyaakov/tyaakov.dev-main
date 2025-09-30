import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LearnDetailPageProps {
  params: {
    slug: string;
  };
}

export default function LearnDetailPage({ params }: LearnDetailPageProps) {
  const formattedSlug = params.slug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Button variant="ghost" className="mb-8 text-gray-300 hover:text-white" asChild>
          <Link href="/learn">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Learn
          </Link>
        </Button>

        <div className="bg-slate-800/50 border border-gray-700 rounded-lg p-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 capitalize">
            {formattedSlug}
          </h1>
          <p className="text-lg text-gray-300">
            Página de conteúdo em desenvolvimento. Este é um placeholder para o slug: <span className="text-[#EE4F27] font-mono">{params.slug}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
