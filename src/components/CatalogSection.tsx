import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Truck,
  Sparkles,
  Heart,
  Phone,
  MessageCircle,
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  X,
} from 'lucide-react';
import { FurnitureCategory, FurnitureItem } from '../types';
import { FURNITURE_ITEMS, STORE_INFO } from '../data/furnitureData';
import { formatINR, createWhatsAppProductLink } from '../utils/storeHelpers';

interface CatalogSectionProps {
  onSelectProduct: (product: FurnitureItem) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: FurnitureItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  onSelectProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FurnitureCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlySameDayDelivery, setOnlySameDayDelivery] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = [
    { id: 'all', label: 'All Furniture' },
    { id: 'sofas', label: 'Sofas & Couches' },
    { id: 'beds', label: 'Beds & Storage' },
    { id: 'dining', label: 'Dining Tables & Chairs' },
    { id: 'wardrobes', label: 'Wardrobes' },
    { id: 'center-tables', label: 'Center Tables' },
  ];

  const filteredItems = useMemo(() => {
    return FURNITURE_ITEMS.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.shortDescription.toLowerCase().includes(q);
        const matchesMaterial = item.material.toLowerCase().includes(q);
        const matchesWood = item.woodType.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesWood) {
          return false;
        }
      }
      // Same-day delivery filter
      if (onlySameDayDelivery && !item.sameDayDelivery) {
        return false;
      }
      // In-stock filter
      if (onlyInStock && !item.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, onlySameDayDelivery, onlyInStock, sortBy]);

  return (
    <section id="catalog" className="py-16 bg-stone-50 border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
            Showroom Selection
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            Designer Home & Custom Furniture
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base font-light">
            Explore ready-to-deliver showroom pieces or request custom dimensions, timber, and fabric finishes for your Delhi home.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => {
            const count =
              cat.id === 'all'
                ? FURNITURE_ITEMS.length
                : FURNITURE_ITEMS.filter((i) => i.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`category-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as FurnitureCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 shadow-md shadow-amber-900/15 ring-2 ring-amber-800'
                    : 'bg-white text-stone-700 hover:bg-stone-100/80 border border-stone-200'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Search, Filters, Sorters */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="furniture-search-input"
              type="text"
              placeholder="Search sofas, beds, Sheesham, marble..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/30 focus:bg-white text-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end">
            <button
              id="filter-same-day-delivery-btn"
              onClick={() => setOnlySameDayDelivery(!onlySameDayDelivery)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                onlySameDayDelivery
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-1 ring-emerald-400'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Same-Day Delivery</span>
            </button>

            <button
              id="filter-in-stock-btn"
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                onlyInStock
                  ? 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-400'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              <span>Showroom Ready</span>
            </button>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-1.5 text-xs text-stone-600 pl-2 border-l border-stone-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-800"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty state if nothing matches */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg font-bold text-stone-900">No matching furniture pieces found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              We also build bespoke furniture from scratch. If you have a specific photo or dimension in mind, our craftsmen can build it!
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setOnlySameDayDelivery(false);
                  setOnlyInStock(false);
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold bg-stone-100 text-stone-800 rounded-lg hover:bg-stone-200"
              >
                Clear Filters
              </button>
              <a
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="px-4 py-2 text-xs font-semibold bg-stone-900 text-amber-200 rounded-lg hover:bg-stone-800"
              >
                Call {STORE_INFO.phone} for Custom Order
              </a>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item) => {
            const isWishlisted = wishlistIds.includes(item.id);
            const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

            return (
              <div
                key={item.id}
                id={`product-card-${item.id}`}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {item.sameDayDelivery && (
                      <span className="inline-flex items-center gap-1 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        <Truck className="w-3 h-3" />
                        Same-Day Delivery
                      </span>
                    )}
                    {item.isCustomizable && (
                      <span className="inline-flex items-center gap-1 bg-stone-900/85 backdrop-blur-xs text-amber-200 text-[10px] font-semibold px-2 py-0.5 rounded shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Customizable Dimensions
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Toggle */}
                  <button
                    id={`wishlist-btn-${item.id}`}
                    onClick={() => onToggleWishlist(item)}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
                      isWishlisted
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/80 hover:bg-white text-stone-700 hover:text-rose-500'
                    }`}
                    title={isWishlisted ? 'Remove from estimate' : 'Add to estimate wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Festive discount pill */}
                  {discount > 0 && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-stone-950 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full shadow-xs">
                      {discount}% Festive Off
                    </div>
                  )}

                  {/* Quick View Button on Hover */}
                  <button
                    id={`quickview-btn-${item.id}`}
                    onClick={() => onSelectProduct(item)}
                    className="absolute inset-x-4 bottom-3 bg-white/95 text-stone-900 py-2 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-md flex items-center justify-center gap-1.5 hover:bg-amber-900 hover:text-white"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications & Dimensions</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                      <span className="capitalize font-medium text-amber-900">
                        {item.category.replace('-', ' ')}
                      </span>
                      <div className="flex items-center gap-1 font-semibold text-stone-800">
                        <span className="text-amber-500">★</span>
                        <span>{item.rating}</span>
                        <span className="text-stone-400">({item.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Product Title */}
                    <h3
                      onClick={() => onSelectProduct(item)}
                      className="font-display text-base font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {item.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 font-light leading-relaxed">
                      {item.shortDescription}
                    </p>

                    {/* Specs Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                      <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200/60 truncate max-w-full">
                        {item.woodType}
                      </span>
                      <span className="bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200/60 truncate max-w-full">
                        {item.finish}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-3 border-t border-stone-100 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-stone-400">Showroom Price</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-extrabold text-stone-900">
                          {formatINR(item.price)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="text-xs text-stone-400 line-through">
                            {formatINR(item.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quick WhatsApp Inquiry */}
                    <div className="flex items-center gap-1.5">
                      <a
                        id={`whatsapp-inquire-${item.id}`}
                        href={createWhatsAppProductLink(item.name, item.id, item.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                        title="Inquire via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>

                      <button
                        id={`details-cta-${item.id}`}
                        onClick={() => onSelectProduct(item)}
                        className="px-3 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-amber-200 hover:text-amber-100 text-xs font-bold transition-all shadow-xs"
                      >
                        Specs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Order Callout Banner */}
        <div className="mt-14 bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950 text-amber-100 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Need a Specific Size or Custom Design?
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              We Craft Furniture To Match Your Exact Wall & Room Dimensions
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Customers frequently highlight our made-to-order beds, sofas, wardrobes, and dining tables. Choose your wood grade, fabric color, foam density, and storage mechanics with direct craftsman guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              id="callout-call-btn"
              href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {STORE_INFO.phone}</span>
            </a>
            <a
              id="callout-whatsapp-btn"
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Seth Furniture Gallery, I have custom furniture requirements and would like an estimate.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Estimate</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
