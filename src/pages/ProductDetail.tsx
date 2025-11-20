
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductReviews from '@/components/ProductReviews';
import RelatedProducts from '@/components/RelatedProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from '@/contexts/CartContext';
import { api } from '@/services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await api.getProductById(id);
        if (response.success) {
          setProduct(response.product);
        } else {
          console.error('Failed to fetch product:', response.message);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleReviewAdded = (newReviews: any[]) => {
    if (product) {
      setProduct({
        ...product,
        reviews: newReviews,
        numReviews: newReviews.length,
        averageRating: newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length
      });
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '254719845898';
    const productUrl = window.location.href;
    const message = `Hello, I'm interested in this ${product.name}. Here's the product link: ${productUrl}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="p-12 text-center">
            <CardContent className="p-0">
              <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/shop')}>
                Browse All Products
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    setTimeout(() => {
      addToCart({
        ...product,
        quantity: quantity,
        productId: product.id
      });
      setIsAddingToCart(false);
      console.log('Added to cart:', product.name, 'Quantity:', quantity, 'MongoDB ID:', product.id);
    }, 1000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/shop')}
          className="mb-6 hover:bg-amber-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div className="relative">
              <img
                src={productImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
              />
              
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-green-600 hover:bg-green-700">New</Badge>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="bg-gray-500 hover:bg-gray-600">Out of Stock</Badge>
                )}
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`bg-white/90 hover:bg-white shadow-lg p-2 ${
                    isLiked ? 'text-red-500' : 'text-slate-600'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleShare}
                  className="bg-white/90 hover:bg-white shadow-lg p-2 text-slate-600"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {productImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-amber-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-amber-600 font-medium text-sm mb-2">{product.category}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              
              {/* Rating Display */}
              {product.averageRating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= product.averageRating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.averageRating.toFixed(1)} ({product.numReviews} review{product.numReviews !== 1 ? 's' : ''})
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-amber-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      In Stock ({product.stock} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* WhatsApp Contact Button */}
            <div className="mb-4">
              <Button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-600 hover:bg-green-700 text-white mb-4"
                size="lg"
              >
                <FaWhatsapp className="h-5 w-5 mr-2" />
                Contact us on WhatsApp
              </Button>
            </div>

            {product.inStock && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 p-0"
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="h-10 w-10 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isAddingToCart ? 'Adding to Cart...' : `Add to Cart - ${formatPrice(product.price * quantity)}`}
                </Button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-muted-foreground">Orders over KES 50,000</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-sm">2 Year Warranty</p>
                  <p className="text-xs text-muted-foreground">Quality guarantee</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <ProductReviews
          productId={product.id}
          reviews={product.reviews || []}
          numReviews={product.numReviews || 0}
          averageRating={product.averageRating || 0}
          onReviewAdded={handleReviewAdded}
        />

        {/* Related Products Section */}
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </Layout>
  );
};

export default ProductDetail;
