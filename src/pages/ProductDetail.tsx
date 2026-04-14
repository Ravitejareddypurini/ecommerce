import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { products, categories } from '@/data/mockProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link to="/products"><Button>Back to Products</Button></Link>
        </div>
      </Layout>
    );
  }

  const category = categories.find(c => c.id === product.category_id);
  const related = products.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4);
  const discount = product.compare_at_price ? Math.round((1 - product.price / product.compare_at_price) * 100) : 0;

  return (
    <Layout>
      <div className="container py-8">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square rounded-xl overflow-hidden bg-secondary/30">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {category && <span className="text-sm text-primary font-medium">{category.name}</span>}
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.review_count} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.compare_at_price && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.compare_at_price.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-destructive">-{discount}%</span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-success' : 'bg-destructive'}`} />
              <span>{product.stock > 0 ? `In stock (${product.stock})` : 'Out of stock'}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(qty + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1" onClick={() => addItem(product, qty)} disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
