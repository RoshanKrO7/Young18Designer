import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Ruler, Clock } from 'lucide-react';

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">Services</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Scissors className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Tailoring Services</h3>
          <p className="text-gray-600 mb-4">
            Choose from a variety of tailoring services.
          </p>
          <Link
            to="/services/tailoring"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Select
          </Link>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Ruler className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Measurement Services</h3>
          <p className="text-gray-600 mb-4">
            Get precise measurements for your garments.
          </p>
          <Link
            to="/services/measurement"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Select
          </Link>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Alteration Services</h3>
          <p className="text-gray-600 mb-4">
            Alter your garments to fit perfectly.
          </p>
          <Link
            to="/services/alteration"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
          >
            Select
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;