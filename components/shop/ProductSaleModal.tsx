"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import type { Product } from './ProductCard';

interface ProductSaleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function ProductSaleModal({ open, onOpenChange, product }: ProductSaleModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[60%] bg-slate-900 border-gray-700 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="mb-6">
            <div className="aspect-video relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden mb-6">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <span className="text-6xl">📦</span>
                </div>
              )}
            </div>
            <DialogTitle className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {product.name}
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-300 leading-relaxed">
              {product.longDescription}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">O que você vai receber:</h3>
            <ul className="space-y-3">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-[#EE4F27] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Investimento</p>
                <p className="text-4xl font-bold text-[#EE4F27]">{product.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Acesso</p>
                <p className="text-lg font-semibold text-white">Vitalício</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-[#EE4F27] hover:bg-[#EE4F27]/90 text-white text-lg py-6"
            >
              Comprar Agora
            </Button>

            <p className="text-center text-sm text-gray-400 mt-4">
              Garantia de 30 dias ou seu dinheiro de volta
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
