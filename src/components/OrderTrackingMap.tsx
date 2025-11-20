
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Truck, Clock, Package } from 'lucide-react';

interface OrderTrackingMapProps {
  orderNumber: string;
  status: string;
  shippingAddress?: {
    address: string;
    city: string;
    county: string;
    postalCode?: string;
  };
}

const OrderTrackingMap = ({ orderNumber, status, shippingAddress }: OrderTrackingMapProps) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: -1.2634,
    lng: 36.8078,
    address: "Roysambu, Nairobi County"
  });

  const [deliveryLocation] = useState({
    lat: -1.2647,
    lng: 36.8906,
    address: shippingAddress && shippingAddress.address
      ? `${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.county}${shippingAddress.postalCode ? `, ${shippingAddress.postalCode}` : ''}`
      : "Customer Address - Not Available"
  });

  // Simulate truck movement for demo
  useEffect(() => {
    if (status === 'In Transit') {
      const interval = setInterval(() => {
        setCurrentLocation(prev => ({
          ...prev,
          lat: prev.lat + 0.0005,
          lng: prev.lng + 0.001,
          address: "En route to delivery address..."
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          Live Tracking - Order #{orderNumber}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Map showing Nairobi County with Roysambu focus */}
        <div className="relative bg-gray-100 rounded-lg h-64 mb-4 overflow-hidden">
          {/* Nairobi County Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
          
          {/* Nairobi County outline */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Main road from Roysambu to delivery area */}
            <path
              d="M 100 180 Q 200 160 300 140 Q 400 120 450 100"
              stroke="#94a3b8"
              strokeWidth="6"
              fill="none"
              strokeDasharray="8,4"
            />
            {/* Secondary roads */}
            <path
              d="M 80 200 L 120 160 M 280 120 L 320 160 M 420 80 L 460 120"
              stroke="#cbd5e1"
              strokeWidth="3"
              fill="none"
            />
          </svg>

          {/* Roysambu area marker (starting point) */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '20%', top: '70%' }}
          >
            <div className="bg-amber-500 text-white p-2 rounded-full shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
              Limpopo Furniture Store
            </div>
          </div>

          {/* Current Location (Truck) */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
            style={{ 
              left: status === 'Delivered' ? '80%' : status === 'In Transit' ? '60%' : '20%', 
              top: status === 'Delivered' ? '30%' : status === 'In Transit' ? '50%' : '70%' 
            }}
          >
            <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg animate-pulse">
              <Truck className="h-4 w-4" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
              {status === 'Delivered' ? 'Delivered!' : 'Your Order'}
            </div>
          </div>

          {/* Delivery Location (Customer Address) */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: '80%', top: '30%' }}
          >
            <div className="bg-green-600 text-white p-2 rounded-full shadow-lg">
              <MapPin className="h-4 w-4" />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap max-w-24 text-center">
              Delivery Address
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow">
            <div className="flex items-center gap-2 text-sm">
              {status === 'Order Placed' && (
                <>
                  <Package className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-600 font-medium">Order Placed</span>
                </>
              )}
              {status === 'Processing' && (
                <>
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-yellow-600 font-medium">Processing</span>
                </>
              )}
              {status === 'Shipped' && (
                <>
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">Shipped</span>
                </>
              )}
              {status === 'In Transit' && (
                <>
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="text-blue-600 font-medium">In Transit</span>
                </>
              )}
              {status === 'Delivered' && (
                <>
                  <MapPin className="h-4 w-4 text-green-600" />
                  <span className="text-green-600 font-medium">Delivered</span>
                </>
              )}
            </div>
          </div>

          {/* Nairobi County label */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-gray-600">
            Nairobi County
          </div>
        </div>

        {/* Location Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium text-blue-900">Current Location</p>
              <p className="text-sm text-blue-700">{currentLocation.address}</p>
            </div>
            <Truck className="h-5 w-5 text-blue-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium text-green-900">Delivery Address</p>
              <p className="text-sm text-green-700">
                {shippingAddress && shippingAddress.address ? (
                  <>
                    {shippingAddress.address}<br />
                    {shippingAddress.city}, {shippingAddress.county}
                    {shippingAddress.postalCode && <><br />{shippingAddress.postalCode}</>}
                  </>
                ) : (
                  "Shipping address not available"
                )}
              </p>
            </div>
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
        </div>

        {/* ETA */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Estimated Delivery</p>
          <p className="font-bold text-lg">
            {status === 'Delivered' ? 'Delivered!' : 
             status === 'In Transit' ? '30-45 minutes' : 
             status === 'Shipped' ? '1-2 hours' :
             status === 'Processing' ? 'Processing - Will update soon' :
             'Order confirmed - Processing will begin soon'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTrackingMap;
