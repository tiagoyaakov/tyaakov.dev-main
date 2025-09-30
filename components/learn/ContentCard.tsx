import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface ContentCardProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  slug: string;
}

export function ContentCard({ title, description, imageUrl, category, slug }: ContentCardProps) {
  return (
    <Link href={`/learn/${slug}`} className="block h-full transition-transform hover:scale-105">
      <Card className="h-full bg-slate-800/50 border-gray-700 overflow-hidden hover:border-[#EE4F27]/50 transition-colors">
        <AspectRatio ratio={16 / 9}>
          <div 
            className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="w-full h-full bg-gradient-to-t from-gray-900/80 to-transparent" />
          </div>
        </AspectRatio>
        <CardHeader>
          <Badge className="w-fit mb-2 bg-[#EE4F27]/20 text-[#EE4F27] border-[#EE4F27]/30">
            {category}
          </Badge>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">
            {description}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <span className="text-[#EE4F27] text-sm font-medium">
            Leia Mais →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
