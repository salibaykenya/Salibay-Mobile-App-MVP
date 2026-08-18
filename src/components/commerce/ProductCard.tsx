import React from 'react';
import { Heart, MapPin, Plane, ShoppingCart, Star, Zap } from 'lucide-react';
import { DiscountBadge, GlobalReadyTag, LocalReadyTag } from './OriginBadge';
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
  const isLocal = product.origin === 'local';
  const shipsFrom = isLocal ? 'Ships from Kenya' : `Ships from ${product.originCountry || 'Global'}`;

  const handleCardClick = () => {
    navigateTo('product_detail', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    navigateTo('checkout');
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (layout === 'horizontal') {
    return (
      <div
        id={`product-card-horizontal-${product.id}`}
        className="bg-white rounded-2xl border border-zinc-200/80 p-2.5 sm:p-3 shadow-xs hover:border-zinc-300 transition-all flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none overflow-hidden"
        onClick={handleCardClick}
      >
        {/* Thumbnail */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-zinc-50 overflow-hidden shrink-0 relative border border-zinc-100">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Corner Tag */}
          <div className="absolute top-1 left-1">
            {isLocal ? <LocalReadyTag size="sm" /> : <GlobalReadyTag size="sm" />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 truncate">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-700 shrink-0">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="text-xs font-bold text-zinc-900 line-clamp-1">
            {product.title}
          </h3>

          {/* Routing line */}
          <div className="flex items-center gap-1 text-[10px] font-semibold text-zinc-700">
            {isLocal ? (
              <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
            ) : (
              <Plane className="w-3 h-3 text-[#E6007E] shrink-0" />
            )}
            <span className="truncate">{shipsFrom}</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500 font-mono text-[9px] truncate">{product.estDeliveryDays}</span>
          </div>

          <div className="flex items-center justify-between pt-1 gap-1.5">
            <div className="min-w-0 flex-1">
              <PriceBlock
                priceKES={product.priceKES}
                originalPriceKES={product.originalPriceKES}
                size="sm"
              />
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                id={`horizontal-add-cart-${product.id}`}
                onClick={handleAddToCart}
                className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-[11px] font-bold rounded-lg bg-[#E6007E] hover:bg-[#d00071] text-white flex items-center gap-1 shadow-2xs active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                title="Add to Cart"
              >
                <ShoppingCart className="w-3 h-3 shrink-0" />
                <span>Add</span>
              </button>
              <button
                id={`horizontal-buy-now-${product.id}`}
                onClick={handleBuyNow}
                className="px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-[11px] font-bold rounded-lg border border-[#E6007E] text-[#E6007E] hover:bg-pink-50 flex items-center gap-1 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
                title="Buy Now"
              >
                <Zap className="w-3 h-3 fill-[#E6007E] shrink-0" />
                <span>Buy</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Layout (Aligned 2-column card with Add to Cart + Buy Now buttons)
  return (
    <div
      id={`product-card-grid-${product.id}`}
      className="bg-white rounded-2xl border border-zinc-200/80 p-2.5 shadow-xs hover:border-zinc-300 transition-all flex flex-col justify-between h-full cursor-pointer group select-none relative overflow-hidden"
      onClick={handleCardClick}
    >
      <div>
        {/* Product Image Area */}
        <div className="aspect-square w-full rounded-xl bg-zinc-50 overflow-hidden relative border border-zinc-100/80 mb-2">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Top-Left: Local Ready or Global Ready Corner Tag */}
          <div className="absolute top-1.5 left-1.5 z-10">
            {isLocal ? <LocalReadyTag size="sm" /> : <GlobalReadyTag size="sm" />}
          </div>

          {/* Top-Right: Wishlist and Discount */}
          <div className="absolute top-1.5 right-1.5 z-10 flex flex-col items-end gap-1">
            <button
              id={`wishlist-btn-${product.id}`}
              onClick={handleWishlist}
              className={`p-1.5 rounded-full backdrop-blur-md transition-colors shadow-2xs ${
                isWishlisted
                  ? 'bg-rose-50 text-[#E6007E]'
                  : 'bg-white/90 text-zinc-600 hover:text-zinc-900 hover:bg-white'
              }`}
              title="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#E6007E]' : ''}`} />
            </button>
            {product.discountPercentage && (
              <DiscountBadge percentage={product.discountPercentage} size="sm" />
            )}
          </div>
        </div>

        {/* Brand & Rating */}
        <div className="space-y-0.5 mb-1">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="font-bold uppercase tracking-wider truncate">{product.brand}</span>
            <div className="flex items-center gap-0.5 font-bold text-zinc-700 shrink-0">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Fixed height title container for perfect baseline alignment across grid */}
          <h3 className="text-xs font-bold text-zinc-900 line-clamp-2 h-8 leading-4">
            {product.title}
          </h3>
        </div>

        {/* Routing & Fulfillment Badges */}
        <div className="space-y-1 my-1.5">
          {/* Secondary Status Pills */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-700 text-[9px] font-semibold rounded-sm">
              {isLocal ? 'Local Ready' : 'Global Ready'}
            </span>
            <span className="px-1.5 py-0.2 bg-zinc-100 text-zinc-600 text-[9px] rounded-sm truncate">
              {isLocal ? 'Fast local dispatch' : 'Warehouse routed'}
            </span>
          </div>

          {/* Explicit Routing Information */}
          <div className="text-[10px] space-y-0.5 pt-0.5">
            <div className="flex items-center gap-1 font-semibold text-zinc-800">
              {isLocal ? (
                <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
              ) : (
                <Plane className="w-3 h-3 text-[#E6007E] shrink-0" />
              )}
              <span className="truncate">{shipsFrom}</span>
            </div>
            <div className="text-[9px] text-zinc-500 font-mono pl-4 truncate">
              Est: {product.estDeliveryDays}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Pricing + Add to Cart & Buy Now Buttons */}
      <div className="pt-2 border-t border-zinc-100 mt-2 space-y-2">
        <PriceBlock
          priceKES={product.priceKES}
          originalPriceKES={product.originalPriceKES}
          size="sm"
        />

        {/* Add to Cart and Buy Now Stacked Buttons */}
        <div className="flex flex-col gap-1.5">
          <button
            id={`grid-add-cart-${product.id}`}
            onClick={handleAddToCart}
            className="w-full py-1.5 px-2 text-xs font-bold rounded-xl bg-[#E6007E] hover:bg-[#d00071] active:scale-98 text-white flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            id={`grid-buy-now-${product.id}`}
            onClick={handleBuyNow}
            className="w-full py-1 px-2 text-xs font-bold rounded-xl border border-[#E6007E] text-[#E6007E] hover:bg-pink-50 active:scale-98 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3 h-3 fill-[#E6007E]" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
