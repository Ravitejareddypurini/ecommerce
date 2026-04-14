import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', image_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { id: '2', name: 'Clothing', slug: 'clothing', image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden', image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400' },
  { id: '4', name: 'Sports', slug: 'sports', image_url: 'https://images.unsplash.com/photo-1461896836934-bd45ba8c0e52?w=400' },
  { id: '5', name: 'Books', slug: 'books', image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400' },
  { id: '6', name: 'Beauty', slug: 'beauty', image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400' },
];

export const products: Product[] = [
  {
    id: '1', name: 'Wireless Noise-Cancelling Headphones', description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Perfect for music lovers and professionals alike.', price: 299.99, compare_at_price: 399.99,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600', images: [], category_id: '1', stock: 50, rating: 4.8, review_count: 234, featured: true, created_at: '2024-01-01'
  },
  {
    id: '2', name: 'Smart Watch Pro', description: 'Advanced smartwatch with health monitoring, GPS tracking, and a stunning AMOLED display. Stay connected and fit with this premium wearable.', price: 449.99, compare_at_price: 549.99,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', images: [], category_id: '1', stock: 30, rating: 4.6, review_count: 189, featured: true, created_at: '2024-01-02'
  },
  {
    id: '3', name: 'Premium Cotton T-Shirt', description: 'Ultra-soft 100% organic cotton t-shirt with a modern fit. Available in multiple colors. Sustainably made.', price: 39.99,
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600', images: [], category_id: '2', stock: 200, rating: 4.5, review_count: 412, featured: false, created_at: '2024-01-03'
  },
  {
    id: '4', name: 'Ergonomic Office Chair', description: 'Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort.', price: 599.99, compare_at_price: 799.99,
    image_url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=600', images: [], category_id: '3', stock: 15, rating: 4.7, review_count: 156, featured: true, created_at: '2024-01-04'
  },
  {
    id: '5', name: 'Running Shoes Ultra', description: 'Lightweight performance running shoes with responsive cushioning and breathable knit upper. Engineered for speed.', price: 159.99, compare_at_price: 199.99,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', images: [], category_id: '4', stock: 75, rating: 4.9, review_count: 567, featured: true, created_at: '2024-01-05'
  },
  {
    id: '6', name: 'Bestseller Novel Collection', description: 'Curated collection of 5 bestselling novels from award-winning authors. Perfect for avid readers.', price: 49.99,
    image_url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', images: [], category_id: '5', stock: 100, rating: 4.4, review_count: 89, featured: false, created_at: '2024-01-06'
  },
  {
    id: '7', name: 'Luxury Skincare Set', description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer. Made with natural ingredients for radiant skin.', price: 129.99, compare_at_price: 179.99,
    image_url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', images: [], category_id: '6', stock: 40, rating: 4.7, review_count: 203, featured: true, created_at: '2024-01-07'
  },
  {
    id: '8', name: 'Bluetooth Speaker', description: 'Portable waterproof speaker with 360-degree sound, 20-hour battery, and deep bass. Take your music anywhere.', price: 89.99,
    image_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600', images: [], category_id: '1', stock: 60, rating: 4.3, review_count: 312, featured: false, created_at: '2024-01-08'
  },
  {
    id: '9', name: 'Denim Jacket Classic', description: 'Timeless denim jacket with a modern slim fit. Versatile layering piece for any season.', price: 89.99, compare_at_price: 119.99,
    image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=600', images: [], category_id: '2', stock: 45, rating: 4.6, review_count: 178, featured: false, created_at: '2024-01-09'
  },
  {
    id: '10', name: 'Minimalist Desk Lamp', description: 'Modern LED desk lamp with adjustable brightness and color temperature. Sleek aluminum design.', price: 79.99,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600', images: [], category_id: '3', stock: 35, rating: 4.5, review_count: 94, featured: false, created_at: '2024-01-10'
  },
  {
    id: '11', name: 'Yoga Mat Premium', description: 'Extra-thick non-slip yoga mat with alignment lines. Eco-friendly material for a perfect practice.', price: 69.99,
    image_url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', images: [], category_id: '4', stock: 80, rating: 4.8, review_count: 245, featured: false, created_at: '2024-01-11'
  },
  {
    id: '12', name: 'Wireless Earbuds', description: 'True wireless earbuds with active noise cancellation, transparency mode, and 24-hour total battery life.', price: 199.99, compare_at_price: 249.99,
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600', images: [], category_id: '1', stock: 90, rating: 4.7, review_count: 445, featured: true, created_at: '2024-01-12'
  },
];
