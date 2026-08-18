import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  layout?: 'grid' | 'horizontal';
  columns?: 2 | 3 | 4;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  layout = 'grid',
  columns = 2,
  className = '',
}) => {
  if (layout === 'horizontal') {
    return (
      <div className={`flex flex-col gap-2.5 ${className}`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} layout="horizontal" />
        ))}
      </div>
    );
  }

  const gridColsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${gridColsClass} gap-3 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} layout="grid" />
      ))}
    </div>
  );
};
