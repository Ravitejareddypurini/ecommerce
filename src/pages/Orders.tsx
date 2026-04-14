import { Package } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <Link to="/auth"><Button>Sign In</Button></Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>
        <div className="text-center py-16">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">When you place an order, it will appear here.</p>
          <Link to="/products"><Button>Start Shopping</Button></Link>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
