import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    fullName: '', line1: '', line2: '', city: '', state: '', postalCode: '', country: 'US',
    cardNumber: '', expiry: '', cvc: '',
  });

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const total = totalPrice + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { navigate('/auth'); return; }
    if (items.length === 0) return;

    setProcessing(true);
    // Mock payment processing
    await new Promise(r => setTimeout(r, 2000));
    clearCart();
    toast.success('Order placed successfully!');
    navigate('/orders');
    setProcessing(false);
  };

  const updateField = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3 space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h2 className="font-semibold mb-4">Shipping Address</h2>
                <div className="grid gap-4">
                  <div><Label>Full Name</Label><Input value={form.fullName} onChange={e => updateField('fullName', e.target.value)} required /></div>
                  <div><Label>Address Line 1</Label><Input value={form.line1} onChange={e => updateField('line1', e.target.value)} required /></div>
                  <div><Label>Address Line 2</Label><Input value={form.line2} onChange={e => updateField('line2', e.target.value)} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>City</Label><Input value={form.city} onChange={e => updateField('city', e.target.value)} required /></div>
                    <div><Label>State</Label><Input value={form.state} onChange={e => updateField('state', e.target.value)} required /></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Postal Code</Label><Input value={form.postalCode} onChange={e => updateField('postalCode', e.target.value)} required /></div>
                    <div><Label>Country</Label><Input value={form.country} onChange={e => updateField('country', e.target.value)} required /></div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-lg p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2"><CreditCard className="h-5 w-5" /> Payment (Mock)</h2>
                <div className="grid gap-4">
                  <div><Label>Card Number</Label><Input placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={e => updateField('cardNumber', e.target.value)} required /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label>Expiry</Label><Input placeholder="MM/YY" value={form.expiry} onChange={e => updateField('expiry', e.target.value)} required /></div>
                    <div><Label>CVC</Label><Input placeholder="123" value={form.cvc} onChange={e => updateField('cvc', e.target.value)} required /></div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">This is a mock payment. No real charges will be made.</p>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="bg-card border rounded-lg p-6 sticky top-20">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${(product.price * quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
                </div>
                <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <Button type="submit" className="w-full mt-4" size="lg" disabled={processing}>
                  {processing ? 'Processing...' : <><Check className="mr-2 h-4 w-4" /> Place Order</>}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
