import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    
    setIsLoading(true);
    
    // Simulate adding to cart
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
      console.log('Added to cart:', product.name);
    }, 1000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group card-hover overflow-hidden border-0 shadow-sm relative">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
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

          {/* Action Buttons - appears on hover */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Like Button */}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleLike}
              className={`bg-white/90 hover:bg-white shadow-lg p-2 ${
                isLiked ? 'text-red-500' : 'text-slate-600'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {/* Lock Button for Premium/Exclusive items */}
            {product.originalPrice && (
              <Button
                size="sm"
                variant="ghost"
                className="bg-white/90 hover:bg-white shadow-lg p-2 text-amber-600"
              >
                <Lock className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Add to Cart Button - bottom right */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock || isLoading}
              className={`shadow-lg ${
                !product.inStock 
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium text-gray-800">
                Out of Stock
              </div>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h3 className="font-semibold text-base leading-tight hover:text-amber-600 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-amber-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            <div className="text-sm">
              {product.inStock ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
