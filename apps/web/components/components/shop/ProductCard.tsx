"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  shortDescription: string;
  longDescription: string;
  benefits: string[];
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card 
      className="bg-slate-800/50 border-gray-700 cursor-pointer transition-all hover:border-[#EE4F27] hover:shadow-lg hover:shadow-[#EE4F27]/20 group overflow-hidden"
      onClick={() => onClick(product)}
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-gray-800">
          {product.imageUrl ? (
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <span className="text-4xl">📦</span>
            </div>
          )}
        </div>
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6">
          <p className="text-gray-300 text-sm text-center">{product.shortDescription}</p>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-white">{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-[#EE4F27]">{product.price}</p>
      </CardContent>
    </Card>
  );
}

export type { Product };
