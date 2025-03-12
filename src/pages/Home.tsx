import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle, Clock, MapPin } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90 rounded-3xl"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center rounded-3xl overflow-hidden">
          <div className="md:w-1/2 text-center md:text-left text-white z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Expert Tailoring at Your Doorstep
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Professional tailors come to you. Perfect fit, maximum convenience.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <Link
                to="/services"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200 flex items-center justify-center"
              >
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/booking"
                className="bg-transparent hover:bg-blue-800 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center"
              >
                Book Now
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 z-10">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Tailor measuring a suit"
              className="rounded-xl shadow-2xl transform md:translate-x-8 md:scale-110"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple process brings professional tailoring services directly to your doorstep
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Book an Appointment</h3>
            <p className="text-gray-600">
              Choose your preferred service, select a tailor, and schedule a convenient time for your appointment.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Meet Your Tailor</h3>
            <p className="text-gray-600">
              Your tailor arrives at your location with all necessary equipment to take measurements and discuss your requirements.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-4">Get Perfect Results</h3>
            <p className="text-gray-600">
              Your garments are expertly tailored and delivered back to you, ensuring the perfect fit and satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Our Top Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Top Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through some of our finest tailoring projects
          </p>
        </div>

        <div className="flex flex-nowrap overflow-x-auto pb-8 hide-scrollbar">
          <div className="flex space-x-4">
            {[
              {
                id: 1,
                title: "Custom Wedding Suit",
                image: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
                description: "Bespoke three-piece suit tailored for a summer wedding"
              },
              {
                id: 2,
                title: "Evening Gown Alterations",
                image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Detailed alterations on a designer evening gown"
              },
              {
                id: 3,
                title: "Business Attire Set",
                image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
                description: "Complete business wardrobe tailoring for executives"
              },
              {
                id: 4,
                title: "Traditional Outfit",
                image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Customized traditional attire with modern elements"
              },
              {
                id: 5,
                title: "Vintage Restoration",
                image: "https://images.unsplash.com/photo-1611911813383-67769b37a149?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80",
                description: "Restoration and alteration of vintage clothing pieces"
              },
              {
                id: 6,
                title: "Casual Collection",
                image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                description: "Custom casual wear collection for everyday comfort"
              }
            ].map((work) => (
              <div 
                key={work.id} 
                className="flex-shrink-0 w-64 md:w-72 h-96 relative rounded-xl overflow-hidden group transition-all duration-500 hover:w-96"
              >
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-2">{work.title}</h3>
                  <p className="text-gray-200 text-sm">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the advantages of our doorstep tailoring service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <CheckCircle className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Tailors</h3>
              <p className="text-gray-600">
                Our tailors have years of experience and specialized skills in various tailoring techniques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <p className="text-xl font-semibold mb-2">Time-Saving</p>
              <p className="text-gray-600">
                No more trips to the tailor shop. We come to you at your convenient time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Star className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                We stand behind our work with a satisfaction guarantee on all services.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <MapPin className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Convenient Service</h3>
              <p className="text-gray-600">
                Service at your home, office, or any location of your choice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our satisfied customers about their experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              name: "Michael Johnson",
              role: "Business Executive",
              image: "https://randomuser.me/api/portraits/men/32.jpg",
              quote: "The convenience of having a tailor come to my office for fittings has been a game-changer. The quality of work is exceptional."
            },
            {
              id: 2,
              name: "Sarah Williams",
              role: "Wedding Planner",
              image: "https://randomuser.me/api/portraits/women/44.jpg",
              quote: "I recommend Doorstep Tailoring to all my clients. Their attention to detail and ability to work with tight deadlines is impressive."
            },
            {
              id: 3,
              name: "David Chen",
              role: "Fashion Designer",
              image: "https://randomuser.me/api/portraits/men/64.jpg",
              quote: "As someone in the fashion industry, I have high standards. This service consistently exceeds my expectations with their craftsmanship."
            }
          ].map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 rounded-3xl">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience Premium Tailoring Services?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Book your appointment today and discover the convenience of doorstep tailoring.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition-all duration-200"
            >
              Book an Appointment
            </Link>
            <Link
              to="/services"
              className="bg-transparent hover:bg-blue-700 text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
            >
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Add custom styles for the hover effect */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;