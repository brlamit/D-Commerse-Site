import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-700 to-gray-900 text-white py-6 px-4">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} E-Wallet. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}

export default Footer;
