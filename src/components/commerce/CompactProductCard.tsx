import React from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { formatKES } from '../../utils/formatters';
import { OriginBadge } from './OriginBadge';

interface CompactProductCardProps {
  product: Product;
}

export const CompactProductCard: React.FC<CompactProductCardProps> = ({ product }) => {
  const { navigateTo } = useApp();

  return (
    <div
      id={`compact-product-${product.id}`}
      onClick={() => navigateTo('product_detail', { productId: product.id })}
      className="flex-shrink-0 w-44 bg-white rounded-2xl border border-zinc-200/80 p-2 shadow-xs hover:border-zinc-300 transition-all cursor-pointer select-none"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 mb-2">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discountPercentage && (
          <span className="absolute top-1.5 left-1.5 bg-zinc-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <div className="space-y-1">
        <OriginBadge origin={product.origin} originCountry={product.originCountry} size="sm" />
        <h4 className="text-xs font-medium text-zinc-900 truncate">{product.title}</h4>
        <div className="text-xs font-bold text-zinc-900">{formatKES(product.priceKES)}</div>
      </div>
    </div>
  );
};
