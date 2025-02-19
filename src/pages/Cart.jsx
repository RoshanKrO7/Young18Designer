import React from 'react';

const Cart = ({ cart, setCart }) => {
  const handleIncreaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const handleDecreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  const handleRemoveItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const totalCost = cart.reduce((total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-12">Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {cart.map((item, index) => (
              <div key={index} className="text-center p-4 bg-white rounded-lg shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-lg mb-2" />
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-md font-bold mb-2">{item.price}</p>
                <div className="flex justify-center items-center mb-2">
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
                    onClick={() => handleDecreaseQuantity(index)}
                  >
                    -
                  </button>
                  <span className="px-4 py-1">{item.quantity}</span>
                  <button
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
                    onClick={() => handleIncreaseQuantity(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
                  onClick={() => handleRemoveItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Total Cost</h2>
            <p className="text-xl font-semibold">${totalCost.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;