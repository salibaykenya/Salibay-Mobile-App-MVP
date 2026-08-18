import React, { createContext, useContext, useState } from 'react';
import {
  CATEGORIES,
  INITIAL_ORDERS,
  INITIAL_USER_ADDRESS,
  PRODUCTS,
  SHOPIFY_SHIPPING_METHODS,
} from '../data/mockData';
import {
  ActiveScreen,
  BillingAddress,
  CartItem,
  FilterState,
  Order,
  PaymentMethodType,
  Product,
  ShippingAddress,
  ShippingMethodId,
} from '../types';

interface Toast {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  // Navigation
  activeScreen: ActiveScreen;
  screenHistory: ActiveScreen[];
  navigateTo: (
    screen: ActiveScreen,
    params?: { productId?: string; orderId?: string; categoryId?: string; searchQuery?: string }
  ) => void;
  goBack: () => void;

  // Selected Data
  selectedProductId: string | null;
  selectedProduct: Product | null;
  selectedOrderId: string | null;
  selectedOrder: Order | null;
  selectedCategorySlug: string | null;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotalKES: number;
  cartEstimatedDutiesKES: number;
  cartShippingKES: number;
  cartTotalKES: number;
  addToCart: (product: Product, quantity?: number, selectedVariants?: Record<string, string>) => void;
  updateCartQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrderFromCart: (
    paymentMethod: PaymentMethodType,
    receiptNumber?: string,
    address?: ShippingAddress,
    shippingMethod?: ShippingMethodId
  ) => Order;
  cancelOrder: (orderId: string) => void;

  // Shipping & Billing Configuration (Shopify Checkout model)
  shippingMethod: ShippingMethodId;
  setShippingMethod: (method: ShippingMethodId) => void;
  billingAddress: BillingAddress;
  setBillingAddress: (address: BillingAddress) => void;
  shippingAddress: ShippingAddress;
  setShippingAddress: (addr: ShippingAddress) => void;

  // Delivery Location (legacy helper)
  deliveryLocation: { county: string; area: string; deliveryDays: string; feeKES: number };
  setDeliveryLocation: (loc: { county: string; area: string; deliveryDays: string; feeKES: number }) => void;

  // Search & Filtering
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilters: FilterState;
  setActiveFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Catalog
  products: Product[];
  categories: typeof CATEGORIES;

  // Toasts / Feedback
  toasts: Toast[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Pesapal / Shopify Simulation Modal
  isPesapalModalOpen: boolean;
  openPesapalModal: (onSuccess: (refNumber: string) => void, amountKES: number) => void;
  closePesapalModal: () => void;
  triggerPesapalSuccess: (ref: string) => void;
  pesapalCallback: ((refNumber: string) => void) | null;
  pesapalAmount: number;

  // Aliases for M-Pesa legacy triggers
  isMpesaModalOpen: boolean;
  openMpesaModal: (onSuccess: (refNumber: string) => void, amountKES: number) => void;
  closeMpesaModal: () => void;
  triggerMpesaSuccess: (ref: string) => void;
  mpesaAmountKES: number;
  onMpesaComplete: ((refNumber: string) => void) | null;

  // Device Frame View
  deviceMode: 'mobile-frame' | 'fullscreen';
  setDeviceMode: (mode: 'mobile-frame' | 'fullscreen') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('home');
  const [screenHistory, setScreenHistory] = useState<ActiveScreen[]>(['home']);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(PRODUCTS[0].id);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(INITIAL_ORDERS[0].id);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);

  const [products] = useState<Product[]>(PRODUCTS);
  const [categories] = useState(CATEGORIES);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['sb-prod-02']);

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-item-1',
      productId: PRODUCTS[1].id, // Sony Headphones
      product: PRODUCTS[1],
      quantity: 1,
      selectedVariants: { Color: 'Platinum Silver' },
      unitPriceKES: PRODUCTS[1].priceKES,
      itemTotalKES: PRODUCTS[1].priceKES,
    },
  ]);

  // Shopify Shipping Method Selection
  const [shippingMethod, setShippingMethod] = useState<ShippingMethodId>('nairobi_standard');
  const [billingAddress, setBillingAddress] = useState<BillingAddress>({
    sameAsShipping: true,
  });

  const [deliveryLocation, setDeliveryLocation] = useState({
    county: 'Nairobi',
    area: 'Westlands',
    deliveryDays: '1 day',
    feeKES: 250,
  });

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>(INITIAL_USER_ADDRESS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    origin: 'all',
    sortBy: 'featured',
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [deviceMode, setDeviceMode] = useState<'mobile-frame' | 'fullscreen'>('mobile-frame');

  // Pesapal Modal State
  const [isPesapalModalOpen, setIsPesapalModalOpen] = useState(false);
  const [pesapalCallback, setPesapalCallback] = useState<((refNumber: string) => void) | null>(null);
  const [pesapalAmount, setPesapalAmount] = useState(0);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const navigateTo = (
    screen: ActiveScreen,
    params?: { productId?: string; orderId?: string; categoryId?: string; searchQuery?: string }
  ) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.orderId) setSelectedOrderId(params.orderId);
    if (params?.categoryId) setSelectedCategorySlug(params.categoryId);
    if (params?.searchQuery !== undefined) setSearchQuery(params.searchQuery);

    setScreenHistory((prev) => [...prev, screen]);
    setActiveScreen(screen);

    const container = document.getElementById('mobile-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setActiveScreen(prevScreen);
    } else {
      setActiveScreen('home');
    }
  };

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedVariants: Record<string, string> = {}) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotalKES: updated[existingIndex].unitPriceKES * newQty,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: 'ci-' + Date.now(),
          productId: product.id,
          product,
          quantity,
          selectedVariants,
          unitPriceKES: product.priceKES,
          itemTotalKES: product.priceKES * quantity,
        };
        return [...prev, newItem];
      }
    });

    showToast('Added to Cart', `${product.title.slice(0, 32)}... added to bag.`, 'success');
  };

  const updateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            itemTotalKES: item.unitPriceKES * newQuantity,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item Removed', 'Item was removed from your cart.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Saved items', 'Removed from your wishlist.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved items', 'Added to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  // Cart Calculations based on Shopify Shipping method
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalKES = cart.reduce((acc, item) => acc + item.itemTotalKES, 0);

  const cartEstimatedDutiesKES = cart.reduce((acc, item) => {
    return acc + (item.product.importDutyKES || 0) * item.quantity;
  }, 0);

  // Shipping Fee from active method (Nairobi 250, Outside Nairobi 300, Pay on Delivery 300)
  const currentShippingOption =
    SHOPIFY_SHIPPING_METHODS.find((m) => m.id === shippingMethod) || SHOPIFY_SHIPPING_METHODS[0];

  const cartShippingKES = cart.length === 0 ? 0 : currentShippingOption.feeKES;
  const cartTotalKES = cartSubtotalKES + (cart.length > 0 ? cartShippingKES : 0);

  // Pesapal Modal Handlers
  const openPesapalModal = (onSuccess: (refNumber: string) => void, amountKES: number) => {
    setPesapalCallback(() => onSuccess);
    setPesapalAmount(amountKES);
    setIsPesapalModalOpen(true);
  };

  const closePesapalModal = () => {
    setIsPesapalModalOpen(false);
    setPesapalCallback(null);
  };

  const triggerPesapalSuccess = (ref: string) => {
    if (pesapalCallback) {
      pesapalCallback(ref);
    }
    setIsPesapalModalOpen(false);
    setPesapalCallback(null);
  };

  // Order Creation
  const createOrderFromCart = (
    paymentMethod: PaymentMethodType = 'pesapal',
    receiptNumber = 'PP-' + Math.floor(10000000 + Math.random() * 90000000).toString(),
    address = shippingAddress,
    method = shippingMethod
  ): Order => {
    const hasLocal = cart.some((i) => i.product.origin === 'local');
    const hasIntl = cart.some((i) => i.product.origin === 'international');
    const originType = hasLocal && hasIntl ? 'mixed' : hasIntl ? 'international' : 'local';

    const orderNumber = 'SB-KE-' + Math.floor(10000 + Math.random() * 90000);
    const trackingNumber = 'SB-EXP-' + Math.floor(100000 + Math.random() * 900000) + '-KE';

    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const isCOD = paymentMethod === 'cod' || method === 'pay_on_delivery';

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: dateFormatted,
      items: [...cart],
      subtotalKES: cartSubtotalKES,
      shippingKES: cartShippingKES,
      dutiesKES: 0,
      insuranceKES: 0,
      discountKES: 0,
      totalKES: cartTotalKES,
      status: isCOD ? 'order_placed' : 'payment_confirmed',
      paymentMethod,
      mpesaReceiptNumber: isCOD ? undefined : receiptNumber,
      shippingAddress: address,
      timeline: [
        {
          id: 't1',
          status: 'order_placed',
          title: 'Order Confirmed via Shopify',
          description: isCOD
            ? 'Pay on Delivery order registered. Pay in cash or M-Pesa upon rider arrival.'
            : `Prepaid Order verified via Pesapal (${receiptNumber})`,
          timestamp: 'Just now',
          completed: true,
          current: isCOD,
          location: 'Salibay Storefront',
        },
        {
          id: 't2',
          status: 'processing',
          title: 'Fulfillment & Packing',
          description: 'Merchant packing and preparing package for courier dispatch',
          timestamp: 'Processing',
          completed: !isCOD,
          current: !isCOD,
          location: 'Nairobi Fulfillment Hub',
        },
        {
          id: 't3',
          status: 'out_for_delivery',
          title: 'Dispatched to Courier Rider',
          description: 'Courier en route for last-mile delivery to your address',
          timestamp: method === 'outside_nairobi' ? '1-2 Days' : 'Today / Tomorrow',
          completed: false,
          location: `${address.townCity || address.county}, Kenya`,
        },
        {
          id: 't4',
          status: 'delivered',
          title: 'Delivered to Customer',
          description: 'Package handed over and customer receipt verified',
          timestamp: 'Pending Delivery',
          completed: false,
        },
      ],
      trackingNumber,
      courier: method === 'outside_nairobi' ? 'Fargo Courier / G4S' : 'Salibay Express Dispatch',
      estimatedDelivery: method === 'outside_nairobi' ? '2-3 Business Days' : 'Within 24 Hours',
      originType,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Order Cancelled', 'Your order was cancelled successfully.', 'info');
  };

  const resetFilters = () => {
    setActiveFilters({
      origin: 'all',
      sortBy: 'featured',
    });
    setSearchQuery('');
  };

  return (
    <AppContext.Provider
      value={{
        activeScreen,
        screenHistory,
        navigateTo,
        goBack,
        selectedProductId,
        selectedProduct,
        selectedOrderId,
        selectedOrder,
        selectedCategorySlug,
        cart,
        cartCount,
        cartSubtotalKES,
        cartEstimatedDutiesKES,
        cartShippingKES,
        cartTotalKES,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrderFromCart,
        cancelOrder,
        shippingMethod,
        setShippingMethod,
        billingAddress,
        setBillingAddress,
        deliveryLocation,
        setDeliveryLocation,
        shippingAddress,
        setShippingAddress,
        searchQuery,
        setSearchQuery,
        activeFilters,
        setActiveFilters,
        resetFilters,
        products,
        categories,
        toasts,
        showToast,
        removeToast,
        isPesapalModalOpen,
        openPesapalModal,
        closePesapalModal,
        triggerPesapalSuccess,
        pesapalCallback,
        pesapalAmount,
        // Aliases for M-Pesa legacy triggers
        isMpesaModalOpen: isPesapalModalOpen,
        openMpesaModal: openPesapalModal,
        closeMpesaModal: closePesapalModal,
        triggerMpesaSuccess: triggerPesapalSuccess,
        mpesaAmountKES: pesapalAmount,
        onMpesaComplete: pesapalCallback,
        deviceMode,
        setDeviceMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
