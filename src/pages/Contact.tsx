import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, AtSign, FileText } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface TailorApplicationForm {
  name: string;
  email: string;
  phone: string;
  experience: string;
  specialties: string;
  location: string;
  gender_preference: 'male' | 'female' | 'any';
  message: string;
}

const initialContactForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const initialTailorForm: TailorApplicationForm = {
  name: '',
  email: '',
  phone: '',
  experience: '',
  specialties: '',
  location: '',
  gender_preference: 'any',
  message: '',
};

const Contact: React.FC = () => {
  const { user } = useAuth();
  const [contactForm, setContactForm] = useState<ContactForm>(initialContactForm);
  const [tailorForm, setTailorForm] = useState<TailorApplicationForm>(initialTailorForm);
  const [activeTab, setActiveTab] = useState<'contact' | 'apply'>('contact');
  const [submitting, setSubmitting] = useState(false);

  // Pre-fill forms with user data if available
  React.useEffect(() => {
    if (user?.email) {
      setContactForm(prev => ({ ...prev, email: user.email || '' }));
      setTailorForm(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTailorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTailorForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, this would be an actual Supabase insert
      // const { error } = await supabase
      //   .from('contact_messages')
      //   .insert([
      //     {
      //       name: contactForm.name,
      //       email: contactForm.email,
      //       subject: contactForm.subject,
      //       message: contactForm.message
      //     }
      //   ]);
      
      // if (error) throw error;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your message has been sent! We will get back to you soon.');
      setContactForm(initialContactForm);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTailorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tailorForm.name || !tailorForm.email || !tailorForm.phone || !tailorForm.experience || 
        !tailorForm.specialties || !tailorForm.location) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // In a real app, this would be an actual Supabase insert
      // const { error } = await supabase
      //   .from('tailor_applications')
      //   .insert([
      //     {
      //       user_id: user?.id,
      //       name: tailorForm.name,
      //       email: tailorForm.email,
      //       phone: tailorForm.phone,
      //       experience: parseInt(tailorForm.experience),
      //       specialties: tailorForm.specialties.split(',').map(s => s.trim()),
      //       location: tailorForm.location,
      //       gender_preference: tailorForm.gender_preference,
      //       status: 'pending'
      //     }
      //   ]);
      
      // if (error) throw error;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your application has been submitted! We will review it and get back to you soon.');
      setTailorForm(initialTailorForm);
    } catch (error) {
      console.error('Error submitting tailor application:', error);
      toast.error('Failed to submit application. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? We are here to help. Reach out to our team or apply to join our network of professional tailors.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Email</h3>
              <p className="text-gray-600">support@doorsteptailoring.com</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            For general inquiries and support requests. We typically respond within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Phone</h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Available Monday to Friday, 9am to 6pm EST for urgent matters.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Headquarters</h3>
              <p className="text-gray-600">123 Fashion Ave, New York, NY</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            Our main office location. Please note all services are delivered at your doorstep.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('contact')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'contact'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Send a Message
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === 'apply'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Apply as a Tailor
          </button>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'contact' ? (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <AtSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      className="block w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={contactForm.message}
                  onChange={handleContactChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleTailorSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tailor-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="tailor-name"
                    name="name"
                    value={tailorForm.name}
                    onChange={handleTailorChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="tailor-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="tailor-email"
                    name="email"
                    value={tailorForm.email}
                    onChange={handleTailorChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={tailorForm.phone}
                    onChange={handleTailorChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    min="0"
                    max="50"
                    value={tailorForm.experience}
                    onChange={handleTailorChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-1">
                  Specialties <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="specialties"
                  name="specialties"
                  value={tailorForm.specialties}
                  onChange={handleTailorChange}
                  placeholder="e.g. Men &apos;s Suits, Bridal Wear, Alterations (comma separated)"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={tailorForm.location}
                    onChange={handleTailorChange}
                    placeholder="City, State"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="gender_preference" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender Preference
                  </label>
                  <select
                    id="gender_preference"
                    name="gender_preference"
                    value={tailorForm.gender_preference}
                    onChange={handleTailorChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="any">Any Gender</option>
                    <option value="male">Male Clients</option>
                    <option value="female">Female Clients</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="tailor-message" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="tailor-message"
                  name="message"
                  rows={4}
                  value={tailorForm.message}
                  onChange={handleTailorChange}
                  placeholder="Tell us about your background, skills, and why you want to join our platform"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex justify-center items-center py-3 px-6 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How does doorstep tailoring work?</h3>
            <p className="text-gray-600">
              Our tailors come to your location at your scheduled time. They take measurements, discuss your requirements, and then complete the work at their workshop before delivering the finished garments back to you.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What areas do you service?</h3>
            <p className="text-gray-600">
              We currently provide services in major metropolitan areas. Enter your location during booking to check if we serve your area.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">How are payments handled?</h3>
            <p className="text-gray-600">
              Payment is collected after the service is completed to your satisfaction. We accept all major credit cards, digital wallets, and cash.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What if I&apos;m not satisfied with the service?</h3>
            <p className="text-gray-600">
              We offer a satisfaction guarantee. If you&apos;re not happy with the results, we&apos;ll make the necessary adjustments at no additional cost.
            </p>
          </div>
        </div>
      </div>

      <div>
        <p>It&apos;s a great day!</p>
      </div>
    </div>
  );
};

export default Contact; 