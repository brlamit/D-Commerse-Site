import React, { useState } from 'react';

const BuyToken = ({ tokensToBuy, setTokensToBuy, buyTokens, setLoading, saveTransaction }) => {
  const [error, setError] = useState(null);

  const handleBuyTokens = async () => {
    // Check if tokensToBuy is valid
    if (tokensToBuy <= 0) {
      setError('Please enter a valid token amount greater than 0.');
      return;
    }

    try {
      setLoading(true);
      const receipt = await buyTokens();

      if (!receipt || !receipt.transactionHash) {
        throw new Error('Transaction receipt is invalid or missing transactionHash');
      }

      const transactionDetails = {
        from: receipt.from, // Replace with actual address if needed
        to: receipt.to, // Replace with actual contract address if needed
        value: tokensToBuy,
        transactionHash: receipt.transactionHash,
        blockNumber: receipt.blockNumber
      };

      saveTransaction(transactionDetails);
      setError(''); // Clear error message
      alert('Tokens purchased successfully!');
    } catch (error) {
      setError('Error buying tokens: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-2xl mt-10 mx-auto max-w-md transform transition-all duration-300 hover:scale-105">
      <h2 className="text-3xl font-bold text-green-400 mb-6">Buy Tokens</h2>
      <input
        type="number"
        value={tokensToBuy}
        onChange={(e) => setTokensToBuy(e.target.value)}
        className="bg-gray-800 text-white py-3 px-6 rounded-full mb-6 w-full text-center shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        placeholder="Enter amount of tokens"
        min="1"
      />
      <button
        onClick={handleBuyTokens}
        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full w-full text-center shadow-lg transform transition-all duration-300 hover:scale-105"
      >
        {setLoading ? 'Buy Token' : 'Buy Tokens'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default BuyToken;
