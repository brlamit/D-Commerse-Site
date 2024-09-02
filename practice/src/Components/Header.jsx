import React from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

const getTokenBalance = async (contract, account, dispatch) => {
  if (contract && account) {
    try {
      const balance = await contract.methods.balanceOf(account).call();
      console.log("Raw Token Balance: ", balance); // Debugging to see the raw balance

      // Assuming the token has 18 decimals, adjust the balance
      const decimals = 18;  // Set this to your token's decimal count
      const formattedBalance = Web3.utils.fromWei(balance, 'ether'); // 'ether' implies 18 decimals

      dispatch({ type: 'SET_TOKEN_BALANCE', payload: formattedBalance });
    } catch (error) {
      console.error('Error fetching token balance:', error);
    }
  }
};

const Header = ({ connectWallet, disconnectWallet, account, balance, tokenBalance, dispatch }) => {
  // Format token balance to a more readable format
  const formattedTokenBalance = tokenBalance ? Web3.utils.fromWei(tokenBalance, 'ether') : '0';

  return (
    <header className="w-full flex items-center justify-between bg-gradient-to-r from-teal-600 to-blue-500 text-white py-4 px-6 mt-3 rounded-lg shadow-lg">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-white">
          <h1 className="text-4xl font-extrabold tracking-tight cursor-pointer">Builders Store</h1>
        </Link>
      </div>
      <nav className="flex-1 flex justify-center">
        <div className="flex gap-6">
          <Link 
            to="/" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Home
          </Link>
          <Link 
            to="/buy-token" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Buy Token
          </Link>
          <Link 
            to="/cart" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Cart
          </Link>
          <Link 
            to="/buy-items" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Buy Items
          </Link>
          <Link 
            to="/my-order" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            My Order
          </Link>
          <Link 
            to="/transactions" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Transactions
          </Link>
          <Link 
            to="/about" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            About
          </Link>
          <Link 
            to="/help" 
            className="text-lg font-medium hover:text-gray-200 transition-colors transform hover:scale-105 active:scale-110"
          >
            Help
          </Link>
        </div>
      </nav>
      <div className="flex items-center gap-6">
        {account ? (
          <>
            <div className="text-right">
              <p className="text-xl font-semibold">Token: {formattedTokenBalance}</p>
              <p className="text-sm text-gray-100">Address: {`${account.slice(0, 6)}....${account.slice(-4)}`}</p>
              <p className="text-sm text-gray-100">Balance: {`${parseFloat(balance).toFixed(4)} ETH`}</p>
            </div>
            <button
              onClick={disconnectWallet}
              className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors transform hover:scale-105 active:scale-110"
              aria-label="Disconnect Wallet"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={connectWallet}
            className="bg-teal-500 text-white py-2 px-6 rounded-full hover:bg-teal-600 transition-colors transform hover:scale-105 active:scale-110"
            aria-label="Connect Wallet"
          >
            Connect
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
