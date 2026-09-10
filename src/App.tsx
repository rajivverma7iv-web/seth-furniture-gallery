import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { CustomDesignStudio } from './components/CustomDesignStudio';
import { ShowroomStorySection } from './components/ShowroomStorySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationShowroomSection } from './components/LocationShowroomSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteCartDrawer } from './components/QuoteCartDrawer';
import { FloatingActionBar } from './components/FloatingActionBar';
import { FurnitureItem } from './types';
import { FURNITURE_ITEMS, STORE_INFO } from './data/furnitureData';

export default function App() {
  const [wishlist, setWishlist] = useState<FurnitureItem[]>(() => {
    try {
      const saved = localStorage.getItem('seth_furniture_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<FurnitureItem | null>(null);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Save wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('seth_furniture_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const handleToggleWishlist = (product: FurnitureItem) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearWishlist = () => {
    setWishlist([]);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col selection:bg-amber-100 selection:text-amber-900 pb-16 md:pb-0">
      {/* Navigation */}
      <Navbar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <HeroSection
        onExploreCatalog={() => handleNavigate('catalog')}
        onOpenCustomOrders={() => handleNavigate('custom-orders')}
        onOpenDirections={() => handleNavigate('location-timings')}
      />

      {/* Furniture Catalog */}
      <CatalogSection
        onSelectProduct={(product) => setSelectedProduct(product)}
        wishlistIds={wishlist.map((item) => item.id)}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Custom Made-to-Order Studio */}
      <CustomDesignStudio />

      {/* The Showroom Story & Visual Tour */}
      <ShowroomStorySection />

      {/* What People Say / Reviews */}
      <ReviewsSection />

      {/* Showroom Location, Directions, & Hours */}
      <LocationShowroomSection />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isWishlisted={wishlist.some((item) => item.id === selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Estimate Bag / Wishlist Drawer */}
      <QuoteCartDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
        items={wishlist}
        onRemoveItem={handleRemoveFromWishlist}
        onClearAll={handleClearWishlist}
        onSelectProduct={(product) => {
          setIsWishlistDrawerOpen(false);
          setSelectedProduct(product);
        }}
      />

      {/* Floating & Sticky Action Bar */}
      <FloatingActionBar
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setIsWishlistDrawerOpen(true)}
      />
    </div>
  );
}
