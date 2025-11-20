export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  isNew?: boolean;
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  shipping: { [key: string]: string };
  commission?: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Oak Dining Table',
    price: 85000,
    originalPrice: 95000,
    commission: 15,
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=600&fit=crop',
    ],
    category: 'Dining Tables',
    isNew: true,
    inStock: true,
    stockCount: 12,
    description: 'This stunning modern oak dining table combines contemporary design with traditional craftsmanship. Perfect for family gatherings and entertaining guests, it seats up to 6 people comfortably.',
    features: [
      'Solid oak wood construction',
      'Seats 6 people comfortably',
      'Scratch-resistant finish',
      'Easy assembly included',
      'Sustainable materials',
    ],
    specifications: {
      'Dimensions': '180cm L x 90cm W x 75cm H',
      'Material': 'Solid Oak Wood',
      'Weight': '45kg',
      'Finish': 'Natural Oil Finish',
      'Assembly': 'Required (tools included)',
      'Warranty': '2 years',
    },
    shipping: {
      'Delivery Time': '5-7 business days',
      'Shipping Cost': 'Free delivery within Nairobi',
      'Assembly Service': 'Available for KES 3,000',
    }
  },
  {
    id: '2',
    name: 'Comfort Lounge Sofa',
    price: 179999,
    originalPrice: 199999,
    commission: 20,
    images: [
      'https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20sofa%20with%20plush%20cushions%20in%20a%20neutral%20beige%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=1&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20sofa%20with%20plush%20cushions%20in%20a%20neutral%20beige%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=2&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20luxurious%20modern%20sofa%20with%20plush%20cushions%20in%20a%20neutral%20beige%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=3&orientation=squarish',
    ],
    category: 'Sofas',
    isNew: true,
    inStock: true,
    stockCount: 8,
    description: 'Experience ultimate comfort with our premium lounge sofa. Crafted with high-quality materials and featuring plush cushions, this sofa is perfect for relaxing after a long day.',
    features: [
      'Premium fabric upholstery',
      'High-density foam cushions',
      'Removable and washable covers',
      'Solid hardwood frame',
      'Anti-sag spring system',
    ],
    specifications: {
      'Dimensions': '220cm L x 95cm W x 85cm H',
      'Material': 'Premium Fabric & Hardwood',
      'Weight': '65kg',
      'Seating Capacity': '3-4 people',
      'Assembly': 'Minimal assembly required',
      'Warranty': '3 years',
    },
    shipping: {
      'Delivery Time': '3-5 business days',
      'Shipping Cost': 'Free delivery within Nairobi',
      'White Glove Service': 'Available for KES 5,000',
    }
  },
  {
    id: '3',
    name: 'Luxe King Bed Frame',
    price: 189999,
    images: [
      'https://readdy.ai/api/search-image?query=A%20modern%20king-size%20bed%20frame%20with%20a%20plush%20headboard%20in%20a%20neutral%20gray%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=1&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20modern%20king-size%20bed%20frame%20with%20a%20plush%20headboard%20in%20a%20neutral%20gray%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=2&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20modern%20king-size%20bed%20frame%20with%20a%20plush%20headboard%20in%20a%20neutral%20gray%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=3&orientation=squarish',
    ],
    category: 'Beds',
    inStock: false,
    stockCount: 0,
    description: 'Transform your bedroom into a luxury retreat with our elegant king bed frame. Features a sophisticated upholstered headboard and sturdy construction for years of comfort.',
    features: [
      'Upholstered headboard',
      'Reinforced metal frame',
      'No box spring required',
      'Under-bed storage space',
      'Easy assembly system',
    ],
    specifications: {
      'Dimensions': '210cm L x 195cm W x 120cm H',
      'Material': 'Metal Frame & Fabric Upholstery',
      'Weight': '55kg',
      'Mattress Size': 'King (180x200cm)',
      'Assembly': 'Required (instructions included)',
      'Warranty': '5 years on frame',
    },
    shipping: {
      'Delivery Time': 'Currently out of stock',
      'Shipping Cost': 'Free delivery within Nairobi',
      'Assembly Service': 'Available for KES 4,000',
    }
  },
  {
    id: '4',
    name: 'Executive Office Chair',
    price: 44999,
    originalPrice: 54999,
    commission: 12,
    images: [
      'https://readdy.ai/api/search-image?query=A%20set%20of%20elegant%20modern%20accent%20chairs%20with%20wooden%20legs%20and%20comfortable%20upholstery%20in%20a%20light%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=1&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20set%20of%20elegant%20modern%20accent%20chairs%20with%20wooden%20legs%20and%20comfortable%20upholstery%20in%20a%20light%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=2&orientation=squarish',
      'https://readdy.ai/api/search-image?query=A%20set%20of%20elegant%20modern%20accent%20chairs%20with%20wooden%20legs%20and%20comfortable%20upholstery%20in%20a%20light%20color%2C%20photographed%20in%20a%20clean%20studio%20setting%20with%20soft%20lighting%2C%20high-quality%20detailed%20product%20photography%20against%20a%20light%20background&width=600&height=600&seq=3&orientation=squarish',
    ],
    category: 'Office Chairs',
    inStock: true,
    stockCount: 15,
    description: 'Enhance your workspace with our ergonomic executive office chair. Designed for long hours of comfort with premium materials and adjustable features.',
    features: [
      'Ergonomic lumbar support',
      'Height adjustable',
      'Premium leather upholstery',
      '360-degree swivel',
      'Heavy-duty casters',
    ],
    specifications: {
      'Dimensions': '65cm L x 70cm W x 110-120cm H',
      'Material': 'Leather & Steel',
      'Weight': '18kg',
      'Weight Capacity': '150kg',
      'Assembly': 'Required (30 minutes)',
      'Warranty': '2 years',
    },
    shipping: {
      'Delivery Time': '2-4 business days',
      'Shipping Cost': 'Free delivery within Nairobi',
      'Assembly Service': 'Available for KES 1,500',
    }
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
