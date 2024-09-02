import React from 'react';

const BuyToken = ({ tokensToBuy, setTokensToBuy, buyTokens, setLoading, saveTransaction }) => {
  const handleBuyTokens = async () => {
    try {
      setLoading(true);
      await buyTokens();
      const transactionDetails = {
        from: "user_address_here", // Replace with actual address
        to: "contract_address_here", // Replace with actual contract address
        value: tokensToBuy,
        transactionHash: "transaction_hash_here", // Replace with actual transaction hash
        blockNumber: "block_number_here", // Replace with actual block number
      };
      saveTransaction(transactionDetails);
    } catch (error) {
      console.error('Error buying tokens:', error);
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
        Buy Tokens
      </button>
    </div>
  );
};

export default BuyToken;
