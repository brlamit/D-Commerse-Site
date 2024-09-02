import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function Transactions({ contract, account }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (contract && account) {
      fetchTransactions();
    }
  }, [contract, account]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      // Fetch past Transfer events
      const events = await contract.getPastEvents('Transfer', {
        filter: {
          _from: account,
          _to: account
        },
        fromBlock: 0, // or specify the starting block
        toBlock: 'latest'
      });

      const txs = events.map((event) => ({
        from: event.returnValues.from,
        to: event.returnValues.to,
        value: Web3.utils.fromWei(event.returnValues.value, 'ether'), // Convert value to readable format
        transactionHash: event.transactionHash,
        blockNumber: event.blockNumber,
      }));

      setTransactions(txs);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Transactions</h1>
      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-black">
            <thead>
              <tr>
                <th className="px-4 py-2">Transaction Hash</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Value (ETH)</th>
                <th className="px-4 py-2">Block Number</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{tx.transactionHash}</td>
                  <td className="px-4 py-2">{tx.from}</td>
                  <td className="px-4 py-2">{tx.to}</td>
                  <td className="px-4 py-2">{tx.value}</td>
                  <td className="px-4 py-2">{tx.blockNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
}

export default Transactions;
