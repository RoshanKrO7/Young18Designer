import React, { useState } from 'react';

const Tailoring = ({ cart, setCart }) => {
  const [gender, setGender] = useState('male');
  const services = [
    {
      id: 1,
      name: 'Custom Suit',
      description: 'A perfectly tailored suit for any occasion.',
      price: '$200',
      image: require('../images/NewwhiteBgColor.png'), // Corrected file extension
      gender: 'male',
    },
    {
      id: 2,
      name: 'Dress Shirt',
      description: 'A custom-fitted dress shirt.',
      price: '$50',
      image: require('../images/NewwhiteBgColor.png'), // Corrected file extension
      gender: 'male',
    },
    {
      id: 3,
      name: 'Evening Gown',
      description: 'A beautiful evening gown for special occasions.',
      price: '$300',
      image: require('../images/NewwhiteBgColor.png'), // Corrected file extension
      gender: 'female',
    },
    {
      id: 4,
      name: 'Blouse',
      description: 'A custom-fitted blouse.',
      price: '$60',
      image: require('../images/NewwhiteBgColor.png'), // Corrected file extension
      gender: 'female',
    },
    // Add more services as needed
  ];

  const handleAddToCart = (service) => {
    const newService = { ...service, quantity: 1 };
    setCart([...cart, newService]);
    console.log(`Added ${service.name} to cart`);
  };

  const filteredServices = services.filter(service => service.gender === gender);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">Tailoring Services</h1>
      <div className="text-center mb-8">
        <button
          className={`px-4 py-2 rounded-full font-semibold ${gender === 'male' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setGender('male')}
        >
          Male
        </button>
        <button
          className={`px-4 py-2 rounded-full font-semibold ml-4 ${gender === 'female' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setGender('female')}
        >
          Female
        </button>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {filteredServices.map((service) => (
          <div key={service.id} className="text-center p-6 bg-white rounded-lg shadow-lg">
            <img src={service.image} alt={service.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-lg font-bold mb-4">{service.price}</p>
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
              onClick={() => handleAddToCart(service)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tailoring;