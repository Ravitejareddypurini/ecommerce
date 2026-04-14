import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const discount = product.compare_at_price
    ? Math.round((1 - product.price / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-xl border card-shadow hover:card-shadow-hover transition-all duration-300 overflow-hidden">
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        {product.featured && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-md">
            Featured
          </span>
        )}
      </Link>
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.review_count})</span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through">${product.compare_at_price.toFixed(2)}</span>
            )}
          </div>
          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => { e.preventDefault(); addItem(product); }}>
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
