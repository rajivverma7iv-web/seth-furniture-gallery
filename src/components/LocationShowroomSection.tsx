import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Compass,
  Navigation,
  CheckCircle2,
  Copy,
  Check,
  Building,
  Car,
  Train,
  ExternalLink,
} from 'lucide-react';
import { STORE_INFO } from '../data/furnitureData';
import { getStoreStatus } from '../utils/storeHelpers';

export const LocationShowroomSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const status = getStoreStatus();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${STORE_INFO.name}, ${STORE_INFO.address}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const schedule = [
    { day: 'Tuesday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Wednesday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Thursday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Friday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Saturday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Sunday', hours: '10:30 AM – 8:30 PM', isOpen: true },
    { day: 'Monday', hours: 'Closed (Weekly Off)', isOpen: false },
  ];

  // Current day index in IST (0=Sun, 1=Mon, 2=Tue...)
  const istDate = new Date(
    new Date().getTime() +
      new Date().getTimezoneOffset() * 60000 +
      3600000 * 5.5
  );
  const currentDayOfWeek = istDate.getDay();
  // Map IST day to schedule array: Tue is schedule[0], Sun is schedule[5], Mon is schedule[6]
  const currentScheduleIdx = currentDayOfWeek === 1 ? 6 : currentDayOfWeek === 0 ? 5 : currentDayOfWeek - 2;

  return (
    <section id="location-timings" className="py-16 bg-white border-b border-stone-200/80 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
            What It's Like & Good to Know
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 mt-3 tracking-tight">
            Visit the Showroom & Workshop
          </h2>
          <p className="text-stone-600 mt-2 text-sm sm:text-base font-light">
            Conveniently situated in Mahendra Park, Jahangirpuri right on the main market road, opposite the Fruit Market and near Libra Petrol Pump.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location Details & Landmarks */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Showroom Address Card */}
            <div className="bg-stone-50 p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-amber-900 text-amber-100 rounded-2xl shrink-0 mt-0.5">
                    <MapPin className="w-6 h-6 text-amber-300" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Showroom Address
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mt-0.5">
                      {STORE_INFO.address}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">
                      Located in Mahendra Park, Jahangirpuri, near Adarsh Nagar, North Delhi 110033
                    </p>
                  </div>
                </div>

                <button
                  id="copy-address-btn"
                  onClick={handleCopyAddress}
                  className="p-2.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shrink-0"
                  title="Copy address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Verified Landmarks from prompt */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-stone-200/80 flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Opposite Fruit Market</h4>
                    <p className="text-[11px] text-stone-500">Major recognizable local shopping hub</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200/80 flex items-start gap-2.5">
                  <Car className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Near Libra Petrol Pump</h4>
                    <p className="text-[11px] text-stone-500">Easy vehicle parking & landmark access</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200/80 flex items-start gap-2.5 sm:col-span-2">
                  <Train className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">
                      Delhi Metro Yellow Line Connectivity
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Close to Adarsh Nagar & Jahangirpuri Metro Stations (5–7 mins by e-rickshaw or cab)
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Location */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  id="open-google-maps-btn"
                  href={STORE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-900 hover:bg-amber-800 text-amber-50 px-5 py-3 rounded-xl font-bold text-sm shadow-sm transition-all"
                >
                  <Navigation className="w-4 h-4 text-amber-300" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  id="call-for-directions-btn"
                  href={`tel:${STORE_INFO.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 px-5 py-3 rounded-xl font-bold text-sm shadow-xs transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-800" />
                  <span>Call: {STORE_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Interactive Embedded / Visual Map Card */}
            <div className="rounded-3xl overflow-hidden border border-stone-200 shadow-md relative bg-stone-100 h-64 sm:h-72">
              <iframe
                title="Seth Furniture Gallery Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8893946289067!2d77.1648!3d28.7235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d01878b3cb3ef%3A0xb3e6a987d65b12!2sMahendra%20Park%2C%20Jahangirpuri%2C%20Delhi%2C%20110033!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-stone-200 text-xs flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="font-semibold text-stone-900">Seth Furniture Gallery</span>
                <span className="text-stone-400">|</span>
                <span className="text-stone-500">Opp. Fruit Market</span>
              </div>
            </div>
          </div>

          {/* Right Column: Opening Hours & Good To Know Checklist */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Opening Hours Card */}
            <div className="bg-stone-50 p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-900">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-stone-900">Typical Schedule</h3>
                    <p className="text-xs text-stone-500">Weekly showroom hours</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    status.isOpen
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {status.isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>

              {/* Day-by-Day schedule table */}
              <div className="space-y-2 text-xs">
                {schedule.map((item, idx) => {
                  const isToday = idx === currentScheduleIdx;
                  return (
                    <div
                      key={item.day}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                        isToday
                          ? 'bg-amber-100/90 text-amber-950 font-bold border border-amber-300 shadow-2xs'
                          : 'text-stone-600 hover:bg-stone-100/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isToday && (
                          <span className="w-2 h-2 rounded-full bg-amber-700 animate-ping" />
                        )}
                        <span>{item.day}</span>
                        {isToday && (
                          <span className="text-[10px] bg-amber-900 text-amber-100 px-1.5 py-0.2 rounded font-normal">
                            Today
                          </span>
                        )}
                      </div>
                      <span
                        className={
                          item.isOpen ? 'font-medium text-stone-800' : 'text-rose-600 font-semibold'
                        }
                      >
                        {item.hours}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-[11px] text-stone-500 italic">
                * Note: Listings indicate the store is generally open Tuesday through Sunday, with Monday shown as closed on several directories. Hours may vary on national holidays.
              </div>
            </div>

            {/* Good to Know Summary Card */}
            <div className="bg-stone-900 text-stone-200 p-6 rounded-3xl border border-stone-800 space-y-4">
              <h4 className="font-display text-base font-bold text-amber-200 flex items-center gap-2">
                <span>Good To Know</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Established 1990:</strong> Giving the business more than three decades of operating history and trusted woodwork.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Product Focus:</strong> Complete home furniture including designer sofas, hydraulic beds, dining sets, wardrobes, and custom pieces.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Doorstep Consultation:</strong> In-person woodwork catalog viewing, fabric swatches & space measurement across Delhi NCR.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
