
import { FaWhatsapp } from "react-icons/fa";
import { Button } from '@/components/ui/button';

const FloatingWhatsApp = () => {
  const phoneNumber = '+254719845898';
  const message = 'Hello! I\'m interested in your furniture products.';
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        asChild
        size="lg"
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="h-6 w-6" />
        </a>
      </Button>
    </div>
  );
};

export default FloatingWhatsApp;
