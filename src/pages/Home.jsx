import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Clock, ThumbsUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-8"> {/* Reduced space between sections */}
      {/* Hero Section */}
      <section className="text-center py-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"> {/* Reduced padding */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Professional Tailoring at Your Doorstep</h1>
          <p className="text-lg mb-6 max-w-xl mx-auto">
            Experience the convenience of custom tailoring without leaving your home. Our expert tailors come to you!
          </p>
          <Link
            to="/auth"
            className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-8"> {/* Reduced padding */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Scissors className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Expert Tailors</h3>
            <p className="text-gray-600 text-sm">
              Skilled professionals with years of experience
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ruler className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Perfect Fit</h3>
            <p className="text-gray-600 text-sm">
              Precise measurements for your perfect fit
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Convenient Service</h3>
            <p className="text-gray-600 text-sm">
              At-home service with flexible scheduling
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-16 rounded-3xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Book Online</h3>
              <p className="text-gray-600">Choose your service and preferred time</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Tailor Visit</h3>
              <p className="text-gray-600">Expert tailor arrives for measurements</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Crafting</h3>
              <p className="text-gray-600">Your garment is crafted to perfection</p>
            </div>
            <div className="text-center">
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <span className="text-xl font-bold text-indigo-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">Final fitting and delivery at your home</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;