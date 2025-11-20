import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/services/api';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getCategoryTitle = (slug: string | undefined) => {
    const titles: { [key: string]: string } = {
      'tables': 'Tables',
      'bedroom': 'Bedroom',
      'dining-room': 'Dining Room',
      'office': 'Office',
      'kitchen': 'Kitchen',
      'outdoor': 'Outdoor',
      'storage': 'Storage',
      'decor': 'Decor',
      'sofas': 'Sofas',
      'tv-stand': 'TV Stand',
      'shoe-rack': 'Shoe Rack',
    };
    return titles[slug || ''] || 'Category';
  };

  const getCategoryName = (slug: string | undefined) => {
    const categoryNames: { [key: string]: string } = {
      'tables': 'Tables',
      'bedroom': 'Bedroom',
      'dining-room': 'Dining Room',
      'office': 'Office',
      'kitchen': 'Kitchen',
      'outdoor': 'Outdoor',
      'storage': 'Storage',
      'decor': 'Decor',
      'sofas': 'Sofas',
      'tv-stand': 'TV Stand',
      'shoe-rack': 'Shoe Rack',
    };
    return categoryNames[slug || ''];
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await api.getProducts();
        if (response.success) {
          const categoryName = getCategoryName(slug);
          const filteredProducts = response.products.filter(
            (product: any) => product.category.toLowerCase() === categoryName?.toLowerCase()
          );
          setCategoryProducts(filteredProducts);
        } else {
          console.error('Failed to fetch products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [slug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {getCategoryTitle(slug)} - Strong & Stylish Furnitures in Nairobi and across Kenya.
          </h1>
          <p className="text-xl text-muted-foreground">
            {loading ? 'Loading...' : `Showing ${categoryProducts.length} products in this category`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                We're working on adding more products to this category.
              </p>
              <Button variant="outline">
                Browse All Products
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More Button */}
        {categoryProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
