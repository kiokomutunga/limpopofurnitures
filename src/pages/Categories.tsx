import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { api } from '@/services/api';

const Categories = () => {
  const [categoryStats, setCategoryStats] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const categories = [
    { 
      name: 'Tables', 
      image: '/images/livingroom.jpg',
      slug: 'tables',
      description: 'Limpopo Furniture offers a wide variety of affordable tables in Kenya, perfect for every room in your home or office. From elegant coffee tables and practical side tables to sturdy study desks and spacious dining tables, our collection is designed to blend style with everyday functionality. Each table is crafted from high-quality materials such as hardwood, glass, or metal to ensure durability, making them a reliable addition to any living space. Whether you’re in Nairobi looking for a modern coffee table, in Murang’a searching for a strong study desk, or in Kiambu upgrading your dining area, Limpopo Furniture has the perfect table for you at pocket-friendly prices. Our tables are carefully designed to fit both compact apartments and larger homes, ensuring everyone can enjoy quality furniture without overspending. With flexible payment options including M-Pesa and Cash on Delivery, plus fast delivery across Kenya, Limpopo Furniture remains the best choice for tables that combine style, strength, and affordability.',
      key: 'Tables'
    },
    { 
      name: 'Bedroom', 
      image: '/images/b.jpg',
      slug: 'bedroom',
      description: 'Transform your bedroom into a peaceful retreat with affordable bedroom furniture in Kenya from Limpopo Furniture. Our collection includes sturdy beds in all sizes—King, Queen, 6x6, 5x6, and 4x6—along with wardrobes, bedside tables, and dressing units that combine practicality with elegance. Built from high-quality hardwood and designed to withstand years of use, our bedroom furniture is made for both style and durability. Whether you are furnishing a small apartment in Nairobi or a family home in Murang’a, you’ll find designs that suit your taste and budget. With fair pricing, nationwide delivery, and flexible payment options, Limpopo Furniture is your best choice for bedroom sets in Kenya.',
      key: 'Bedroom'
    },
    { 
      name: 'Dining Room', 
      image: '/images/diningroom.jpg',
      slug: 'dining-room',
      description: 'Make every meal special with stylish and affordable dining room furniture in Kenya from Limpopo Furniture. Our dining sets come in 4-seater, 6-seater, and 8-seater options with wood, glass, or marble finishes, designed to fit any home size or style. Each table and chair is built with durability and comfort in mind, making them ideal for both family meals and entertaining guests. Customers across Nairobi, Kiambu, and Murang’a trust Limpopo Furniture for dining sets that combine elegance with pocket-friendly prices. With easy payment options and reliable delivery anywhere in Kenya, we make it simple to upgrade your dining room affordably.',
      key: 'Dining Room'
    },
    { 
      name: 'Office', 
      image: 'https://readdy.ai/api/search-image?query=A%20set%20of%20stylish%20modern%20chairs%20with%20ergonomic%20design%2C%20showcased%20in%20a%20bright%20interior%20space%2C%20featuring%20clean%20lines%20and%20quality%20materials%2C%20professional%20product%20photography%20with%20soft%20lighting%20against%20a%20light%20background&width=400&height=300&seq=6&orientation=landscape',
      slug: 'office',
      description: 'At Limpopo Furniture, we know the importance of having a comfortable and professional workspace. That’s why we provide a wide range of ergonomic and modern office furniture, including desks, chairs, conference tables, and storage units. Each piece is designed with both functionality and style in mind, ensuring that whether you are setting up a home office or furnishing a corporate workspace, you can do so with confidence. Our office furniture is built to last but priced to remain accessible to businesses and individuals alike. We focus on delivering customer-friendly prices without sacrificing the durability or design that makes our products stand out. From ergonomic chairs that support long working hours to modern desks with storage, Limpopo Furniture offers practical solutions that enhance productivity while respecting your budget. With flexible payment options and delivery across Kenya, we remain the best choice for affordable and reliable office furniture.',
      key: 'Office'
    },
    { 
      name: 'Kitchen', 
      image: '/images/kitchen.jpg',
      slug: 'kitchen',
      description: 'Upgrade your kitchen with affordable kitchen furniture and storage solutions in Kenya from Limpopo Furniture. From sturdy dining tables and chairs to cabinets and shelves for better organization, our kitchen collection is designed to bring both beauty and functionality into your home. Crafted from durable materials and designed for everyday use, our products ensure long-lasting quality. Customers across Nairobi, Kiambu, and Murang’a love our budget-friendly prices and quick delivery services. At Limpopo Furniture, we make it easy to create a kitchen that’s both practical and stylish without straining your budget.',
      key: 'Kitchen'
    },
    { 
      name: 'Outdoor', 
      image: '/images/outdoor.jpg',
      slug: 'outdoor',
      description: 'Enjoy your outdoor spaces with affordable outdoor furniture in Kenya from Limpopo Furniture. We offer stylish garden chairs, tables, and loungers that are perfect for relaxing, entertaining guests, or simply enjoying the sunshine. Built from strong, weather-resistant materials, our outdoor furniture is designed to withstand Kenya’s climate while remaining stylish and comfortable. Whether you live in Nairobi, Kiambu, or Murang’a, our pocket-friendly prices and nationwide delivery make Limpopo Furniture the best choice for outdoor living.',
      key: 'Outdoor'
    },
    { 
      name: 'Storage', 
      image: '/images/storage.jpg',
      slug: 'storage',
      description: 'Stay organized with affordable storage furniture in Kenya from Limpopo Furniture. Our collection includes wardrobes, cabinets, bookshelves, TV stands, and shoe racks that combine practicality with modern design. Made from durable wood and metal finishes, our storage solutions are built to last while remaining stylish. Perfect for homes and offices across Nairobi, Kiambu, and Murang’a, our products are priced with the customer in mind, offering excellent value without compromising on quality. Limpopo Furniture ensures that every household can access reliable and affordable storage solutions delivered anywhere in Kenya.',
      key: 'Storage'
    },
    { 
      name: 'Decor', 
      image: '/images/decor.jpg',
      slug: 'decor',
      description: 'Add the finishing touches to your home with affordable décor in Kenya from Limpopo Furniture. Our décor collection includes elegant mirrors, wall art, lighting, and accessories that transform any room into a stylish and welcoming space. Designed to suit both modern and traditional homes, our pieces are perfect for customers looking to enhance their interiors without overspending. With customer-friendly pricing and delivery across Kenya, Limpopo Furniture makes it easy to decorate your home beautifully and affordably.',
      key: 'Decor'
    },
    { 
      name: 'Sofas', 
      image: '/images/livingroom.jpg',
      slug: 'sofas',
      description: 'Limpopo Furniture offers the best selection of affordable sofas in Kenya, designed to bring comfort and style into your living room without breaking the bank. Whether you’re looking for a compact 2-seater, a spacious 3-seater, a cozy L-shaped design, or a luxurious recliner, our sofas are crafted with strong wooden frames and premium fabrics to ensure long-lasting durability. Perfect for homes in Nairobi, Kiambu, Murang’a, and beyond, our sofas are built for modern lifestyles while remaining easy to clean and maintain. With customer-friendly prices, flexible payment methods like M-Pesa, and fast delivery across Kenya, Limpopo Furniture makes it easy to own the perfect sofa for your home.',
       key: 'Sofas'
    },
    { 
      name: 'TV Stand', 
      image: '/images/livingroom.jpg',
      slug: 'tv-stand',
      description: 'Upgrade your entertainment area with stylish and affordable TV stands in Kenya from Limpopo Furniture. Our TV stands come in a variety of designs, from modern minimalistic styles to larger units with storage for electronics and décor. Built with durable materials, they are made to last while keeping your living room neat and stylish. Customers across Nairobi, Kiambu, and Murang’a love our pocket-friendly pricing and fast delivery, making Limpopo Furniture the go-to choice for TV stands that combine quality with affordability.',
      key: 'TV Stand'
    },
    { 
      name: 'Shoe Rack', 
      image: '/images/storage.jpg',
      slug: 'shoe-rack',
      description: 'Keep your entryway organized with affordable shoe racks in Kenya from Limpopo Furniture. Our shoe racks are designed to store and protect your footwear while adding a touch of style to your home. Whether you need a small rack for a few pairs or a larger unit for the whole family, our collection has something for everyone. Crafted from strong and durable materials, our shoe racks are built to last and priced with our customers in mind. With delivery across Nairobi, Murang’a, and beyond, Limpopo Furniture ensures that organizing your shoes has never been easier or more affordable.',
      key: 'Shoe Rack'
    },
  ];

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await api.getProducts();
        if (response.success) {
          const stats: { [key: string]: number } = {};
          
          // Count products by category
          response.products.forEach((product: any) => {
            const category = product.category;
            stats[category] = (stats[category] || 0) + 1;
          });
          
          setCategoryStats(stats);
        }
      } catch (error) {
        console.error('Error fetching category stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Browse Categories
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Limpopo Furniture offers affordable and stylish furniture in Kenya including sofas, beds, dining sets, office chairs and desks, wardrobes, TV stands, tables, coffee tables, and shoe racks. Our products are crafted for durability and comfort, blending modern designs with strong materials to suit every home and office. With budget-friendly prices, reliable delivery in Nairobi and across all counties, and customer-first service, Limpopo Furniture makes it easy to furnish your home or office with quality pieces that are both functional and elegant
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.slug} to={`/category/${category.slug}`}>
              <Card className="group card-hover overflow-hidden h-full">
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-amber-600 text-white">
                    {loading ? '...' : (categoryStats[category.key] || 0)} items
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
