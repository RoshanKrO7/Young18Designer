import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Tailors from './pages/Tailors';
import Booking from './pages/Booking';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { Scissors } from 'lucide-react';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAdmin } = useAuth();
  
  if (!user) return <Navigate to="/" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  
  return children;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
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
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Scissors className="h-6 w-6" />
              <span className="text-xl font-semibold">TailorAtHome</span>
            </div>
            <p className="text-center text-gray-400">
              © 2024 TailorAtHome. All rights reserved.
            </p>
          </div>
        </footer>
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              background: '#363636',
              color: '#fff',
              borderRadius: '10px',
              padding: '16px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#F44336',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;