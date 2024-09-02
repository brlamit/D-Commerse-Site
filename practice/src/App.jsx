// App.js

import React, { useReducer, useEffect } from 'react';
import Web3 from 'web3';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Footer from './Components/Footer';
import BuyToken from './Components/BuyToken';
import BuyItems from './Components/BuyItems';
import Cart from './Components/Cart';
import MyOrder from './Components/MyOrder';
import Transactions from './Components/Transactions'; // Ensure the correct import path
import About from './Components/About';
import Help from './Components/Help';
import Loader from './Components/Loader';
import ABI from './Constants/Token-ABI.json';
import saleABI from './Constants/Sale-ABI.json'; // Ensure correct path

const contractAddress = '0x4f17a9f92a79414650192385F5E4e717F38B3b27';
const saleAddress = '0x7E376e6424bf3A6DF489bb386e5c705Ec011ce08';
const tokenPriceInEth = '0.0000000001';

const initialState = {
  account: '',
  balance: '',
  tokenContract: null,       // Renamed for clarity
  saleContract: null,        // New state for sale contract
  tokenBalance: 0,
  tokensToBuy: 0,
  cartItems: [],
  orders: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_BALANCE':
      return { ...state, balance: action.payload };
    case 'SET_TOKEN_CONTRACT':
      return { ...state, tokenContract: action.payload };
    case 'SET_SALE_CONTRACT':
      return { ...state, saleContract: action.payload };
    case 'SET_TOKEN_BALANCE':
      return { ...state, tokenBalance: action.payload };
    case 'SET_TOKENS_TO_BUY':
      return { ...state, tokensToBuy: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case 'REMOVE_FROM_CART':
      return { ...state, cartItems: state.cartItems.filter(item => item.id !== action.payload) };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const connectWallet = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        dispatch({ type: 'SET_ACCOUNT', payload: accounts[0] });
        await getBalance(accounts[0]);
        const web3 = new Web3(window.ethereum);
        
        // Initialize Token Contract
        const tokenContractInstance = new web3.eth.Contract(ABI, contractAddress);
        dispatch({ type: 'SET_TOKEN_CONTRACT', payload: tokenContractInstance });
        await getTokenBalance(tokenContractInstance, accounts[0]);
        
        // Initialize Sale Contract
        const saleContractInstance = new web3.eth.Contract(saleABI, saleAddress);
        dispatch({ type: 'SET_SALE_CONTRACT', payload: saleContractInstance });
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log('MetaMask is not installed');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getBalance = async (account) => {
    if (window.ethereum && account) {
      try {
        const web3 = new Web3(window.ethereum);
        const balance = await web3.eth.getBalance(account);
        dispatch({ type: 'SET_BALANCE', payload: web3.utils.fromWei(balance, 'ether') });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const buyTokens = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    if (state.tokenContract && state.account) {
      try {
        const valueInWei = Web3.utils.toWei(
          (BigInt(state.tokensToBuy) * BigInt(Web3.utils.toWei(tokenPriceInEth.toString(), 'ether'))).toString(),
          'wei'
        );
        await state.tokenContract.methods.buyTokens().send({
          from: state.account,
          value: valueInWei,
        });
        await getTokenBalance(state.tokenContract, state.account);
      } catch (error) {
        if (error.message.includes('User denied transaction signature')) {
          alert('Transaction rejected by user.');
        } else {
          console.error('Error buying tokens:', error);
          alert(`Failed to buy tokens: ${error.message}`);
        }
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } else {
      console.log('Contract or account not available');
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };
  const buyItem = async (itemId, account) => {
    if (state.saleContract && account) {
      try {
        await state.saleContract.methods.buyItem(itemId).send({
          from: account,
        });
  
        // Update token balance after purchase if necessary
        await getTokenBalance(state.tokenContract, account);
      } catch (error) {
        console.error("Error buying item:", error);
        alert(`Failed to buy item: ${error.message}`);
      }
    } else {
      console.log("Sale contract or account not available");
    }
  };
  
  

  const getTokenBalance = async (contract, account) => {
    if (contract && account) {
      try {
        const balance = await contract.methods.balanceOf(account).call();
        console.log("Updated Token Balance: ", balance);
        dispatch({ type: 'SET_TOKEN_BALANCE', payload: balance });
      } catch (error) {
        console.error('Error fetching token balance:', error);
      }
    }
  };

  const disconnectWallet = () => {
    dispatch({ type: 'SET_ACCOUNT', payload: '' });
    dispatch({ type: 'SET_BALANCE', payload: '' });
    dispatch({ type: 'SET_TOKEN_CONTRACT', payload: null });
    dispatch({ type: 'SET_SALE_CONTRACT', payload: null });
    dispatch({ type: 'SET_TOKEN_BALANCE', payload: 0 });
  };

  useEffect(() => {
    if (state.account && state.tokenContract) {
      getBalance(state.account);
      getTokenBalance(state.tokenContract, state.account);
    }
  }, [state.account, state.tokenContract]);

  const addToCart = (item) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'ADD_TO_CART', payload: item });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-700 text-white flex flex-col justify-between">
        <Header
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
          account={state.account}
          balance={state.balance}
          tokenBalance={state.tokenBalance}
        />
        <div className="max-w-9xl mx-auto px-4 py-6">
          {state.loading && <Loader />}
          <Routes>
            <Route path="/" element={<Home contract={state.tokenContract} account={state.account} />} />
            <Route
              path="/buy-token"
              element={
                <BuyToken
                  tokensToBuy={state.tokensToBuy}
                  setTokensToBuy={(value) => dispatch({ type: 'SET_TOKENS_TO_BUY', payload: value })}
                  buyTokens={buyTokens}
                  setLoading={(value) => dispatch({ type: 'SET_LOADING', payload: value })}
                />
              }
            />
           <Route
                path="/buy-items"
                element={
                  <BuyItems
                    contract={state.tokenContract}
                    saleContract={state.saleContract}  // Pass saleContract here
                    account={state.account}
                    addToCart={addToCart}
                    buyItem={buyItem}
                    setLoading={(value) => dispatch({ type: 'SET_LOADING', payload: value })}
                  />
                }
              />

            <Route
              path="/cart"
              element={
                <Cart 
                  cartItems={state.cartItems} 
                  removeFromCart={removeFromCart} 
                />
              }
            />
            <Route path="/my-order" element={<MyOrder orders={state.orders} />} />
            <Route
              path="/transactions"
              element={
                <Transactions
                  account={state.account}
                  // Add other necessary props if needed
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
