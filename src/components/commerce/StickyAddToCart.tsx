import React from 'react';
import { CreditCard, ShoppingCart, Zap } from 'lucide-react';
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 px-3.5 py-2.5 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2.5">
        {/* Price & Landed Cost Breakdown trigger */}
        <div
          className="shrink-0 cursor-pointer select-none py-0.5"
          onClick={onOpenExplainer}
        >
          <div className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
            Total Price
          </div>
          <div className="text-sm sm:text-base font-extrabold text-zinc-950 font-mono tracking-tight whitespace-nowrap">
            {formatKES(product.priceKES * quantity)}
          </div>
          <div className="text-[10px] text-emerald-600 font-medium hover:underline whitespace-nowrap">
            Cost info &rsaquo;
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 min-w-0">
          <Button
            id="sticky-add-cart-btn"
            size="sm"
            variant="outline"
            action="default"
            onClick={handleAddToCart}
            className="px-3 py-2 text-xs font-bold whitespace-nowrap border-zinc-300 hover:bg-zinc-100"
            leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
          >
            Add to Cart
          </Button>

          <Button
            id="sticky-buy-now-btn"
            size="sm"
            variant="solid"
            action="primary"
            onClick={handleInstantBuy}
            className="px-3.5 py-2 text-xs font-bold whitespace-nowrap shadow-xs"
            leftIcon={<Zap className="w-3.5 h-3.5 text-white fill-white" />}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
