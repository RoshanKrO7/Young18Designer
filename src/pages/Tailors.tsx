import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Scissors, User } from 'lucide-react';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

interface Tailor {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  location: string;
  specialties: string[];
  experience: number;
  gender_preference?: 'male' | 'female' | 'any';
}

// Mock data - would be fetched from Supabase in a real app
const mockTailors: Tailor[] = [
  {
    id: '1',
    name: 'John Smith',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    reviews: 124,
    location: 'Manhattan, NY',
    specialties: ['Men\'s Suits', 'Formal Wear', 'Alterations'],
    experience: 12,
    gender_preference: 'male',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4.9,
    reviews: 89,
    location: 'Brooklyn, NY',
    specialties: ['Women\'s Dresses', 'Bridal Wear', 'Custom Stitching'],
    experience: 8,
    gender_preference: 'female',
  },
  {
    id: '3',
    name: 'Alex Wong',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 4.7,
    reviews: 56,
    location: 'Queens, NY',
    specialties: ['Alterations', 'Repairs', 'Traditional Wear'],
    experience: 15,
    gender_preference: 'any',
  },
];

const Tailors: React.FC = () => {
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  useEffect(() => {
    const fetchTailors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // In a real app, this would fetch from Supabase
        // const { data, error } = await supabase
        //   .from('tailors')
        //   .select('*')
        //   .order('rating', { ascending: false });
        
        // if (error) throw error;
        
        // For now, we'll use our mock data
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTailors(mockTailors);
      } catch (err) {
        console.error('Error fetching tailors:', err);
        setError('Failed to load tailors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTailors();
  }, []);

  // Get all unique specialties
  const allSpecialties = Array.from(
    new Set(
      tailors.flatMap(tailor => tailor.specialties)
    )
  ).sort();

  // Filter tailors by specialty if one is selected
  const filteredTailors = selectedSpecialty
    ? tailors.filter(tailor => tailor.specialties.includes(selectedSpecialty))
    : tailors;

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Expert Tailors</h1>
        <p className="text-xl text-gray-600 mb-8">
          Meet our team of skilled professionals ready to bring your fashion ideas to life.
        </p>
        
        {/* Specialty Filter */}
        {allSpecialties.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedSpecialty(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedSpecialty === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Specialties
              </button>
              {allSpecialties.map(specialty => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedSpecialty === specialty
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {specialty}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {filteredTailors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No tailors found matching the selected specialty.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTailors.map((tailor) => (
            <div
              key={tailor.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={tailor.image}
                  alt={tailor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h2 className="text-xl font-semibold text-white">{tailor.name}</h2>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-white">{tailor.rating}</span>
                    <span className="ml-1 text-gray-300">({tailor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start mb-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-2" />
                  <span>{tailor.location}</span>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-1">Specialties</h3>
                  <div className="flex flex-wrap gap-1">
                    {tailor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Scissors className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600">{tailor.experience} years experience</span>
                  </div>
                  
                  {tailor.gender_preference && tailor.gender_preference !== 'any' && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">
                        {tailor.gender_preference === 'male' ? 'Men\'s specialist' : 'Women\'s specialist'}
                      </span>
                    </div>
                  )}
                </div>
                
                <Link
                  to={`/booking?tailor=${encodeURIComponent(tailor.name)}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-blue-50 p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
        <p className="text-gray-600 mb-6">
          Are you a skilled tailor looking to expand your client base? Join our platform and connect with customers in your area.
        </p>
        <Link
          to="/contact"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

export default Tailors; 