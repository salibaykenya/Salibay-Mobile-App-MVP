import React, { useState } from 'react';
import { ArrowRight, Globe, Search, ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react';
import { CategoryTile } from '../components/commerce/CategoryTile';
import { FlashSaleSection } from '../components/commerce/FlashSaleSection';
import { HeroBanner } from '../components/commerce/HeroBanner';
import { LandedCostExplainer } from '../components/commerce/LandedCostExplainer';
import { ProductGrid } from '../components/commerce/ProductGrid';
import { HeaderBar } from '../components/layout/HeaderBar';
import { useApp } from '../context/AppContext';

export const HomeScreen: React.FC = () => {
  const { products, categories, navigateTo, deliveryLocation } = useApp();
  const [selectedExplainerProduct, setSelectedExplainerProduct] = useState<any>(null);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);

  // Local Shopify store catalog products are front-and-center on Home
  const localShopifyProducts = products.filter((p) => p.origin === 'local');
  const flashDeals = localShopifyProducts.filter((p) => p.isFlashDeal || p.discountPercentage);

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      <HeaderBar showSearch={true} />

      <main className="space-y-5">
        {/* Global Search API Discovery Callout */}
        <div className="px-4 pt-3">
          <div
            onClick={() => navigateTo('search')}
            className="p-3 bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-2xl text-white flex items-center justify-between cursor-pointer shadow-sm hover:opacity-95 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-pink-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <span>Search Global USA & UK Stores</span>
                  <span className="bg-[#E6007E] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                    Live Search
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300">
                  Search millions of items worldwide direct to Kenya
                </p>
              </div>
            </div>
            <Search className="w-4 h-4 text-zinc-400" />
          </div>
        </div>

        {/* Salibay Hero Banner */}
        <div className="px-4">
          <HeroBanner
            featuredProduct={localShopifyProducts[0] || products[0]}
            onExploreDrops={() => navigateTo('search_results', { searchQuery: '' })}
            onOpenExplainer={() => {
              setSelectedExplainerProduct(localShopifyProducts[0] || products[0]);
              setIsExplainerOpen(true);
            }}
          />
        </div>

        {/* Categories Horizontal Carousel */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Browse Categories
            </h3>
            <button
              onClick={() => navigateTo('categories')}
              className="text-xs font-bold text-[#E6007E] hover:text-[#d00072] flex items-center gap-0.5 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex gap-2.5 overflow-x-auto px-4 no-scrollbar">
            {categories.map((cat) => (
              <CategoryTile
                key={cat.id}
                category={cat}
                onPress={() => navigateTo('search_results', { categoryId: cat.slug })}
              />
            ))}
          </div>
        </div>

        {/* Flash Deals Section */}
        {flashDeals.length > 0 && (
          <div className="px-4">
            <FlashSaleSection products={flashDeals} />
          </div>
        )}

        {/* Main Store Catalog Grid (Local Store Inventory) */}
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-900">
                🇰🇪 Nairobi Fast Dispatch (24-48H)
              </h3>
              <p className="text-[11px] text-zinc-500">
                Delivering to {deliveryLocation.area}, {deliveryLocation.county}
              </p>
            </div>

            <span className="text-[11px] font-mono text-zinc-400">
              {localShopifyProducts.length} items
            </span>
          </div>

          <ProductGrid products={localShopifyProducts} columns={2} />
        </div>

        {/* Trust & Delivery Options */}
        <div className="px-4">
          <div className="bg-white rounded-2xl border border-zinc-200/80 p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                Shopping with Salibay
              </h4>
              <span className="text-[10px] font-bold text-[#22C55E] bg-emerald-50 px-2 py-0.5 rounded-full">
                100% Genuine Guaranteed
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-[#023E8A]" />
                <span className="text-[11px] font-bold text-zinc-900">Pesapal Secured</span>
                <span className="text-[10px] text-zinc-500">M-Pesa & Cards</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-[#22C55E]" />
                <span className="text-[11px] font-bold text-zinc-900">Pay on Delivery</span>
                <span className="text-[10px] text-zinc-500">Nairobi Region</span>
              </div>

              <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-100 flex flex-col items-center gap-1.5">
                <Zap className="w-5 h-5 text-[#E6007E]" />
                <span className="text-[11px] font-bold text-zinc-900">Fast Dispatch</span>
                <span className="text-[10px] text-zinc-500">KSh 250 flat</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {selectedExplainerProduct && (
        <LandedCostExplainer
          product={selectedExplainerProduct}
          isOpen={isExplainerOpen}
          onClose={() => setIsExplainerOpen(false)}
        />
      )}
    </div>
  );
};
