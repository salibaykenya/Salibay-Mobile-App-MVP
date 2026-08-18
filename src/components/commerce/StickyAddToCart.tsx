import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import { Button } from '../primitives';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { formatKES } from '../../utils/formatters';

interface StickyAddToCartProps {
  product: Product;
  selectedVariants: Record<string, string>;
  quantity: number;
  onOpenExplainer: () => void;
}

export const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  product,
  selectedVariants,
  quantity,
  onOpenExplainer,
}) => {
  const { addToCart, navigateTo } = useApp();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants);
  };

  const handleInstantBuy = () => {
    addToCart(product, quantity, selectedVariants);
    navigateTo('checkout');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 shadow-lg">
      <div className="max-w-md mx-auto flex items-center gap-3">
        {/* Price & Landed Cost Breakdown trigger */}
        <div className="shrink-0 cursor-pointer select-none" onClick={onOpenExplainer}>
          <div className="text-[10px] text-zinc-500 font-medium">Landed Price (Nairobi)</div>
          <div className="text-base font-extrabold text-zinc-900 font-mono tracking-tight">
            {formatKES(product.priceKES * quantity)}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium underline decoration-dotted">
            Breakdown & Tax &rsaquo;
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex-1 flex gap-2">
          <Button
            id="sticky-add-cart-btn"
            size="md"
            variant="outline"
            action="default"
            onClick={handleAddToCart}
            className="flex-1"
            leftIcon={<ShoppingBag className="w-4 h-4" />}
          >
            Add to Bag
          </Button>

          <Button
            id="sticky-buy-now-btn"
            size="md"
            variant="solid"
            action="primary"
            onClick={handleInstantBuy}
            className="flex-1"
            leftIcon={<Zap className="w-4 h-4 text-white fill-white" />}
          >
            Buy with M-Pesa
          </Button>
        </div>
      </div>
    </div>
  );
};
