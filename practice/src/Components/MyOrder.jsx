import React, { useState, useEffect } from "react";
import Loader from './Loader';

const MyOrders = ({ contract, account, provider }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (walletAccount) => {
    try {
      if (contract && walletAccount) {
        // Fetch the user's orders
        const orderHistory = await contract.methods.getUserOrders(walletAccount).call();
        setOrders(orderHistory);
      } else {
        setOrders([]); // Clear orders if no contract or account
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  useEffect(() => {
    // Fetch orders when the component mounts and the account is set
    if (account && contract) {
      fetchOrders(account);
    } else {
      setLoading(false); // Stop loading if there's no account or contract
    }

    // Handle wallet reconnection
    if (provider) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
          fetchOrders(accounts[0]); // Fetch orders for the newly connected account
        } else {
          setOrders([]); // No account connected, clear the orders
          setLoading(false); // Stop loading if no account is connected
        }
      };

      provider.on("accountsChanged", handleAccountsChanged);

      // Clean up the event listener when the component unmounts
      return () => {
        provider.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [contract, account, provider]);

  return (
    <section className="bg-gray-700 min-h-screen p-6">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-white mb-6">My Orders</h2>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order, index) => (
                <li
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2"
                >
                  <h3 className="text-xl font-semibold text-white">{order.itemName}</h3>
                  <p className="text-sm text-gray-400">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-400">Quantity: {order.quantity}</p>
                  <p className="text-sm text-gray-400">Total Price: {order.totalPrice}</p>
                  <p className="text-sm text-gray-400">Order Date: {new Date(order.date).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">You have no orders yet.</p>
          )}
        </>
      )}
    </section>
  );
};

export default MyOrders;
