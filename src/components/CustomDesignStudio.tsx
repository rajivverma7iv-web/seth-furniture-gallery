import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Ruler,
  CheckCircle2,
  MessageCircle,
  Phone,
  HelpCircle,
  Send,
  Calendar,
  Home,
  Check,
} from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { createWhatsAppCustomQuoteLink, formatINR } from '../utils/storeHelpers';

export const CustomDesignStudio: React.FC = () => {
  const [furnitureType, setFurnitureType] = useState('Hydraulic Storage Bed');
  const [dimensionChoice, setDimensionChoice] = useState('King Size (78" x 72")');
  const [customDimensionInput, setCustomDimensionInput] = useState('');
  const [woodMaterial, setWoodMaterial] = useState('Teak / Sagwan Wood Frame + HDHMR');
  const [finishUpholstery, setFinishUpholstery] = useState('Anti-Stain Velvet Fabric');
  const [storageOption, setStorageOption] = useState('German Heavy-duty Hydraulic Lift');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerLocality, setCustomerLocality] = useState('Jahangirpuri, Delhi');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic estimate calculation based on selections
  const baseEstimates: Record<string, { min: number; max: number }> = {
    'Hydraulic Storage Bed': { min: 29000, max: 42000 },
    'Modular L-Shape Sofa': { min: 32000, max: 46000 },
    'Chesterfield 3+1+1 Sofa': { min: 36000, max: 52000 },
    'Solid Sheesham Dining Set (6-Seater)': { min: 28000, max: 38000 },
    'Italian Marble Top Dining Set': { min: 45000, max: 65000 },
    'Fitted Sliding Wardrobe': { min: 35000, max: 58000 },
    'Designer Center / Coffee Table': { min: 9000, max: 18000 },
  };

  const currentEstimate = baseEstimates[furnitureType] || { min: 25000, max: 40000 };

  const finalDimensions =
    dimensionChoice === 'Custom Measurements' && customDimensionInput
      ? customDimensionInput
      : dimensionChoice;

  const handleWhatsAppSend = () => {
    const link = createWhatsAppCustomQuoteLink({
      itemType: furnitureType,
      dimensions: finalDimensions,
      material: woodMaterial,
      finish: finishUpholstery,
      notes: `${notes ? notes + ' | ' : ''}Storage: ${storageOption} | Area: ${customerLocality}`,
      customerName: customerName || 'Valued Customer',
    });
    window.open(link, '_blank');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="custom-orders" className="py-16 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Made-to-Order Workshop</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            Custom Furniture Designed for Your Home
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base font-light">
            Need a specific sofa length, custom bed storage depth, or wall-to-wall wardrobe? Our seasoned in-house craftsmen build furniture tailored to your exact specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form: The Builder */}
          <div className="lg:col-span-7 bg-stone-50 p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 text-left">
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <span>Select Furniture Type</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3">
                {[
                  'Hydraulic Storage Bed',
                  'Modular L-Shape Sofa',
                  'Chesterfield 3+1+1 Sofa',
                  'Solid Sheesham Dining Set (6-Seater)',
                  'Italian Marble Top Dining Set',
                  'Fitted Sliding Wardrobe',
                  'Designer Center / Coffee Table',
                ].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFurnitureType(type)}
                    className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                      furnitureType === type
                        ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100/80'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <span>Dimensions & Size</span>
              </h3>
              <div className="flex flex-wrap gap-2.5 mt-3">
                {[
                  'King Size (78" x 72")',
                  'Queen Size (78" x 60")',
                  'Custom Measurements',
                  '6-Seater Standard',
                  '4-Seater Compact',
                  'Ceiling-to-Floor Fitted',
                ].map((dim) => (
                  <button
                    key={dim}
                    type="button"
                    onClick={() => setDimensionChoice(dim)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      dimensionChoice === dim
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {dim}
                  </button>
                ))}
              </div>

              {dimensionChoice === 'Custom Measurements' && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="e.g. 84 inches width x 36 inches depth x 32 inches height"
                    value={customDimensionInput}
                    onChange={(e) => setCustomDimensionInput(e.target.value)}
                    className="w-full text-xs p-3 bg-white border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-800 focus:outline-none"
                  />
                  <p className="text-[11px] text-stone-500 mt-1">
                    Enter rough measurements or wall dimensions in inches/feet.
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Timber & Core Materials */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <span>Timber, Polish & Upholstery</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Frame Timber / Board:
                  </label>
                  <select
                    value={woodMaterial}
                    onChange={(e) => setWoodMaterial(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800"
                  >
                    <option value="Teak / Sagwan Wood Frame + HDHMR">
                      CP Sagwan / Teak Wood + HDHMR
                    </option>
                    <option value="Pure 100% Solid Indian Sheesham">
                      Pure 100% Solid Indian Sheesham (Rosewood)
                    </option>
                    <option value="Action TESA Boiling Water Resistant HDHMR">
                      Action TESA BWP Grade HDHMR (Termite Proof)
                    </option>
                    <option value="Commercial Calibrated Marine Plywood">
                      Marine Grade Calibrated Plywood
                    </option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Fabric / Polish Finish:
                  </label>
                  <select
                    value={finishUpholstery}
                    onChange={(e) => setFinishUpholstery(e.target.value)}
                    className="w-full text-xs p-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800"
                  >
                    <option value="Anti-Stain Velvet Fabric">Anti-Stain Royal Velvet</option>
                    <option value="Water-Repellent Textured Jute / Linen">
                      Textured Jute / Linen
                    </option>
                    <option value="Italian Napa Leatherette">Italian Napa Leatherette</option>
                    <option value="Natural Teak Wax Polish">Natural Teak Honey Polish</option>
                    <option value="High-Gloss PU Scratch-Resistant Polish">
                      High-Gloss PU Mirror Polish
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Storage & Mechanism */}
            <div>
              <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-900 text-amber-100 text-xs flex items-center justify-center font-bold">
                  4
                </span>
                <span>Storage / Mechanical Options</span>
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {[
                  'German Heavy-duty Hydraulic Lift',
                  'Smooth Drawer Pull-Outs',
                  'Full Manual Box Storage',
                  'Non-Storage Sleek Base',
                  'Soft-Close Hettich Hardware',
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStorageOption(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      storageOption === st
                        ? 'bg-amber-900 text-white border-amber-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes Input */}
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Any specific customization notes (Color shade, cushion firmness, headboard design)?
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Need royal blue color with extra firm 40D foam and brass studs on armrests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-3 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column: Instant Estimated Quote & Direct WhatsApp / Phone Dispatch */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <div className="bg-stone-900 text-amber-100 p-6 sm:p-7 rounded-3xl shadow-xl border border-stone-800 space-y-6">
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Bespoke Workshop Quote
                  </span>
                  <h4 className="font-display text-xl font-bold text-white mt-0.5">
                    Estimated Workshop Price
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs bg-amber-950 text-amber-300 px-2 py-1 rounded border border-amber-800/80">
                    Festive Pricing
                  </span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-stone-800/80 p-4 rounded-2xl border border-stone-700/60">
                <p className="text-xs text-stone-400">Approximate Workshop Estimate Range:</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                    {formatINR(currentEstimate.min)} – {formatINR(currentEstimate.max)}
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 mt-1.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Includes material, craftsmanship, termite treatment & factory polish</span>
                </p>
              </div>

              {/* Summary of Configuration */}
              <div className="space-y-2 text-xs text-stone-300">
                <p className="font-bold text-white">Your Custom Configuration:</p>
                <div className="bg-stone-800/50 p-3 rounded-xl space-y-1 text-[11px]">
                  <div>
                    <span className="text-stone-400">Item:</span>{' '}
                    <strong className="text-white">{furnitureType}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">Dimensions:</span>{' '}
                    <strong className="text-white">{finalDimensions}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">Frame/Core:</span>{' '}
                    <strong className="text-white">{woodMaterial}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">Finish/Upholstery:</span>{' '}
                    <strong className="text-white">{finishUpholstery}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400">Storage:</span>{' '}
                    <strong className="text-white">{storageOption}</strong>
                  </div>
                </div>
              </div>

              {/* User contact details for priority follow-up */}
              <div className="space-y-2.5 pt-2 border-t border-stone-800">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="p-2.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                  <input
                    type="tel"
                    placeholder="Phone (Optional)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="p-2.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Locality in Delhi (e.g. Jahangirpuri, Adarsh Nagar)"
                  value={customerLocality}
                  onChange={(e) => setCustomerLocality(e.target.value)}
                  className="w-full p-2.5 text-xs bg-stone-800 border border-stone-700 rounded-xl text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="whatsapp-custom-quote-btn"
                  onClick={handleWhatsAppSend}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Specs to WhatsApp ({STORE_INFO.phone})</span>
                </button>

                <a
                  id="call-custom-quote-btn"
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="w-full flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Store Directly: {STORE_INFO.phone}</span>
                </a>
              </div>

              {/* Free Home Visit Assurance */}
              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>Free doorstep room measurement available in North Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
