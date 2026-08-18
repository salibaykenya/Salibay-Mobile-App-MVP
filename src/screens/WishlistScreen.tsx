import React from 'react';
import { ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { HeaderBar } from '../components/layout/HeaderBar';
import { OriginBadge } from '../components/commerce/OriginBadge';
import { Badge, BadgeText, Button, Card } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const WishlistScreen: React.FC = () => {
  const { wishlistIds, products, toggleWishlist, addToCart, navigateTo } = useApp();

  const savedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleProductClick = (productId: string) => {
    navigateTo('product_detail', { productId });
  };

  const handleMoveToCart = (product: (typeof products)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  if (savedProducts.length === 0) {
    return (
      <div className="pb-24 bg-zinc-50 min-h-screen">
        <HeaderBar title="Saved Items" showSearch={false} />

        <div className="px-4 py-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-pink-50 flex items-center justify-center mx-auto text-[#E6007E]">
            <Heart className="w-8 h-8 fill-pink-100 text-[#E6007E]" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-900">Your wishlist is empty</h2>
            <p className="text-xs text-zinc-500 max-w-xs mx-auto">
              Tap the heart icon on any local or global product to save it for later.
            </p>
          </div>
          <Button
            size="md"
            variant="solid"
            action="primary"
            onClick={() => navigateTo('home')}
          >
            Discover Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <HeaderBar title={`Saved Items (${savedProducts.length})`} showSearch={false} />

      <main className="px-4 py-4 space-y-3">
        {savedProducts.map((product) => (
          <Card
            key={product.id}
            size="sm"
            variant="elevated"
            onClick={() => handleProductClick(product.id)}
            className="flex gap-3 items-center p-3 cursor-pointer hover:border-zinc-300 transition-all"
          >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <OriginBadge origin={product.origin} originCountry={product.originCountry} size="sm" />
              <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1 mt-1">
                {product.title}
              </h4>

              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-xs font-mono font-extrabold text-zinc-900">
                  {formatKES(product.priceKES)}
                </span>
                {product.originalPriceKES && (
                  <span className="text-[10px] text-zinc-400 line-through font-mono">
                    {formatKES(product.originalPriceKES)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="xs"
                  variant="solid"
                  action="primary"
                  onClick={(e: React.MouseEvent) => handleMoveToCart(product, e)}
                  leftIcon={<ShoppingBag className="w-3 h-3" />}
                >
                  Move to Bag
                </Button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-rose-500 rounded-lg hover:bg-zinc-100 transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
};
