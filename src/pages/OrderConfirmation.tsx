
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, MapPin, Truck } from 'lucide-react';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    const orderId = searchParams.get('order');
    if (orderId) {
      // Get the latest order from localStorage
      const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      const order = storedOrders.find((o: any) => o.id === orderId);
      if (order) {
        setOrderData(order);
      }
    }
  }, [searchParams]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!orderData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Button asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll get it ready for delivery.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Order #{orderData.id}
                <Badge variant="outline" className="text-green-600">
                  {orderData.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>Placed on {orderData.date}</span>
              </div>
              
              {orderData.paymentMethod === 'cod' && (
                <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg">
                  <Truck className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="font-medium text-orange-800">Pay on Delivery</p>
                    <p className="text-sm text-orange-700">
                      You will pay {formatPrice(orderData.total)} when your order arrives
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Order Items:</h4>
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>Total: {formatPrice(orderData.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}<br />
                {orderData.customerInfo.address}<br />
                {orderData.customerInfo.city}, {orderData.customerInfo.county}<br />
                {orderData.customerInfo.phone}
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1" asChild>
              <Link to={`/track-order?order=${orderData.id}`}>
                Track Your Order
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link to="/my-orders">View All Orders</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmation;
