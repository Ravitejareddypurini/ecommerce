import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="border-t bg-card mt-auto">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <div className="h-7 w-7 rounded-lg hero-gradient flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">S</span>
            </div>
            ShopHub
          </div>
          <p className="text-sm text-muted-foreground">Your one-stop shop for everything you need. Quality products, fast shipping.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" className="hover:text-foreground transition-colors">All Products</Link></li>
            <li><Link to="/products?category=electronics" className="hover:text-foreground transition-colors">Electronics</Link></li>
            <li><Link to="/products?category=clothing" className="hover:text-foreground transition-colors">Clothing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/auth" className="hover:text-foreground transition-colors">Sign In</Link></li>
            <li><Link to="/orders" className="hover:text-foreground transition-colors">My Orders</Link></li>
            <li><Link to="/cart" className="hover:text-foreground transition-colors">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><span className="cursor-default">Help Center</span></li>
            <li><span className="cursor-default">Shipping Info</span></li>
            <li><span className="cursor-default">Returns</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
        © 2024 ShopHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
