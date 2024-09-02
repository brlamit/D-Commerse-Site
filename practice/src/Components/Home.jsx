import React from 'react';
import { useNavigate } from 'react-router-dom';
import tokenImage from '../assets/token.gif'; // Correct path for the image
import cartImg from '../assets/cart.gif'; // Correct path for the image
import buyImg from '../assets/sales.gif'; // Correct path for the image

const Home = ({ contract, account }) => {
  const navigate = useNavigate();

  const goToBuyToken = () => {
    navigate('/buy-token');
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const goToBuyItems = () => {
    navigate('/buy-items');
  };

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-8 bg-gradient-to-r">
      <div className="mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse mb-6">
          Welcome to Our E-Commerce Platform!
        </h1>
        <p className="text-lg text-gray-300 max-w-xl mx-auto leading-relaxed">
          Discover the future of shopping with our token-based platform. Purchase exclusive tokens, add items to your cart, and buy your favorite products with ease. Enjoy a seamless and secure shopping experience powered by blockchain technology.
        </p>
      </div>

      <div className="flex gap-12">
        <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Buy Token</h2>
          <img
            src={tokenImage}
            alt="Buy Token"
            className="w-64 h-64 mb-6 rounded-lg object-cover shadow-lg"
          />
          <button
            onClick={goToBuyToken}
            className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span>Buy Token</span>
            <span className="ml-2 text-4xl">→</span>
          </button>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300 ">
          <h2 className="text-3xl font-bold text-orange-400 mb-4">Cart</h2>
          <img
            src={cartImg}
            alt="Cart"
            className="w-64 h-64 mb-6 rounded-lg object-cover shadow-lg"
          />
          <button
            onClick={goToCart}
            className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:from-orange-500 hover:to-yellow-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span>View Cart</span>
            <span className="ml-2 text-4xl">→</span>
          </button>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-110 transition-all duration-300">
          <h2 className="text-3xl font-bold text-red-400 mb-4">Buy Items</h2>
          <img
            src={buyImg}
            alt="Buy Items"
            className="w-64 h-64 mb-6 rounded-lg object-cover shadow-lg"
          />
          <button
            onClick={goToBuyItems}
            className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <span>Buy Items</span>
            <span className="ml-2 text-4xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
