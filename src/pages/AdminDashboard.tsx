import { useState } from 'react';
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { products, categories } from '@/data/mockProducts';

type Tab = 'overview' | 'products' | 'orders' | 'users' | 'categories';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>('overview');

  if (!user || !isAdmin) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">You need admin privileges to access this page.</p>
          <Link to="/"><Button>Go Home</Button></Link>
        </div>
      </Layout>
    );
  }

  const tabs = [
    { id: 'overview' as Tab, label: 'Overview', icon: LayoutDashboard },
    { id: 'products' as Tab, label: 'Products', icon: Package },
    { id: 'orders' as Tab, label: 'Orders', icon: ShoppingBag },
    { id: 'users' as Tab, label: 'Users', icon: Users },
    { id: 'categories' as Tab, label: 'Categories', icon: Tag },
  ];

  const stats = [
    { label: 'Total Products', value: products.length, icon: Package },
    { label: 'Categories', value: categories.length, icon: Tag },
    { label: 'Total Orders', value: 0, icon: ShoppingBag },
    { label: 'Total Users', value: 0, icon: Users },
  ];

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>

        <div className="flex gap-8">
          <nav className="hidden md:flex flex-col w-48 shrink-0 space-y-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${tab === t.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary'}`}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </nav>

          <div className="flex-1">
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map(s => (
                    <div key={s.label} className="bg-card border rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <s.icon className="h-4 w-4" />
                        <span className="text-xs font-medium">{s.label}</span>
                      </div>
                      <p className="text-2xl font-bold">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'products' && (
              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold">Products</h2>
                  <Button size="sm">Add Product</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Product</th>
                        <th className="text-left p-3 font-medium">Price</th>
                        <th className="text-left p-3 font-medium">Stock</th>
                        <th className="text-left p-3 font-medium">Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(p => (
                        <tr key={p.id} className="border-t">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img src={p.image_url} alt={p.name} className="h-10 w-10 rounded object-cover" />
                              <span className="font-medium">{p.name}</span>
                            </div>
                          </td>
                          <td className="p-3">${p.price.toFixed(2)}</td>
                          <td className="p-3">{p.stock}</td>
                          <td className="p-3">{p.rating}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'categories' && (
              <div className="bg-card border rounded-lg overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="font-semibold">Categories</h2>
                  <Button size="sm">Add Category</Button>
                </div>
                <div className="divide-y">
                  {categories.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-4">
                      <img src={c.image_url} alt={c.name} className="h-10 w-10 rounded object-cover" />
                      <span className="font-medium">{c.name}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{c.slug}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(tab === 'orders' || tab === 'users') && (
              <div className="bg-card border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">No {tab} data yet. This will populate once the database is connected.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
