import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { totalItems } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center gap-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded-lg hero-gradient flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">S</span>
          </div>
          <span className="hidden sm:inline">ShopHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-6">
          <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            All Products
          </Link>
          <Link to="/products?category=electronics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Electronics
          </Link>
          <Link to="/products?category=clothing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Clothing
          </Link>
          <Link to="/products?category=home-garden" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md ml-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="pl-9 bg-secondary/50"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 ml-auto md:ml-0">
          <Link to="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm text-muted-foreground truncate">
                  {user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  My Orders
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate('/admin')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-card p-4 space-y-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="pl-9" />
            </div>
          </form>
          <nav className="flex flex-col gap-2">
            <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-2">All Products</Link>
            <Link to="/products?category=electronics" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-2">Electronics</Link>
            <Link to="/products?category=clothing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-2">Clothing</Link>
            <Link to="/products?category=home-garden" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium py-2">Home</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
