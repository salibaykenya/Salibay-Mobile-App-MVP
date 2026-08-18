import React, { useState, useMemo } from 'react';
import { ArrowLeft, Clock, Flame, Globe, Search, TrendingUp, X } from 'lucide-react';
import { Badge, BadgeText, Button, Card, Pressable } from '../components/primitives';
import { useApp } from '../context/AppContext';
import { formatKES } from '../utils/formatters';

export const SearchScreen: React.FC = () => {
  const { searchQuery, setSearchQuery, navigateTo, goBack, products, categories } = useApp();
  const [recentSearches, setRecentSearches] = useState([
    'MacBook Pro',
    'Sony XM5',
    'Kenyan Coffee',
    'Anker Power Station',
    'Dyson Airwrap',
  ]);

  const trendingQueries = [
    { text: 'MacBook Pro M4', badge: 'USA Import' },
    { text: 'Sony WH-1000XM5', badge: 'Nairobi 24h' },
    { text: 'Single-Origin Coffee', badge: 'Artisanal' },
    { text: 'Anker PowerHouse', badge: 'Dubai Hub' },
    { text: 'Dyson Airwrap Styler', badge: 'London Direct' },
    { text: 'Handcrafted Safari Bag', badge: 'Local Craft' },
  ];

  // Dynamic live search suggestions matching mock products
  const liveSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const matches = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName?.toLowerCase()?.includes(q) ||
        p.originCountry.toLowerCase().includes(q)
    );
    return matches.slice(0, 6);
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    setSearchQuery(query);
    navigateTo('search_results', { searchQuery: query });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const removeRecent = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((item) => item !== text));
  };

  return (
    <div className="pb-24 bg-zinc-50 min-h-screen">
      {/* Top Search Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <button
            type="button"
            onClick={goBack}
            className="p-1 -ml-1 text-zinc-700 hover:text-zinc-900 rounded-full hover:bg-zinc-100 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search USA, UK & Kenyan products..."
              className="w-full pl-9 pr-9 py-2 bg-zinc-100 focus:bg-white text-xs text-zinc-900 placeholder:text-zinc-400 rounded-xl border border-zinc-200 focus:border-[#E6007E] focus:ring-1 focus:ring-[#E6007E] outline-hidden transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-zinc-400 hover:text-zinc-900 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Button
            size="sm"
            variant="solid"
            action="primary"
            type="submit"
          >
            Search
          </Button>
        </form>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Live Search Suggestions (when typing) */}
        {searchQuery.trim().length > 0 && (
          <div className="space-y-2 animate-in fade-in-50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Matching Suggestions
            </h3>
            <Card size="sm" variant="elevated" className="p-0 divide-y divide-zinc-100 overflow-hidden">
              {liveSuggestions.length > 0 ? (
                liveSuggestions.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      navigateTo('product_detail', { productId: prod.id });
                    }}
                    className="w-full p-3 flex items-center justify-between hover:bg-pink-50/40 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                        <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 line-clamp-1">{prod.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {prod.origin === 'international' ? `✈️ ${prod.originCountry} Direct` : '🇰🇪 Kenya Local'} • {prod.brand}
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#E6007E] shrink-0">
                      {formatKES(prod.priceKES)}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-zinc-500">
                  Press enter to search &ldquo;<strong>{searchQuery}</strong>&rdquo; across all catalogs
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Recent Searches */}
        {searchQuery.trim().length === 0 && recentSearches.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Recent Searches
              </h3>
              <button
                onClick={() => setRecentSearches([])}
                className="text-[11px] text-zinc-400 hover:text-zinc-700 cursor-pointer"
              >
                Clear all
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {recentSearches.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSearch(item)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-zinc-200 rounded-xl text-xs text-zinc-700 hover:border-[#E6007E] cursor-pointer shadow-xs transition-colors"
                >
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>{item}</span>
                  <button
                    onClick={(e) => removeRecent(item, e)}
                    className="p-0.5 text-zinc-400 hover:text-zinc-900 ml-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Sourcing Hubs */}
        {searchQuery.trim().length === 0 && (
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Browse by Origin Store
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'USA Store', flag: '🇺🇸', query: 'USA' },
                { label: 'UK Direct', flag: '🇬🇧', query: 'UK' },
                { label: 'Kenya Local', flag: '🇰🇪', query: 'Kenya' },
                { label: 'Dubai Hub', flag: '🇦🇪', query: 'Dubai' },
              ].map((hub, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(hub.query)}
                  className="p-2.5 bg-white rounded-xl border border-zinc-200/80 hover:border-[#E6007E] flex flex-col items-center justify-center text-center shadow-xs transition-all cursor-pointer"
                >
                  <span className="text-xl mb-1">{hub.flag}</span>
                  <span className="text-[10px] font-bold text-zinc-900">{hub.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches in Kenya */}
        {searchQuery.trim().length === 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-[#E6007E]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                Trending in Kenya
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {trendingQueries.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSearch(item.text)}
                  className="p-3 bg-white rounded-2xl border border-zinc-200/80 hover:border-[#E6007E] transition-all flex items-center justify-between text-left shadow-xs cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-pink-300">0{idx + 1}</span>
                    <span className="text-xs font-semibold text-zinc-900">{item.text}</span>
                  </div>
                  <Badge variant="subtle" action="muted" size="sm">
                    <BadgeText>{item.badge}</BadgeText>
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
