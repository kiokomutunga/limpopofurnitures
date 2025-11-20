
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/services/api';

const TopSellingProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await api.getProducts();
        if (response.success) {
          // Shuffle products to simulate "top selling" and get random selection
          const shuffled = [...response.products].sort(() => Math.random() - 0.5);
          setProducts(shuffled);
        } else {
          console.error('Failed to fetch products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  const loadMoreProducts = () => {
    setDisplayCount(prev => Math.min(prev + 8, products.length));
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top Selling Furniture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
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

  if (products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Top Selling Furniture</h2>
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mb-2">No products available</h3>
              <p className="text-muted-foreground">Check back later for our top-selling items!</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Selling Furniture</h2>
          <p className="text-xl text-muted-foreground">
            Discover our most popular furniture pieces loved by customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, displayCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {displayCount < products.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={loadMoreProducts}
              className="border-amber-600 text-amber-600 hover:bg-amber-50"
            >
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopSellingProducts;
