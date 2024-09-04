import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Transactions({ contract, account }) {
  const [transactions, setTransactions] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contract && account) {
      fetchTransactions();
      fetchOrders();
    }
  }, [contract, account]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      // Fetch past TokensPurchased events
      const events = await contract.getPastEvents('TokensPurchased', {
        filter: { buyer: account },
        fromBlock: 0,
        toBlock: 'latest'
      });

      const txs = events.map((event) => {
        try {
          const amount = Web3.utils.fromWei(event.returnValues.amount.toString(), 'ether');
          const ethSpent = Web3.utils.fromWei(event.returnValues.ethSpent.toString(), 'ether');
          const rate = Web3.utils.fromWei(event.returnValues.rate.toString(), 'ether');
          return {
            buyer: event.returnValues.buyer,
            amount: amount.split('.')[0],
            ethSpent: ethSpent.split('.')[0],
            rate: rate.split('.')[0],
            transactionHash: event.transactionHash,
            blockNumber: event.blockNumber,
            timestamp: new Date(parseInt(event.returnValues.timestamp.toString()) * 1000).toLocaleString()
          };
        } catch (error) {
          console.error('Error processing event:', error.message);
          return null;
        }
      }).filter(tx => tx !== null);

      setTransactions(txs);
    } catch (error) {
      console.error('Error fetching transactions:', error.message);
      alert('Error fetching transactions. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const orderData = await contract.methods.getOrderHistory(account).call();

      const formattedOrders = orderData.map(order => ({
        itemId: order.itemId,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        timestamp: new Date(order.timestamp * 1000).toLocaleString(),
        name: order.name,
        userAddress: order.userAddress,
        email: order.email,
        contact: order.contact
      }));

      setOrders(formattedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      alert('Error fetching orders. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">My Transactions</h1>
      {loading ? (
        <div className="flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-lg font-medium">Loading transactions...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section: Token Purchases */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Token Purchases</h2>
            {transactions.length > 0 ? (
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white text-black">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction Hash</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Tokens</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ETH Spent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, index) => (
                      <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.transactionHash}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.ethSpent}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.rate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tx.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-lg font-medium text-gray-600">No token purchase transactions found.</p>
            )}
          </div>

          {/* Right Section: Item Purchases */}
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mb-4">Item Purchases</h2>
            {orders.length > 0 ? (
              <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                <table className="min-w-full bg-white text-black">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Item ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Total Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">User Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Contact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.itemId}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.totalPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.timestamp}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.contact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-lg font-medium text-gray-600">No item purchase orders found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
