import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import MpesaForm from '@/components/MpesaForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mpesaTransactionId, setMpesaTransactionId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    county: '',
    postalCode: '',
  });

  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      // Store the current path to redirect back after login
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/account');
    }
  }, [user, navigate]);

  // Don't render anything if user is not authenticated
  if (!user) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getTotalPrice();
  const shippingCost = subtotal > 50000 ? 0 : 2500;
  const totalAmount = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentInitiated = () => {
    submitOrder('Paid', 'MPESA_' + Date.now().toString());
  };

  const submitOrder = async (paymentStatus: string, transactionId?: string) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Generate a MongoDB-compatible ObjectId for the order
      const generateObjectId = () => {
        const timestamp = Math.floor(Date.now() / 1000).toString(16);
        const randomHex = Math.random().toString(16).substring(2, 18);
        return timestamp + randomHex.padEnd(16, '0');
      };

      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id, // backend expects productId
          quantity: item.quantity,
        })),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          county: formData.county,
          postalCode: formData.postalCode,
        },
        totalAmount,
        paymentMethod,
        paymentStatus,
        mpesaTransactionId: transactionId || mpesaTransactionId,
      };

      console.log('Submitting order:', orderData);

      const response = await api.placeOrder(orderData);

      if (response.success) {
        const localOrder = {
          id: response.order.id || generateObjectId(),
          date: new Date().toLocaleDateString(),
          status: 'Order Placed',
          total: totalAmount,
          paymentMethod,
          paymentStatus,
          customerInfo: formData,
          items: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        };

        const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        localStorage.setItem('userOrders', JSON.stringify([localOrder, ...existingOrders]));

        clearCart();
        navigate(`/order-confirmation?order=${response.order.id || localOrder.id}`);
      } else {
        console.error('Order failed:', response.message);
        alert(`Failed to place order: ${response.message}`);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePlaceOrder = async () => {
    const { firstName, lastName, email, phone, address } = formData;

    if (!firstName || !lastName || !email || !phone || !address) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentMethod === 'card') {
      alert('Card payment functionality will be implemented with Stripe integration.');
    } else if (paymentMethod === 'cod') {
      await submitOrder('Unpaid');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Checkout</h1>
          <p className="text-muted-foreground">Complete your order details below</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required disabled={isSubmitting} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required disabled={isSubmitting} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="0712345678" value={formData.phone} onChange={handleInputChange} required disabled={isSubmitting} />
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address *</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required disabled={isSubmitting} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required disabled={isSubmitting} />
                  </div>
                  <div>
                    <Label htmlFor="county">County *</Label>
                    <Input id="county" name="county" value={formData.county} onChange={handleInputChange} required disabled={isSubmitting} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} disabled={isSubmitting} />
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} disabled={isSubmitting}>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="mpesa" id="mpesa" />
                    <div className="flex-1">
                      <Label htmlFor="mpesa" className="font-medium">M-PESA</Label>
                      <p className="text-sm text-muted-foreground">Pay securely with M-PESA</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Truck className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <Label htmlFor="cod" className="font-medium">Pay on Delivery</Label>
                      <p className="text-sm text-muted-foreground">Pay with cash when your order arrives</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <Label htmlFor="card" className="font-medium">Credit/Debit Card</Label>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard accepted</p>
                    </div>
                  </div>
                </RadioGroup>

                {paymentMethod === 'mpesa' && (
                  <div className="mt-6">
                    <MpesaForm amount={totalAmount} onPaymentInitiated={handlePaymentInitiated} />
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="mt-6">
                    <Card className="bg-orange-50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Truck className="h-5 w-5 text-orange-600" />
                          <h4 className="font-medium text-orange-800">Pay on Delivery</h4>
                        </div>
                        <p className="text-sm text-orange-700">
                          You will pay {formatPrice(totalAmount)} in cash when your order is delivered.
                        </p>
                      </CardContent>
                    </Card>
                    <Button size="lg" className="w-full mt-4 bg-orange-600 hover:bg-orange-700" onClick={handlePlaceOrder} disabled={isSubmitting}>
                      {isSubmitting ? 'Placing Order...' : 'Place Order - Pay on Delivery'}
                    </Button>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="mt-6">
                    <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={isSubmitting}>
                      {isSubmitting ? 'Processing...' : `Pay with Card - ${formatPrice(totalAmount)}`}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shippingCost === 0 ? 'text-green-600' : ''}>
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(totalAmount)}</span>
                </div>

                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/cart">Back to Cart</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
