import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { api } from '@/services/api';
import { useLocation } from 'react-router-dom';

const STATUS_STEPS = [
  { key: 'Processing', label: 'Order Processed' },
  { key: 'Shipped', label: 'Order Shipped' },
  { key: 'In Transit', label: 'Order En Route' },
  { key: 'Delivered', label: 'Order Arrived' },
];

export default function OrderTracking() {
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const orderId = new URLSearchParams(location.search).get('order');

  useEffect(() => {
    if (orderId) fetchOrder(orderId);
  }, [orderId]);

  const fetchOrder = async (id: string) => {
    setIsLoading(true);
    const result = await api.getOrderById(id);
    if (result.success) {
      setOrder(result.order);
      setError(null);
    } else {
      setError(result.message || 'Failed to load order');
    }
    setIsLoading(false);
  };

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const stepIndex = STATUS_STEPS.findIndex((s) => s.key === stepKey);
    const currentIndex = STATUS_STEPS.findIndex((s) => s.key === currentStatus);
    if (stepIndex < 0 || currentIndex < 0) return 'pending';
    if (stepIndex <= currentIndex) return 'completed';
    return 'pending';
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading order tracking...
        </div>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          {error || 'Order not found'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <p className="text-muted-foreground text-sm">
              Placed on {order.date} | Status: {order.status}
            </p>
            <Badge>{order.status}</Badge>
          </CardHeader>
          <CardContent>
            {/* ✅ Timeline Tracking */}
            <div className="flex items-center justify-between mb-6">
              {STATUS_STEPS.map((step, index) => {
                const stepStatus = getStepStatus(step.key, order.status);
                return (
                  <div key={step.key} className="flex-1 flex flex-col items-center relative">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        stepStatus === 'completed'
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {stepStatus === 'completed' ? '✔' : index + 1}
                    </div>
                    <p className="mt-2 text-xs text-center">{step.label}</p>

                    {/* Connecting Line */}
                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className={`absolute top-4 left-1/2 w-full h-0.5 ${
                          getStepStatus(STATUS_STEPS[index + 1].key, order.status) ===
                          'completed'
                            ? 'bg-blue-500'
                            : 'bg-gray-300'
                        }`}
                        style={{ transform: 'translateX(50%)' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ✅ Shipping Address */}
            {order.shippingAddress && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                <p className="text-muted-foreground text-sm whitespace-pre-line">
                  {`${order.shippingAddress.address}\n${order.shippingAddress.city}, ${order.shippingAddress.county}\n${order.shippingAddress.postalCode}`}
                </p>
              </div>
            )}

            {/* ✅ Order Items */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Order Items</h3>
              <div className="space-y-2">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>KES {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="font-bold mt-4">Total: KES {order.total}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
