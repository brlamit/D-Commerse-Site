import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center p-10 bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-3xl shadow-2xl mt-12 mx-auto max-w-3xl transform transition-all duration-300 hover:scale-105">
      <h2 className="text-4xl font-bold text-cyan-400 mb-6">About Us</h2>
      <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed">
        Welcome to <span className="text-cyan-400 font-semibold">E-Wallet</span>, your go-to platform for secure and efficient cryptocurrency transactions. Our mission is to provide a seamless and user-friendly experience for all your digital asset needs.
      </p>
      <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed">
        Whether you're looking to buy, sell, or manage your tokens, our platform is designed to cater to users of all experience levels. With top-notch security measures and an intuitive interface, we aim to make your journey in the world of cryptocurrencies as smooth as possible.
      </p>
      <p className="text-lg text-gray-300 mb-6 text-center leading-relaxed">
        Our team is dedicated to continuously improving and expanding our services to meet the evolving needs of the crypto community. Thank you for choosing <span className="text-cyan-400 font-semibold">E-Wallet</span>. If you have any questions or need assistance, feel free to reach out to our support team.
      </p>
      <p className="text-lg text-cyan-400 font-semibold">Happy trading!</p>
    </div>
  );
};

export default About;
