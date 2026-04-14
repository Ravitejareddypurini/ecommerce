import { useSearchParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products, categories } from '@/data/mockProducts';

const Products = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const [sort, setSort] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (categorySlug) {
      const cat = categories.find(c => c.slug === categorySlug);
      if (cat) result = result.filter(p => p.category_id === cat.id);
    }
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => b.created_at.localeCompare(a.created_at)); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [searchQuery, categorySlug, sort, priceRange]);

  const activeCategory = categories.find(c => c.slug === categorySlug);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            {searchQuery ? `Results for "${searchQuery}"` : activeCategory ? activeCategory.name : 'All Products'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} products</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full md:w-56 shrink-0 space-y-6">
            <div>
              <h3 className="font-semibold text-sm mb-3">Categories</h3>
              <ul className="space-y-1">
                <li>
                  <Link to="/products" className={`text-sm py-1 block ${!categorySlug ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                    All Products
                  </Link>
                </li>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link
                      to={`/products?category=${cat.slug}`}
                      className={`text-sm py-1 block ${categorySlug === cat.slug ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3">Price Range</h3>
              <div className="flex gap-2 items-center">
                <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-20 h-8 rounded border bg-background px-2 text-sm" placeholder="Min" />
                <span className="text-muted-foreground">-</span>
                <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-20 h-8 rounded border bg-background px-2 text-sm" placeholder="Max" />
              </div>
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No products found.</p>
                <Link to="/products"><Button variant="link">Browse all products</Button></Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
