import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Search, User, ChevronDown, icons } from 'lucide-react';
import { FaTiktok } from "react-icons/fa";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserDropdown } from './UserDropdown';
import SearchWithSuggestions from './SearchWithSuggestions';
import FloatingWhatsApp from './FloatingWhatsApp';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItemCount = getTotalItems();

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Shop', 
      href: '/shop',
      dropdown: [
        { name: 'All Products', href: '/shop' },
        { name: 'New Arrivals', href: '/shop?sort=newest' },
        { name: 'Best Sellers', href: '/shop?sort=popular' },
        { name: 'Sale Items', href: '/shop?filter=sale' },
        { name: 'My Orders', href: '/my-orders' },
        { name: 'Track Order', href: '/track-order' },
      ]
    },
    { 
      name: 'Categories', 
      href: '/categories',
      dropdown: [
        { name: 'Tables', href: '/category/tables' },
        { name: 'Bedroom', href: '/category/bedroom' },
        { name: 'Dining Room', href: '/category/dining-room' },
        { name: 'Office', href: '/category/office' },
        { name: 'Kitchen', href: '/category/kitchen' },
        { name: 'Outdoor', href: '/category/outdoor' },
        { name: 'Storage', href: '/category/storage' },
        { name: 'Decor', href: '/category/decor' },
        { name: 'Sofas', href: '/category/sofas' },
        { name: 'TV Stand', href: '/category/tv-stand' },
        { name: 'Shoe Rack', href: '/category/shoe-rack' },
      ]
    },
    { name: 'Offers', href: '/shop?maxPrice=50000' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileSection = (sectionName: string) => {
    setExpandedMobileSection(expandedMobileSection === sectionName ? null : sectionName);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/redisgn.jpg" 
                alt="Limpopo Furniture Logo" 
                className="w-12 h-12 object-contain rounded-lg"
              />
              <span className="text-xl font-bold text-foreground">
                Limpopo<span className="text-amber-600"> Furniture</span> <br /> Stores
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.dropdown ? (
                    <>
                      <Link
                        to={item.href}
                        className={`text-sm font-medium transition-colors hover:text-amber-600 flex items-center ${
                          isActive(item.href) ? 'text-amber-600' : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </Link>
                      <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-50 border border-gray-200">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-md transition-colors text-sm"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={`text-sm font-medium transition-colors hover:text-amber-600 ${
                        isActive(item.href) ? 'text-amber-600' : 'text-gray-700'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-sm mx-8">
              <SearchWithSuggestions />
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User Authentication */}
              {user ? (
                <UserDropdown />
              ) : (
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-amber-600" asChild>
                  <Link to="/account">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
              )}
              
              <Button variant="ghost" size="sm" className="relative text-gray-700 hover:text-amber-600" asChild>
                <Link to="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-amber-600 hover:bg-amber-600"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-gray-700 hover:text-amber-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <SearchWithSuggestions />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border shadow-inner max-h-[calc(100vh-5rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleMobileSection(item.name)}
                          className={`w-full flex justify-between items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                            isActive(item.href) 
                              ? 'bg-amber-50 text-amber-600' 
                              : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                          }`}
                        >
                          {item.name}
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedMobileSection === item.name ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedMobileSection === item.name && (
                          <div className="pl-4 space-y-1 mt-1">
                            <Link
                              to={item.href}
                              className="block px-3 py-2 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              All {item.name}
                            </Link>
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                className="block px-3 py-2 text-sm text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive(item.href) 
                            ? 'bg-amber-50 text-amber-600' 
                            : 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      <footer className="bg-gray-100 border-t py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* About Us */}
            <div>
              <h4 className="font-semibold text-lg text-foreground mb-4">About Us</h4>
              <p className="text-sm text-muted-foreground">
                Limpopo Furniture Store Roysambu is Kenya’s trusted destination for quality 
                and affordable home furniture. From durable sofas and modern beds to elegant dining sets, wardrobes,
                 and office tables, we provide stylish furniture crafted to suit every Kenyan home. With customer-friendly prices 
                and reliable delivery across Nairobi and beyond, Limpopo makes it easy to transform your space with comfort and style.
              </p>
              <div className="mt-4 flex space-x-4">
                <Link to="https://www.facebook.com/profile.php?id=100095257727801" target="_blank" className="text-gray-500 hover:text-amber-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link to="#" className="text-gray-500 hover:text-amber-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                  
                </Link>
                <Link to="https://www.instagram.com/limpopofurniture_ke" target="_blank" className="text-gray-500 hover:text-amber-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link to="https://lite.tiktok.com/t/ZMA83Y7Bu/" target="_blank" className="text-gray-500 hover:text-amber-600 transition-colors">
                  <FaTiktok className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="font-semibold text-lg text-foreground mb-4">Contact</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:limpopofurniture@gmail.com">limpopofurniture@gmail.com</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:+254719845898">+254 719 845 898</a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Roysambu, Thika Road, near Zimmerman, Nairobi, Kenya</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium">Business Hours:</p>
                <ul className="space-y-1">
                  <li>Mon - Fri: 8:30 AM - 6:00 PM</li>
                  <li>Saturday: 9:00 AM - 5:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg text-foreground mb-4">Quick Links</h4>
              <nav className="flex flex-col text-sm text-muted-foreground space-y-2">
                <Link to="/" className="hover:text-amber-600 transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="hover:text-amber-600 transition-colors">
                  Shop
                </Link>
                <Link to="/categories" className="hover:text-amber-600 transition-colors">
                  Categories
                </Link>
                <Link to="/about" className="hover:text-amber-600 transition-colors">
                  About Us
                </Link>
                <Link to="/contact" className="hover:text-amber-600 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Account & Services */}
            <div>
              <h4 className="font-semibold text-lg text-foreground mb-4">My Account</h4>
              <nav className="flex flex-col text-sm text-muted-foreground space-y-2">
                <Link to="/my-orders" className="hover:text-amber-600 transition-colors">
                  My Orders
                </Link>
                <Link to="/track-order" className="hover:text-amber-600 transition-colors">
                  Track Order
                </Link>
                <Link to="/shop?sort=newest" className="hover:text-amber-600 transition-colors">
                  New Arrivals
                </Link>
                <Link to="/shop?maxPrice=50000" className="hover:text-amber-600 transition-colors">
                  Offers
                </Link>
              </nav>
            </div>
            
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 py-4 border-t text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Limpopo Furniture Store Roysambu. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
