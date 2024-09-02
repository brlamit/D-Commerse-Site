import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  const handleBuy = (item) => {
    // Navigate to BuyItems page and pass item details via state
    navigate('/buy-items', { state: { item } });
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-br from-gray-600 via-gray-900 to-gray-700 min-h-screen p-8">
      <h2 className="text-4xl font-extrabold text-white mb-8">Cart</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-60 h-60 mb-4 rounded-lg object-cover transition-transform transform hover:scale-110"
                onClick={() => handleBuy(item)} // Use handleBuy to navigate
              />
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-gray-300 mb-2">{item.description}</p>
                <p className="text-sm text-green-300 mb-4 font-semibold">{item.price}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-colors hover:scale-105 transform"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleBuy(item)} // Use handleBuy to navigate
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors hover:scale-105 transform"
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-xl">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
