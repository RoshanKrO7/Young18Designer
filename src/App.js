import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Auth from './pages/Auth.jsx';
import Dashboard from './pages/Services.jsx';
import Cart from './pages/Cart.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Tailoring from './pages/Tailoring.jsx';
import Measurement from './pages/Measurement.jsx';
import Alteration from './pages/Alteration.jsx';
import Account from './pages/Account.jsx';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router basename="/smart-tailor-webapp">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/tailoring" element={<Tailoring setCart={setCart} cart={cart} />} />
        <Route path="/services/measurement" element={<Measurement />} />
        <Route path="/services/alteration" element={<Alteration />} />
        <Route path="/account" element={<Account />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;