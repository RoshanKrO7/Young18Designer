import React from 'react';
import {
  Scissors,
  Ruler,
  Timer,
  Sparkles,
  ShirtIcon,
  Clock,
  BadgeIndianRupee,
  ShoppingBag
} from 'lucide-react';
import { useCart } from '../providers/CartProvider';
import Cart from '../components/Cart';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  duration: string;
}

const services: Service[] = [
  {
    id: 'alterations',
    title: 'Alterations',
    description: 'Professional alterations for all types of clothing. Get the perfect fit for your garments.',
    icon: <Scissors className="w-6 h-6" />,
    price: 'Starting from ₹200',
    duration: '1-2 days',
  },
  {
    id: 'custom-stitching',
    title: 'Custom Stitching',
    description: 'Get your dream outfit custom-made to your exact measurements and preferences.',
    icon: <Ruler className="w-6 h-6" />,
    price: 'Starting from ₹1000',
    duration: '3-5 days',
  },
  {
    id: 'designer-wear',
    title: 'Designer Wear',
    description: 'Custom designer outfits created to your specifications with premium materials.',
    icon: <Sparkles className="w-6 h-6" />,
    price: 'Starting from ₹3000',
    duration: '7-10 days',
  },
  {
    id: 'traditional-wear',
    title: 'Traditional Wear',
    description: 'Expert crafting of traditional and cultural garments with authentic designs.',
    icon: <ShirtIcon className="w-6 h-6" />,
    price: 'Starting from ₹2000',
    duration: '5-7 days',
  },
  {
    id: 'express-service',
    title: 'Express Service',
    description: 'Urgent alterations and repairs with same-day or next-day delivery.',
    icon: <Timer className="w-6 h-6" />,
    price: 'Additional ₹500',
    duration: '4-24 hours',
  },
];

const Services: React.FC = () => {
  const { addItem, items, setIsCartOpen } = useCart();

  const handleAddToCart = (service: Service) => {
    addItem({
      id: service.id,
      title: service.title,
      price: service.price
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600">
          Professional tailoring services customized to your needs, delivered at your doorstep.
        </p>
      </div>

      {/* Cart Button */}
      {items.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <ShoppingBag className="h-6 w-6" />
            <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {items.length}
            </span>
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <div className="text-blue-600">{service.icon}</div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center text-gray-600 mb-2">
                <BadgeIndianRupee className="w-4 h-4 mr-2" />
                <span>{service.price}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>{service.duration}</span>
              </div>
              <button
                onClick={() => handleAddToCart(service)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <Cart />
    </div>
  );
};

export default Services; 