
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';

const HotSalesSection = () => {
  const [hotSalesProducts, setHotSalesProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(4);

  useEffect(() => {
    const fetchHotSalesProducts = async () => {
      try {
        const response = await api.getProducts();
        if (response.success) {
          // Filter products that have original price (indicating they're on sale)
          const salesProducts = response.products.filter(
            (product: any) => product.originalPrice && product.originalPrice > product.price
          );
          setHotSalesProducts(salesProducts);
        } else {
          console.error('Failed to fetch hot sales products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching hot sales products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotSalesProducts();
  }, []);

  const loadMoreProducts = () => {
    setDisplayCount(prev => Math.min(prev + 4, hotSalesProducts.length));
  };

  if (loading) {
    return (
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white">Hot Sales</Badge>
            <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (hotSalesProducts.length === 0) {
    return null; // Don't show the section if no hot sales products
  }

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white">Hot Sales</Badge>
          <h2 className="text-3xl font-bold mb-4">Limited Time Offers</h2>
          <p className="text-xl text-muted-foreground">
            Don't miss out on these incredible deals - limited stock available!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotSalesProducts.slice(0, displayCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          {displayCount < hotSalesProducts.length && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={loadMoreProducts}
              className="border-red-600 text-red-600 hover:bg-red-50 mr-4"
            >
              Load More Deals
            </Button>
          )}
          <Button 
            variant="outline" 
            size="lg" 
            className="border-red-600 text-red-600 hover:bg-red-50"
            asChild
          >
            <Link to="/shop?filter=sales">View All Offers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HotSalesSection;
