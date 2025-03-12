import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Scissors } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
// import { useAuth } from './providers/AuthProvider';
import { CartProvider } from './providers/CartProvider';
import { APP_NAME } from './config/constants';
import Navbar from './components/Navbar';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Tailors = lazy(() => import('./pages/Tailors'));
const Booking = lazy(() => import('./pages/Booking'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App: React.FC = () => {
  // const { user, isAdmin } = useAuth();

  return (
    <ErrorBoundary>
      <Router>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/tailors" element={<Tailors />} />
                  <Route 
                    path="/booking" 
                    element={
                      <ProtectedRoute>
                        <Booking />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute adminOnly>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <footer className="bg-gray-800 text-white py-6">
              <div className="container mx-auto px-4 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Scissors className="h-6 w-6" />
                  <span className="text-xl font-semibold">{APP_NAME}</span>
                </div>
                <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
              </div>
            </footer>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </CartProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App; 