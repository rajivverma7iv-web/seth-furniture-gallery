import React from 'react';
import { X, Trash2, Phone, MessageCircle, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { FurnitureItem } from '../types';
import { STORE_INFO } from '../data/furnitureData';
import { formatINR } from '../utils/storeHelpers';

interface QuoteCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: FurnitureItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onSelectProduct: (product: FurnitureItem) => void;
}

export const QuoteCartDrawer: React.FC<QuoteCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const totalEstimate = items.reduce((sum, item) => sum + item.price, 0);
  const totalOriginal = items.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalSavings = totalOriginal - totalEstimate;

  const handleSendWhatsAppQuote = () => {
    if (items.length === 0) return;
    const itemList = items
      .map((item, idx) => `${idx + 1}. ${item.name} (${item.category}) - ₹${item.price.toLocaleString('en-IN')}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hello Seth Furniture Gallery, I have selected the following pieces for our home furnishing estimate:\n\n${itemList}\n\n*Total Estimated Amount: ₹${totalEstimate.toLocaleString('en-IN')}*\n\nCould you please share package discount options, delivery timeline, and customization details? Thank you!`
    );

    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between border-l border-stone-200">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-800" />
            <h3 className="font-display text-lg font-bold text-stone-900">
              My Furniture Estimate
            </h3>
            <span className="text-xs bg-amber-900 text-amber-100 font-bold px-2 py-0.5 rounded-full">
              {items.length}
            </span>
          </div>

          <button
            id="close-drawer-btn"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-left">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-stone-800">Your Estimate Bag is Empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore our beds, sofas, dining tables, and wardrobes and click the heart icon to assemble a complete home package estimate.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-xs text-stone-500 pb-1">
                <span>Selected Showroom Pieces</span>
                <button
                  onClick={onClearAll}
                  className="text-stone-400 hover:text-rose-600 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 cursor-pointer"
                    onClick={() => onSelectProduct(item)}
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4
                        onClick={() => onSelectProduct(item)}
                        className="text-xs font-bold text-stone-900 line-clamp-1 hover:text-amber-800 cursor-pointer"
                      >
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                        {item.woodType}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-bold text-stone-900">
                        {formatINR(item.price)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer & Action CTAs */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4 text-left">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Original Price Total:</span>
                <span className="line-through">{formatINR(totalOriginal)}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Festive Discount Savings:</span>
                  <span>- {formatINR(totalSavings)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Estimated Total:</span>
                <span className="text-base text-amber-900">{formatINR(totalEstimate)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                id="drawer-whatsapp-quote-btn"
                onClick={handleSendWhatsAppQuote}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Estimate to WhatsApp ({STORE_INFO.phone})</span>
              </button>

              <a
                id="drawer-call-btn"
                href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-200 font-semibold py-3 px-4 rounded-xl text-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Showroom to Finalize: {STORE_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
