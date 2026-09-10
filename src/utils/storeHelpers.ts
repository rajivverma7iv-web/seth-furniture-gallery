import { STORE_INFO } from '../data/furnitureData';

export interface StoreStatus {
  isOpen: boolean;
  message: string;
  subtext: string;
  nextEvent: string;
}

export function getStoreStatus(customDate?: Date): StoreStatus {
  // Use Indian Standard Time (UTC+5:30)
  const now = customDate || new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 3600000 * 5.5);

  const day = istDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
  const hour = istDate.getHours();
  const minute = istDate.getMinutes();
  const currentTimeInMinutes = hour * 60 + minute;

  const openingTimeInMinutes = 10 * 60 + 30; // 10:30 AM = 630 mins
  const closingTimeInMinutes = 20 * 60 + 30; // 8:30 PM = 1230 mins

  // Monday is closed
  if (day === 1) {
    return {
      isOpen: false,
      message: 'Closed Today (Monday)',
      subtext: 'Opens Tuesday at 10:30 AM',
      nextEvent: 'Opens Tue 10:30 AM',
    };
  }

  if (currentTimeInMinutes >= openingTimeInMinutes && currentTimeInMinutes < closingTimeInMinutes) {
    const minsUntilClose = closingTimeInMinutes - currentTimeInMinutes;
    const hoursLeft = Math.floor(minsUntilClose / 60);
    const minsLeft = minsUntilClose % 60;

    const closingWarning =
      minsUntilClose <= 60
        ? `Closing in ${minsLeft}m (at 8:30 PM)`
        : `Open until 8:30 PM`;

    return {
      isOpen: true,
      message: closingWarning,
      subtext: `Walk-in Showroom Open • Phone inquiries active`,
      nextEvent: 'Closes 8:30 PM',
    };
  } else if (currentTimeInMinutes < openingTimeInMinutes) {
    return {
      isOpen: false,
      message: 'Opens Today at 10:30 AM',
      subtext: 'Currently preparing showroom. Phone / WhatsApp inquiries welcome!',
      nextEvent: 'Opens 10:30 AM',
    };
  } else {
    const nextDayString = day === 0 ? 'Closed on Monday (Opens Tuesday 10:30 AM)' : 'Opens tomorrow at 10:30 AM';
    return {
      isOpen: false,
      message: 'Closed for the night (Closed at 8:30 PM)',
      subtext: nextDayString,
      nextEvent: 'Opens tomorrow 10:30 AM',
    };
  }
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function createWhatsAppProductLink(productName: string, id: string, price: number): string {
  const text = encodeURIComponent(
    `Hello Seth Furniture Gallery, I am interested in "${productName}" (ID: ${id}) listed at ₹${price.toLocaleString('en-IN')}. Could you please share more details, customization options, and availability?`
  );
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
}

export function createWhatsAppCustomQuoteLink(details: {
  itemType: string;
  dimensions: string;
  material: string;
  finish: string;
  notes: string;
  customerName?: string;
}): string {
  const text = encodeURIComponent(
    `Hello Seth Furniture Gallery! I would like a quote for a custom furniture piece:
- Type: ${details.itemType}
- Dimensions: ${details.dimensions || 'Standard'}
- Preferred Material: ${details.material}
- Preferred Finish: ${details.finish}
${details.notes ? `- Special Requests: ${details.notes}` : ''}
${details.customerName ? `- Name: ${details.customerName}` : ''}

Looking forward to your expert advice & estimate. Thank you!`
  );
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
}
