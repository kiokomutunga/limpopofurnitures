
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Star, Award, Users, Heart, Hammer, Truck } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-amber-600" />,
      title: "Quality Craftsmanship",
      description: "Every piece is meticulously crafted with attention to detail and built to last generations."
    },
    {
      icon: <Truck className="h-8 w-8 text-amber-600" />,
      title: "Free Nairobi Delivery",
      description: "Free delivery service across Nairobi included with most of our furniture offerings."
    },
    {
      icon: <Hammer className="h-8 w-8 text-amber-600" />,
      title: "Custom Made",
      description: "Locally made custom furniture including sofas, Chester beds, and marble-top tables."
    },
    {
      icon: <Users className="h-8 w-8 text-amber-600" />,
      title: "Customer Support",
      description: "Dedicated customer service team ready to assist you with any questions or concerns."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            About Limpopo Furniture Store
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your trusted local furniture workshop in Roysambu, Nairobi, creating custom 
            sofas, Chester beds, and marble-top tables with free delivery across the city.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Located in Roysambu (Zimmerman area), Nairobi, Limpopo Furniture Store is your 
                  trusted local furniture workshop specializing in custom-made furniture pieces 
                  that transform your living space.
                </p>
                <p>
                  We pride ourselves on creating quality, locally-made furniture including sofas, 
                  Chester beds, dining sets, coffee tables, and beautiful marble-top tables. 
                  Each piece is crafted with attention to detail and built to last.
                </p>
                <p>
                  Our commitment to customer satisfaction includes free delivery across Nairobi, 
                  making quality furniture accessible and convenient for all our customers.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
                alt="Limpopo Furniture showroom"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Visit our workshop in Roysambu or call us to discuss your custom furniture needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/shop">Browse Our Collection</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
