import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { api } from '@/services/api';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(12);

  const categories = [
    'Living Room',
    'Bedroom',
    'Dining Room',
    'Office',
    'Kitchen',
    'Outdoor',
    'Storage',
    'Decor',
  ];

  useEffect(() => {
    // Get search query from URL params
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    console.log('URL params - query:', query, 'category:', category);
    
    setSearchQuery(query);
    
    // Map URL category to display category
    let mappedCategory = '';
    if (category) {
      // Convert bedroom to Bedroom (capitalize first letter)
      mappedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      // Handle specific mappings
      if (category === 'living-room') mappedCategory = 'Living Room';
      if (category === 'dining-room') mappedCategory = 'Dining Room';
      
      console.log('Mapped category:', mappedCategory);
      
      if (mappedCategory && !selectedCategories.includes(mappedCategory)) {
        setSelectedCategories([mappedCategory]);
      }
    }
    
    fetchProducts(query, mappedCategory);
  }, [location.search]);

  const fetchProducts = async (query = '', category = '') => {
    setLoading(true);
    console.log('Fetching products with query:', query, 'category:', category);
    
    try {
      let response;
      
      // If we have a search query or category, use search endpoint
      if (query || category) {
        response = await api.searchProducts({
          q: query,
          cat: category,
          min: priceRange[0],
          max: priceRange[1],
          sort: getSortParam(sortBy)
        });
      } else {
        // Otherwise use regular products endpoint
        response = await api.getProducts();
      }

      console.log('API response:', response);

      if (response.success) {
        setAllProducts(response.products);
        console.log('Products loaded:', response.products.length);
        
        // Debug: log categories of loaded products
        const productCategories = response.products.map((p: any) => p.category);
        console.log('Product categories:', [...new Set(productCategories)]);
      } else {
        console.error('Failed to fetch products:', response.message);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortParam = (sort: string) => {
    switch (sort) {
      case 'price-low': return 'price_low';
      case 'price-high': return 'price_high';
      case 'newest': return 'newest';
      default: return '';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    let newCategories;
    if (checked) {
      newCategories = [...selectedCategories, category];
    } else {
      newCategories = selectedCategories.filter(c => c !== category);
    }
    setSelectedCategories(newCategories);
    
    console.log('Category changed:', category, 'checked:', checked, 'new categories:', newCategories);
    
    // Fetch products with new filters
    fetchProducts(searchQuery, newCategories[0] || '');
  };

  const handlePriceRangeChange = (newPriceRange: number[]) => {
    setPriceRange(newPriceRange);
    // Debounce price range search
    setTimeout(() => {
      fetchProducts(searchQuery, selectedCategories[0] || '');
    }, 500);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    fetchProducts(searchQuery, selectedCategories[0] || '');
  };

  const loadMoreProducts = () => {
    setDisplayCount(prev => prev + 12); // Load 12 more products
  };

  // Filter products based on selected criteria (for client-side filtering if needed)
  const filteredProducts = allProducts.filter(product => {
    const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
    const inSelectedCategory = selectedCategories.length === 0 || selectedCategories.some(cat => 
      product.category && product.category.toLowerCase() === cat.toLowerCase()
    );
    
    console.log('Product:', product.name, 'Category:', product.category, 'Selected:', selectedCategories, 'Match:', inSelectedCategory);
    
    return inPriceRange && inSelectedCategory;
  });

  console.log('Filtered products count:', filteredProducts.length);

  // Sort products if not already sorted by backend
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      default:
        return 0;
    }
  });

  // Get products to display based on displayCount
  const productsToShow = sortedProducts.slice(0, displayCount);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategories.length > 0 ? `${selectedCategories[0]} Furniture` : 
             'Shop All Furniture'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {searchQuery 
              ? `Found ${sortedProducts.length} products matching your search`
              : selectedCategories.length > 0
              ? `Found ${sortedProducts.length} ${selectedCategories[0].toLowerCase()} products`
              : 'Discover our complete collection of premium furniture'
            }
          </p>
        </div>

        {/* Debug info - remove this in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-4 bg-gray-100 rounded text-sm">
            <p>Debug Info:</p>
            <p>Selected Categories: {JSON.stringify(selectedCategories)}</p>
            <p>All Products: {allProducts.length}</p>
            <p>Filtered Products: {filteredProducts.length}</p>
            <p>URL Category: {searchParams.get('category')}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card className="p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-6">Filters</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  max={200000}
                  step={1000}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(priceRange[0])}</span>
                  <span>{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 200000]);
                  setSelectedCategories([]);
                  setSearchQuery('');
                  setDisplayCount(12);
                  fetchProducts('');
                }}
                className="w-full"
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing <span className="font-medium">{Math.min(displayCount, sortedProducts.length)}</span> of <span className="font-medium">{sortedProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : productsToShow.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToShow.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more results
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPriceRange([0, 200000]);
                      setSelectedCategories([]);
                      setSearchQuery('');
                      setDisplayCount(12);
                      fetchProducts('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Load More Button */}
            {productsToShow.length > 0 && displayCount < sortedProducts.length && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={loadMoreProducts}
                  className="border-amber-600 text-amber-600 hover:bg-amber-50"
                >
                  Load More Products ({Math.min(12, sortedProducts.length - displayCount)} more)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
