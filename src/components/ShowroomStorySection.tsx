import React, { useState } from 'react';
import { Award, ShieldCheck, Truck, Sparkles, Check, Phone, MessageCircle } from 'lucide-react';
import { STORE_INFO, SHOWROOM_FEATURES } from '../data/furnitureData';

export const ShowroomStorySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'heritage' | 'materials' | 'process'>('heritage');

  const showroomPhotos = [
    {
      title: 'Living Room Showroom Display',
      category: 'Chesterfield & L-Shape Sectionals',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Bedroom Sets & Hydraulic Storage',
      category: 'King & Queen Beds',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Solid Wood & Marble Dining Pavilion',
      category: '4, 6 & 8-Seater Dining Sets',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Modular Wardrobes & Storage Lofts',
      category: 'Sliding & Hinged Units',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="about-showroom" className="py-16 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span>Serving Delhi NCR Since 1990</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            The Seth Furniture Gallery Story
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base font-light">
            Founded in 1990 in Mahendra Park, Jahangirpuri, Seth Furniture Gallery has grown into one of North Delhi’s most recognized and dependable local furniture institutions.
          </p>
        </div>

        {/* 6 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SHOWROOM_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all text-left space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-bold">
                <span className="text-xs">{idx + 1}</span>
              </div>
              <h3 className="font-display text-base font-bold text-stone-900">
                {feature.title}
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Gallery Showcase Grid ("Online business listings include showroom & product photographs") */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 text-left">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Inside The Showroom
              </span>
              <h3 className="font-display text-2xl font-bold text-stone-900 mt-0.5">
                Explore Our Mahendra Park Display
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-sm">
              Visit us opposite Fruit Market & near Libra Petrol Pump to inspect the timber grain, test cushion firmness, and speak with master carpenters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {showroomPhotos.map((photo, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-square bg-stone-100 shadow-xs border border-stone-200"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wide">
                    {photo.category}
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5 leading-snug">
                    {photo.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
