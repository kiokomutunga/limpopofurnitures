
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';

const UserOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.getUserOrders();
      
      if (response.success) {
        setOrders(response.orders || []);
      } else {
        // Fallback to localStorage for testing
        const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        setOrders(storedOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      // Fallback to localStorage
      const storedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      setOrders(storedOrders);
      setError('Failed to load orders from server. Showing local orders.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading your orders...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Orders
          </h1>
          <p className="text-muted-foreground">
            View and track all your orders
          </p>
          {error && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-yellow-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <h2 className="text-2xl font-semibold mb-4">No orders yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <Button size="lg" asChild>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-start sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        Placed on {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}
                      </p>
                      {order.paymentMethod === 'cod' && (
                        <p className="text-sm text-orange-600 font-medium">Pay on Delivery</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="flex-1 min-w-0 pr-2">{item.name} x{item.quantity}</span>
                        <span className="flex-shrink-0 font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col space-y-3 pt-4 border-t sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
                    <div className="font-semibold text-lg">
                      Total: {formatPrice(order.total)}
                    </div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                      <Button variant="outline" size="sm" asChild className="w-full sm:w-auto">
                        <Link to={`/track-order?order=${order.id}`}>Track Order</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full sm:w-auto">
                        Reorder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserOrders;
