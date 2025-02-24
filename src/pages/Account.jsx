import React, { useState } from 'react';

const Account = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '********',
    phone: '123-456-7890',
  });

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: '2025-02-15',
      items: [
        { name: 'Custom Suit', quantity: 1, price: '$200' },
        { name: 'Dress Shirt', quantity: 2, price: '$50' },
      ],
      total: '$300',
    },
    {
      id: 2,
      date: '2025-01-10',
      items: [
        { name: 'Evening Gown', quantity: 1, price: '$300' },
      ],
      total: '$300',
    },
  ]);

  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Main St, Springfield, IL' },
    { id: 2, address: '456 Elm St, Springfield, IL' },
  ]);

  const [measurements, setMeasurements] = useState({
    height: '5\'10"',
    chest: '40"',
    waist: '32"',
    hips: '38"',
  });

  const [unit, setUnit] = useState('inches');
  const [view, setView] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Add logic to save user profile changes
    console.log('Profile saved', user);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { id: addresses.length + 1, address: '' }]);
  };

  const handleAddressChange = (id, value) => {
    setAddresses(addresses.map(addr => addr.id === id ? { ...addr, address: value } : addr));
  };

  const handleSaveAddresses = () => {
    // Add logic to save addresses
    console.log('Addresses saved', addresses);
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prevMeasurements) => ({
      ...prevMeasurements,
      [name]: value,
    }));
  };

  const handleSaveMeasurements = () => {
    // Add logic to save measurements
    console.log('Measurements saved', measurements);
  };

  const handleLogout = () => {
    // Add logic to handle logout
    console.log('User logged out');
  };

  const toggleUnit = () => {
    if (unit === 'inches') { 
      setUnit('cm');
      setMeasurements({
        height: (parseFloat(measurements.height) * 2.54).toFixed(2),
        chest: (parseFloat(measurements.chest) * 2.54).toFixed(2),
        waist: (parseFloat(measurements.waist) * 2.54).toFixed(2),
        hips: (parseFloat(measurements.hips) * 2.54).toFixed(2),
      });
    } else {
      setUnit('inches');
      setMeasurements({
        height: (parseFloat(measurements.height) / 2.54).toFixed(2),
        chest: (parseFloat(measurements.chest) / 2.54).toFixed(2),
        waist: (parseFloat(measurements.waist) / 2.54).toFixed(2),
        hips: (parseFloat(measurements.hips) / 2.54).toFixed(2),
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
      >
        Logout
      </button>
      <h1 className="text-4xl font-bold text-center mb-12">Account</h1>
      <div className="flex flex-wrap justify-center mb-8">
        <button
          onClick={() => setView('profile')}
          className={`px-4 py-2 rounded-lg font-semibold mr-4 mb-2 ${view === 'profile' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Profile
        </button>
        <button
          onClick={() => setView('addresses')}
          className={`px-4 py-2 rounded-lg font-semibold mr-4 mb-2 ${view === 'addresses' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Addresses
        </button>
        <button
          onClick={() => setView('measurements')}
          className={`px-4 py-2 rounded-lg font-semibold mr-4 mb-2 ${view === 'measurements' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Measurements
        </button>
        <button
          onClick={() => setView('orders')}
          className={`px-4 py-2 rounded-lg font-semibold mb-2 ${view === 'orders' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Order History
        </button>
      </div>

      {view === 'profile' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save
          </button>
        </div>
      )}

      {view === 'addresses' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Addresses</h2>
          {addresses.map((address) => (
            <div key={address.id} className="mb-4">
              <label className="block text-gray-700">Address {address.id}</label>
              <input
                type="text"
                value={address.address}
                onChange={(e) => handleAddressChange(address.id, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
            </div>
          ))}
          <button
            onClick={handleAddAddress}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 mb-4"
          >
            Add Address
          </button>
          <button
            onClick={handleSaveAddresses}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Addresses
          </button>
        </div>
      )}

      {view === 'measurements' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Measurements</h2>
            <button
              onClick={toggleUnit}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
            >
              {unit === 'inches' ? 'Switch to cm' : 'Switch to inches'}
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Height ({unit})</label>
            <input
              type="text"
              name="height"
              value={measurements.height}
              onChange={handleMeasurementChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Chest ({unit})</label>
            <input
              type="text"
              name="chest"
              value={measurements.chest}
              onChange={handleMeasurementChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Waist ({unit})</label>
            <input
              type="text"
              name="waist"
              value={measurements.waist}
              onChange={handleMeasurementChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hips ({unit})</label>
            <input
              type="text"
              name="hips"
              value={measurements.hips}
              onChange={handleMeasurementChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            onClick={handleSaveMeasurements}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Save Measurements
          </button>
        </div>
      )}

      {view === 'orders' && (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Order History</h2>
          {orders.map((order) => (
            <div key={order.id} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Order #{order.id}</h3>
              <p className="text-gray-600 mb-2">Date: {order.date}</p>
              <ul className="mb-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item.name} (x{item.quantity}) - {item.price}
                  </li>
                ))}
              </ul>
              <p className="text-gray-800 font-bold">Total: {order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;