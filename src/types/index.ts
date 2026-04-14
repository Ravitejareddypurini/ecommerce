export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_at_price?: number;
  image_url: string;
  images: string[];
  category_id: string;
  category?: Category;
  stock: number;
  rating: number;
  review_count: number;
  featured: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url?: string;
  product_count?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Address;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Address {
  full_name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface Review {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'customer' | 'admin';
  avatar_url?: string;
  created_at: string;
}
