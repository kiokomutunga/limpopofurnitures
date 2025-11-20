import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import HotSalesSection from '@/components/HotSalesSection';
import TopSellingProducts from '@/components/TopSellingProducts';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { api } from '@/services/api';
import { emailApi } from '@/services/emailApi';
import { toast } from 'sonner';

const Index = () => {
  const [email, setEmail] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [offerProducts, setOfferProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offersLoading, setOffersLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [categories, setCategories] = useState([
    { 
      name: 'Living Room', 
      count: 0, 
      image: '/images/livingroom.jpg',
      slug: 'Sofas',
      categoryNames: ['Sofas', 'Tables', 'Table Stands ']
    },
    { 
      name: 'Bedroom', 
      count: 0, 
      image: '/images/b.jpg',
      slug: 'Bedroom',
      categoryNames: ['Bedroom']
    },
    { 
      name: 'Dining Room', 
      count: 0, 
      image: '/images/kitchen.jpg',
      slug: 'Dining Room',
      categoryNames: ['Dining Room']
    },
    { 
      name: 'Tables', 
      count: 0, 
      image: '/images/blacktables.jpg',        
      slug: 'Tables',
      categoryNames: ['Tables', 'Table Stands']
    },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        if (response.success) {
          // Get first 4 products for featured section
          setFeaturedProducts(response.products.slice(0, 4));
          
          // Get products with price less than 50,000 for offers section
          const affordableProducts = response.products.filter(
            (product: any) => product.price < 50000
          );
          setOfferProducts(affordableProducts.slice(0, 4));

          // Calculate real category counts
          const categoryCounts = categories.map(category => {
            const count = response.products.filter(
              (product: any) => category.categoryNames.some(catName => 
                product.category.toLowerCase() === catName.toLowerCase()
              )
            ).length;
            return { ...category, count };
          });
          setCategories(categoryCounts);
        } else {
          console.error('Failed to fetch products:', response.message);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
        setOffersLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);
    
    try {
      await emailApi.subscribeNewsletter(email);
      toast.success('Successfully subscribed to our newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again later.');
      console.error('Newsletter subscription error:', error);
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} to={`/shop?category=${encodeURIComponent(category.slug)}`}>
                <Card className="group card-hover overflow-hidden relative h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-5">
                    <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                    <p className="text-gray-200 text-sm">{category.count} Products</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-amber-600 hover:text-amber-700 font-medium flex items-center">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hot Sales Section */}
      <HotSalesSection />

      {/* Offers Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-600 hover:bg-red-700 text-white">Special Offers</Badge>
            <h2 className="text-3xl font-bold mb-4">Affordable Furniture Deals</h2>
            <p className="text-xl text-muted-foreground">Our Mid Year Offers </p>
          </div>
          
          {offersLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : offerProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {offerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-2">No offers available</h3>
                <p className="text-muted-foreground">Check back later for great deals!</p>
              </CardContent>
            </Card>
          )}
          
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-red-600 text-red-600 hover:bg-red-50"
              asChild
            >
              <Link to="/shop?maxPrice=50000">View All Offers</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <Badge className="mb-2 bg-amber-600 hover:bg-amber-700 text-white w-fit">Limited Time Offer</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Get 20% Off on All Bedroom Collections</h2>
                <p className="text-gray-600 mb-8">Upgrade your bedroom with our premium collections. Use code <span className="font-bold">DREAM20</span> at checkout.</p>
                <div>
                  <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white" asChild>
                    <Link to="/shop?category=Bedroom">Shop Bedroom</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20luxurious%20bedroom%20interior%20with%20a%20stylish%20bed%2C%20nightstands%2C%20and%20elegant%20decor.%20The%20room%20features%20soft%20lighting%2C%20premium%20bedding%2C%20and%20a%20calming%20color%20palette.%20The%20image%20showcases%20a%20complete%20bedroom%20set%20with%20attention%20to%20detail%20and%20high-quality%20furniture&width=700&height=500&seq=11&orientation=landscape"
                  alt="Bedroom Collection"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Top Selling Products */}
      <TopSellingProducts />

      {/* Newsletter */}
      <section className="py-16 bg-amber-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Our Newsletter</h2>
            <p className="text-gray-600 mb-8">Subscribe to receive updates on new arrivals, special offers and other discount information.</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
                disabled={isSubscribing}
              />
              <Button 
                type="submit" 
                className="bg-amber-600 hover:bg-amber-700 text-white px-6"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            <p className="text-gray-500 text-sm mt-4">By subscribing you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
