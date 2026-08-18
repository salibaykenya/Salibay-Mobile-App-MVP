import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Main Big Image */}
      <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-xs">
        <img
          src={images[activeIndex]}
          alt={`${title} - view ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {/* Index Indicator Pill */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border transition-all ${
                activeIndex === idx
                  ? 'border-zinc-900 ring-1 ring-zinc-900'
                  : 'border-zinc-200 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
