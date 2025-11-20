import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { ReactTyped as Typed } from "react-typed"; 
import { motion } from "framer-motion";

const HeroSection = () => {
  const images = [
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755966513/hero2_pud4qn.jpg",
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755965834/hero3_imvbs1.jpg",
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755966523/hero6_pafz9b.jpg",
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755965834/hero2_xsdxon.jpg",
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755966518/hero4_sywqdi.jpg",
    "https://res.cloudinary.com/dgbr3ipyh/image/upload/v1755966521/hero5_ro8mla.jpg",
  ];

  const slides = [...images, images[0]];
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [showParagraph, setShowParagraph] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
      setIsTransitioning(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (current === slides.length - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrent(0);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [current, slides.length]);

  // Delay paragraph appearance
  useEffect(() => {
    const timer = setTimeout(() => setShowParagraph(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Sliding container */}
      <div
        className={`absolute inset-0 flex h-full ${
          isTransitioning ? "transition-transform duration-1000 ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-20">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <Typed
              strings={[
                "Best Furniture Shop in Kenya",
                "Your Trusted Home & Office Partner",
                "Discover Affordable Furniture Today",
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
              smartBackspace
            />
          </h1>

          {showParagraph && (
            <motion.p
              className="text-xl text-gray-200 mb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover quality sofas, beds, dining sets, and office furniture at
              customer-friendly prices. Fast delivery in Nairobi and across
              Kenya – shop today with M-Pesa or Cash on Delivery.
            </motion.p>
          )}

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
              asChild
            >
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              asChild
            >
              <Link to="/categories">View Collections</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="absolute bottom-6 left-6 z-30 flex space-x-4">
        <Link
          to="https://www.facebook.com/profile.php?id=100095257727801"
          target="_blank"
          className="text-white/80 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <Facebook className="h-6 w-6" />
        </Link>
        <Link
          to="#"
          className="text-white/80 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <Twitter className="h-6 w-6" />
        </Link>
        <Link
          to="https://www.instagram.com/limpopofurniture_ke"
          target="_blank"
          className="text-white/80 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <Instagram className="h-6 w-6" />
        </Link>
        <Link
          to="https://lite.tiktok.com/t/ZMA83Y7Bu/"
          target="_blank"
          className="text-white/80 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <FaTiktok className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
