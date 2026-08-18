import React from 'react';
import { Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CartItem } from '../../types';
import { formatKES } from '../../utils/formatters';
import { OriginBadge } from './OriginBadge';
import { QuantitySelector } from './QuantitySelector';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateCartQuantity, removeFromCart, navigateTo } = useApp();

  const handleProductClick = () => {
    navigateTo('product_detail', { productId: item.productId });
  };

  return (
    <div
      id={`cart-item-${item.id}`}
      className="p-3.5 bg-white rounded-2xl border border-zinc-200/80 shadow-xs flex gap-3 items-start"
    >
      {/* Thumbnail */}
      <div
        onClick={handleProductClick}
        className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0 cursor-pointer"
      >
        <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <div className="min-w-0">
            <OriginBadge origin={item.product.origin} originCountry={item.product.originCountry} size="sm" />
            <h4
              onClick={handleProductClick}
              className="text-xs font-semibold text-zinc-900 line-clamp-1 mt-1 cursor-pointer hover:text-zinc-700"
            >
              {item.product.title}
            </h4>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-zinc-400 hover:text-rose-600 p-1 transition-colors"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Selected variants */}
        {Object.entries(item.selectedVariants).length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {Object.entries(item.selectedVariants).map(([key, val]) => (
              <span key={key} className="text-[10px] bg-zinc-100 text-zinc-600 px-1.5 py-0.5 rounded font-mono">
                {key}: {val}
              </span>
            ))}
          </div>
        )}

        {/* Price & Quantity Controls */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100">
          <div>
            <span className="text-xs font-bold text-zinc-900">{formatKES(item.itemTotalKES)}</span>
            {item.quantity > 1 && (
              <span className="text-[10px] text-zinc-400 ml-1.5">
                ({formatKES(item.unitPriceKES)} ea)
              </span>
            )}
          </div>

          <QuantitySelector
            quantity={item.quantity}
            onChange={(newQty) => updateCartQuantity(item.id, newQty)}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
};
