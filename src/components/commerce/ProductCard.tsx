import React from 'react';
import { Heart, Plus, Star } from 'lucide-react';
import { Card, Pressable } from '../primitives';
import { DiscountBadge, GlobalBadge, LocalBadge } from './OriginBadge';
import { PriceBlock } from './PriceBlock';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { navigateTo, toggleWishlist, isInWishlist, addToCart } = useApp();
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product_detail', { productId: product.id });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (layout === 'horizontal') {
    return (
      <Card
        size="sm"
        variant="elevated"
        className="flex-row items-center gap-3 cursor-pointer hover:border-zinc-300"
        onClick={handleCardClick}
      >
        {/* Thumbnail */}
        <div className="w-24 h-24 rounded-xl bg-zinc-100 overflow-hidden shrink-0 relative border border-zinc-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.discountPercentage && (
            <div className="absolute top-1 left-1">
              <DiscountBadge percentage={product.discountPercentage} size="sm" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-zinc-900 line-clamp-1">
            {product.title}
          </h3>

          <div className="pt-0.5">
            {product.origin === 'local' ? (
              <LocalBadge city="Nairobi 24h" size="sm" />
            ) : (
              <GlobalBadge originCountry={product.originCountry} size="sm" />
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <PriceBlock
              priceKES={product.priceKES}
              originalPriceKES={product.originalPriceKES}
              size="sm"
            />
            <button
              onClick={handleQuickAdd}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-[#E6007E] text-white transition-colors"
              title="Add to cart"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </Card>
    );
  }

  // Standard Grid Layout
  return (
    <Card
      size="sm"
      variant="elevated"
      className="p-2.5 rounded-2xl cursor-pointer hover:border-zinc-300 relative group justify-between"
      onClick={handleCardClick}
    >
      <div>
        {/* Product Image Area */}
        <div className="aspect-square w-full rounded-xl bg-zinc-50 overflow-hidden relative border border-zinc-100/80 mb-2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Pill */}
          {product.discountPercentage && (
            <div className="absolute top-1.5 left-1.5">
              <DiscountBadge percentage={product.discountPercentage} size="sm" />
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-1.5 right-1.5 p-1.5 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-rose-50 text-[#E6007E]'
                : 'bg-white/80 text-zinc-600 hover:text-zinc-900 hover:bg-white'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#E6007E]' : ''}`} />
          </button>
        </div>

        {/* Origin Pill */}
        <div className="mb-1">
          {product.origin === 'local' ? (
            <LocalBadge city="Nairobi Hub" size="sm" />
          ) : (
            <GlobalBadge originCountry={product.originCountry} size="sm" />
          )}
        </div>

        {/* Brand & Title */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-bold uppercase tracking-wider">{product.brand}</span>
            <div className="flex items-center gap-0.5 font-bold text-zinc-700">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>
      </div>

      {/* Pricing & Quick Add Button */}
      <div className="pt-2 border-t border-zinc-100 flex items-end justify-between gap-1 mt-1">
        <PriceBlock
          priceKES={product.priceKES}
          originalPriceKES={product.originalPriceKES}
          size="sm"
        />

        <button
          onClick={handleQuickAdd}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-[#E6007E] active:scale-95 text-white transition-all shadow-xs shrink-0"
          title="Add to cart"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
