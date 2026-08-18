import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  Plane,
  Share2,
  ShieldCheck,
  Star,
  Truck,
  UserCheck,
} from 'lucide-react';
import { LandedCostExplainer } from '../components/commerce/LandedCostExplainer';
import { OriginBadge } from '../components/commerce/OriginBadge';
import { ProductGallery } from '../components/commerce/ProductGallery';
import { QuantitySelector } from '../components/commerce/QuantitySelector';
import { StickyAddToCart } from '../components/commerce/StickyAddToCart';
import { VariantSelector } from '../components/commerce/VariantSelector';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    goBack,
    deliveryLocation,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useApp();

  const product = selectedProduct;
  const isWishlisted = isInWishlist(product.id);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variantGroups?.forEach((g) => {
      if (g.options.length > 0) {
        initial[g.name] = g.options[0].label;
      }
    });
    return initial;
  });

  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  const handleVariantSelect = (groupName: string, optionLabel: string) => {
    setSelectedVariants((prev) => ({ ...prev, [groupName]: optionLabel }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to clipboard.', 'success');
  };

  const isLocal = product.origin === 'local';

  return (
    <div className="pb-32 bg-zinc-50 min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 py-2.5 flex items-center justify-between">
        <button
          onClick={goBack}
          className="p-1.5 -ml-1.5 rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-xs font-bold text-zinc-800 truncate max-w-[200px]">
          {product.brand}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full transition-colors ${
              isWishlisted
                ? 'text-rose-600 bg-rose-50'
                : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
          </button>
        </div>
      </header>

      <main className="p-4 space-y-5">
        {/* Gallery */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Title, Brand, Origin */}
        <div className="space-y-2 bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs text-zinc-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-zinc-400">({product.reviewsCount} reviews)</span>
            </div>
          </div>

          <h1 className="text-base font-bold text-zinc-950 leading-snug">
            {product.title}
          </h1>

          <p className="text-xs text-zinc-600 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Origin Banner */}
          <div className="pt-2">
            <OriginBadge
              origin={product.origin}
              originCountry={product.originCountry}
              deliveryDays={product.estDeliveryDays}
              size="md"
            />
          </div>
        </div>

        {/* Pricing & Landed Cost Card */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">Total Landed Price (KES)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-zinc-950 font-mono tracking-tight">
                  {formatKES(product.priceKES)}
                </span>
                {product.originalPriceKES && (
                  <span className="text-xs text-zinc-400 line-through">
                    {formatKES(product.originalPriceKES)}
                  </span>
                )}
              </div>
            </div>

            {product.discountPercentage && (
              <span className="bg-zinc-900 text-white text-xs font-bold px-2 py-1 rounded-lg">
                SAVE {product.discountPercentage}%
              </span>
            )}
          </div>

          {/* Landed cost transparent breakdown button */}
          <button
            onClick={() => setIsExplainerOpen(true)}
            className="w-full p-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-left flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <div className="text-xs font-bold text-zinc-900 group-hover:text-black">
                  Zero Hidden Fees Guarantee
                </div>
                <div className="text-[10px] text-zinc-500">
                  {isLocal
                    ? 'Includes local VAT & warranty'
                    : 'Includes KRA import tax, air cargo & insurance'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-zinc-700">
              <span>View breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Delivery & Destination Estimator */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-900 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-zinc-700" />
              Delivery Estimate
            </span>
            <span className="text-[11px] text-zinc-500 font-medium">
              to {deliveryLocation.area}, {deliveryLocation.county}
            </span>
          </div>

          <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/60 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Est. Delivery: {product.estDeliveryDate}</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              {isLocal
                ? 'Dispatched directly from Salibay Westlands Fulfilment Centre.'
                : `Flown directly via scheduled cargo from ${product.originCountry} export hub.`}
            </p>
          </div>
        </div>

        {/* Variants & Quantity */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-4">
          <VariantSelector
            variantGroups={product.variantGroups || []}
            selectedVariants={selectedVariants}
            onSelectVariant={handleVariantSelect}
          />

          <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
            <div>
              <span className="text-xs font-semibold text-zinc-900 block">Quantity</span>
              <span className="text-[10px] text-zinc-500">{product.stock} units available</span>
            </div>
            <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock} />
          </div>
        </div>

        {/* Key Features & Description */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Key Features & Highlights
          </h3>

          <ul className="space-y-2 text-xs text-zinc-700">
            {product.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-zinc-100 text-xs text-zinc-600 leading-relaxed">
            {product.description}
          </div>
        </div>

        {/* Tech Specs */}
        {product.specs && (
          <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Specifications
            </h3>
            <div className="divide-y divide-zinc-100 text-xs">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="py-2 flex justify-between gap-4">
                  <span className="text-zinc-500 font-medium">{key}</span>
                  <span className="text-zinc-900 font-semibold text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seller Info Card */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Verified Merchant
            </h3>
            {product.seller.verified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <UserCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white font-black text-sm flex items-center justify-center">
              {product.seller.name.charAt(0)}
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900">{product.seller.name}</h4>
              <p className="text-[10px] text-zinc-500 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {product.seller.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-100 text-center text-xs">
            <div>
              <div className="font-bold text-zinc-900">★ {product.seller.rating}</div>
              <div className="text-[10px] text-zinc-400">Rating</div>
            </div>
            <div>
              <div className="font-bold text-zinc-900">{product.seller.salesCount}+</div>
              <div className="text-[10px] text-zinc-400">Orders Fulfilled</div>
            </div>
            <div>
              <div className="font-bold text-zinc-900">{product.seller.responseTime}</div>
              <div className="text-[10px] text-zinc-400">Response</div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="bg-white p-4 rounded-2xl border border-zinc-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Customer Reviews
              </h3>
              <div className="flex items-center gap-1 text-xs font-bold text-zinc-900">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating} / 5.0</span>
              </div>
            </div>

            <div className="space-y-3 divide-y divide-zinc-100">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="pt-2 first:pt-0 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900">{rev.userName}</span>
                    <span className="text-[10px] text-zinc-400">{rev.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    {rev.verifiedPurchase && (
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" /> Verified Kenya Buyer ({rev.location})
                      </span>
                    )}
                  </div>

                  <p className="text-zinc-600 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sticky Bottom Actions */}
      <StickyAddToCart
        product={product}
        selectedVariants={selectedVariants}
        quantity={quantity}
        onOpenExplainer={() => setIsExplainerOpen(true)}
      />

      {/* Landed Cost Explainer Modal */}
      <LandedCostExplainer
        product={product}
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  );
};
