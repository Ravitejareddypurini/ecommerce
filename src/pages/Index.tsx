import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import CategoryCard from '@/components/products/CategoryCard';
import { products, categories } from '@/data/mockProducts';

const Index = () => {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-foreground mb-4 tracking-tight">
            Shop Smarter,<br />Live Better
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Discover thousands of premium products at unbeatable prices. Free shipping on orders over $50.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/products">
              <Button variant="secondary" size="lg" className="font-semibold">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: Shield, title: 'Secure Payments', desc: '256-bit SSL encryption' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 justify-center md:justify-start">
                <Icon className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm">{title}</h3>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-sm text-primary font-medium hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(cat => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-secondary/30 py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-sm text-primary font-medium hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">Get exclusive deals and new arrivals straight to your inbox.</p>
        <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="your@email.com" className="flex-1 h-10 rounded-md border bg-background px-3 text-sm" />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>
    </Layout>
  );
};

export default Index;
