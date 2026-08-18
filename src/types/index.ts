export type ProductOrigin = 'local' | 'international';
export type OriginCountry = 'Kenya' | 'USA' | 'UK' | 'Dubai' | 'China' | 'Germany' | 'Japan';

export interface ProductVariantOption {
  id: string;
  label: string;
  colorHex?: string;
  priceModifierKES?: number;
  inStock?: boolean;
}

export interface ProductVariantGroup {
  name: string;
  options: ProductVariantOption[];
}

export interface SellerInfo {
  id: string;
  name: string;
  rating: number;
  salesCount: number;
  location: string;
  verified: boolean;
  responseTime: string;
  badge?: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  location: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  brand: string;
  priceKES: number;
  originalPriceKES?: number;
  rating: number;
  reviewsCount: number;
  origin: ProductOrigin;
  originCountry: OriginCountry;
  estDeliveryDays: string;
  estDeliveryDate: string;
  deliveryType: 'instant' | 'express' | 'standard';
  categoryId: string;
  images: string[];
  badge?: string;
  stock: number;
  seller: SellerInfo;
  variantGroups?: ProductVariantGroup[];
  features: string[];
  specs: Record<string, string>;
  description: string;
  importDutyKES: number;
  shippingFeeKES: number;
  insuranceFeeKES: number;
  landedCostKES: number;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  discountPercentage?: number;
  reviews?: ReviewItem[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  image: string;
  itemCount: number;
  description: string;
  subcategories: { id: string; name: string; count: number }[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
  unitPriceKES: number;
  itemTotalKES: number;
}

export type OrderStatus =
  | 'order_placed'
  | 'payment_confirmed'
  | 'processing'
  | 'international_flight'
  | 'customs_cleared'
  | 'nairobi_hub'
  | 'out_for_delivery'
  | 'delivered';

export interface OrderTimelineEvent {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  location?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  avatarUrl?: string;
  county: string;
  townCity: string;
  estateBuilding: string;
  houseUnit?: string;
  pickupPoint?: string;
  isDefault?: boolean;
}

export type ShippingMethodId = 'nairobi_standard' | 'outside_nairobi' | 'pay_on_delivery';

export interface ShippingMethodOption {
  id: ShippingMethodId;
  label: string;
  sublabel?: string;
  feeKES: number;
}

export type PaymentMethodType = 'pesapal' | 'cod' | 'partial_deposit';

export interface BillingAddress {
  sameAsShipping: boolean;
  fullName?: string;
  phone?: string;
  county?: string;
  townCity?: string;
  estateBuilding?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotalKES: number;
  shippingKES: number;
  dutiesKES: number;
  insuranceKES: number;
  discountKES: number;
  totalKES: number;
  status: OrderStatus;
  paymentMethod: PaymentMethodType;
  mpesaReceiptNumber?: string;
  shippingAddress: ShippingAddress;
  timeline: OrderTimelineEvent[];
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  originType: 'local' | 'international' | 'mixed';
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  origin?: 'all' | 'local' | 'international';
  originCountry?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'featured' | 'price_low' | 'price_high' | 'rating' | 'fastest_delivery';
  verifiedSellerOnly?: boolean;
  minRating?: number;
  inStockOnly?: boolean;
}

export type ActiveScreen =
  | 'home'
  | 'categories'
  | 'search'
  | 'search_results'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'order_success'
  | 'order_tracking'
  | 'orders'
  | 'wishlist'
  | 'profile'
  | 'landed_cost_info';
