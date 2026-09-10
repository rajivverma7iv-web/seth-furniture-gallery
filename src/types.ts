export type FurnitureCategory =
  | 'all'
  | 'sofas'
  | 'beds'
  | 'dining'
  | 'wardrobes'
  | 'center-tables'
  | 'custom';

export interface FurnitureItem {
  id: string;
  name: string;
  category: 'sofas' | 'beds' | 'dining' | 'wardrobes' | 'center-tables';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages: string[];
  dimensions: string;
  material: string;
  woodType: string;
  finish: string;
  inStock: boolean;
  sameDayDelivery: boolean;
  isCustomizable: boolean;
  isBestseller?: boolean;
  isFestiveOffer?: boolean;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  availableFinishes?: string[];
  availableColors?: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  product: string;
  comment: string;
  verified: boolean;
  tags: ('quality' | 'customization' | 'value' | 'delivery')[];
}

export interface CustomFurnitureForm {
  itemType: string;
  dimensions: string;
  material: string;
  finish: string;
  fabricType: string;
  fabricColor: string;
  storageOption: string;
  additionalNotes: string;
  customerName: string;
  customerPhone: string;
  deliveryLocality: string;
}

export interface CartItem {
  furniture: FurnitureItem;
  quantity: number;
  selectedFinish?: string;
  selectedColor?: string;
  notes?: string;
}
