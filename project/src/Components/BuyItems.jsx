import React, { useState, useEffect } from "react";
import Loader from './Loader';
import Modal from './Modal';
import s24 from '../assets/mobile/S24.png';
import i15promax from '../assets/mobile/iphone15-pro-max.jpg';
import iwatch from '../assets/Watch/Apple-Watch-SE.jpg';
import adidas from '../assets/Shoes/adidas.png_.webp';
import sonycamera from '../assets/Camera/Sony-FX.3.2.jpg';
import mac from '../assets/laptop/Apple-MacBook-Air-15(M3).jpeg';

const BuyItems = ({ contract, account, addToCart, buyItem, setLoading }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [specifications, setSpecifications] = useState("");
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [buyItemDetails, setBuyItemDetails] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
    quantity: 1,
    totalPrice: 0,
  });

  const items = [
    { id: 1, name: "Apple Watch SE 2022", description: "Smart Apple Watch", image: iwatch, price: 1 },
    { id: 2, name: "Samsung Galaxy S24", description: "Samsung Phone", image: s24, price: 500 },
    { id: 3, name: "iPhone 15 Pro Max", description: "Apple Phone", image: i15promax, price: 450 },
    { id: 4, name: "Adidas ALPHABOUNCE+ Bounce Running Shoes For Men HP6139", description: "ADIDAS Shoes", image: adidas, price: 100 },
    { id: 5, name: "Sony FX3", description: "Sony Camera", image: sonycamera, price: 700 },
    { id: 6, name: "Apple MacBook Air 15 (M3)", description: "Apple Macbook", image: mac, price: 800 },
  ];

  useEffect(() => {
    const fetchTokenBalance = async () => {
      if (contract && account) {
        try {
          const balance = await contract.methods.balanceOf(account).call();
          setUserTokenBalance(balance);
        } catch (error) {
          console.error("Error fetching token balance:", error);
        }
      }
    };

    fetchTokenBalance();
  }, [contract, account]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageClick = (item) => {
    let specs = "";

    switch (item.name) {
      case "Samsung Galaxy S24":
        specs = `Samsung Galaxy S24 Ultra Specifications:
          Body: 233 grams, IP68 rated, Titanium frame, S-pen support
          Display: 6.8-inches Dynamic AMOLED 2X Infinity-O, Gorilla Glass Armor, Adaptive 120Hz refresh rate, Vision Booster, up to 2600 nits (peak)
          Resolution: QHD+ (3088 x 1440 pixels)
          Chipset: Snapdragon 8 Gen 3 for Galaxy (4nm mobile platform)
          Memory: 12GB LPDDR5X RAM, Up to 1TB UFS 4.0 storage
          Software & UI: One UI 6.1 on top of Android 14
          Rear Camera: Quad (with LED flash)
          – 200MP primary lens, OIS, PDAF
          – 12MP ultra-wide-angle lens, 120º FOV
          – 10MP telephoto lens, 3x optical zoom
          – 50MP telephoto lens, 5x optical zoom, 100x digital zoom
          Front Camera: 12MP f/2.2 lens
          Security: Ultrasonic fingerprint sensor
          Battery: 5000mAh with 45W fast charging, 15W wireless charging
          Colors: Black, Violet, Grey (in Nepal)`;
        break;
      case "Apple Watch SE 2022":
        specs = `Apple Watch SE 2022 Specifications:
          Dimensions (H x W x L):
          40mm: 40 x 34 x 10.7mm
          44mm: 44 x 38 x 10.7mm
          Weight:
          40mm: 26.4 gm (GPS), 27.8 gm (GPS + Cellular)
          44mm: 32.9 gm (GPS), 33.0 gm (GPS + Cellular)
          Display: Retina LTPO OLED, Up to 1000 nits brightness, Ion-X glass
          40mm: 1.53″, 324 x 394 pixels
          44mm: 1.78″, 368 x 448 pixels
          Design: Aluminum case, Digital Crown with haptic feedback
          Water Resistance Level: WR50 (Up to 50 meters)
          Sensors: 2nd generation optical heart rate, High-G accelerometer, Gyroscope, Ambient light, Always-on altimeter
          Processor: Apple S8 chip (dual-core), W3 wireless chip
          Storage: 32GB (GPS and GPS + Wireless)
          Built-in GPS: Yes (L1), Glonass, Galileo, QZSS
          Battery: Up to 18 hours
          Charging: USB-C magnetic charging cable`;
        break;
      case "iPhone 15 Pro Max":
        specs = `iPhone 15 Pro Max Specifications:
          Display: 6.7 inches, Super Retina XDR OLED, 120Hz, Dolby Vision, HDR10
          Resolution: 1290 x 2796 pixels
          Chipset: Apple A17 Pro (3nm)
          RAM: 8GB
          Storage: 256GB, 512GB, 1TB
          OS: iOS 17
          Rear Camera: Triple (48MP + 12MP + 12MP) with LiDAR Scanner
          Front Camera: 12MP
          Battery: 4323 mAh with 20W fast charging
          Colors: Space Black, Silver, Gold, Deep Purple`;
        break;
      case "Adidas ALPHABOUNCE+ Bounce Running Shoes For Men HP6139":
        specs = `Specifications of Adidas ALPHABOUNCE+ Bounce Running Shoes For Men HP6139
          Brand : Adidas 
          SKU : 131506275_NP-1038454299`;
        break;
      case "Sony FX3":
        specs = `Sony FX3 Key Features:
          S-Cinetone color matrix
          Active cooling system
          Records up to 4K 120p (10% image crop)
          10.2MP full-frame back-illuminated CMOS Exmor R sensor
          BIONZ XR image processing engine
          ISO expandable up to 409,600
          Fast Hybrid AF, Touch Tracking (real-time tracking), and Real-time Eye AF
          5-axis in-body image stabilization with Active Mode`;
        break;
      case "Apple MacBook Air 15 (M3)":
        specs = `Apple MacBook Air 15 (M3) Specifications:
          Design & Build: All-aluminum unibody build (100% recycled aluminum), 13.40 x 9.35 x 0.45-inches (W x D x H), 1.51 kg
          Color Options: Silver, Starlight, Space Gray, Midnight
          Display: 15.3″ Liquid Retina display (LED), 60Hz refresh rate, Wide Color (P3), 500 nits brightness, True Tone
          Resolution: 2880×1864 resolution, 16:10 aspect ratio, 224 PPI
          Keyboard: Backlit Magic Keyboard
          Trackpad: Force Touch trackpad
          Security: Touch ID (fingerprint sensor)
          Processor: Apple M3 chip (3nm), 8-core CPU (4 performance, 4 efficiency), 8/10-core GPU, 16-core Neural Engine, 100GB/s memory bandwidth
          RAM: 8/16/24GB Unified Memory
          Storage: 256GB to 2TB SSD
          Audio: Six-speaker sound system with Force-canceling woofers
          Battery: 66.5 Watt-hours Li-Po battery
          Power Supply: Up to 70W fast charging support
          35W Dual USB-C Adapter
          70W USB-C Adapter
          Webcam: 1080p FaceTime HD camera
          Connectivity: WiFi 6 (802.11 a/b/g/n/ac), Bluetooth 5.0
          I/O Ports: 2x Thunderbolt 3 / USB-C, MagSafe 3 charging port, 3.5mm headphone jack`;
        break;
      default:
        specs = "Specifications not available.";
    }

    setSpecifications(specs);
    setIsModalOpen(true);
  };

  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setBuyItemDetails((prevDetails) => ({
      ...prevDetails,
      totalPrice: item.price,
    }));
    setBuyModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyItemDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      totalPrice: name === "quantity" ? selectedItem.price * value : prevDetails.totalPrice,
    }));
  };

  const handleConfirmBuy = async () => {
    setLoadingState(true);
  
    try {
      if (contract && account) {
        const selectedItemId = selectedItem.id; // Make sure `selectedItem` has `id`
  
        // Perform the purchase
        await buyItem(selectedItemId, account);

         // Save the order details to the smart contract
      await contract.methods
      .saveOrder(account, selectedItem.name, buyItemDetails.quantity, buyItemDetails.totalPrice)
      .send({ from: account });

  
        // Save transaction details if needed
        const transactionDetails = {
          from: account,
          to: state.saleContract._address,
          transactionHash: "transaction_hash_here", // Replace with actual transaction hash
          blockNumber: "block_number_here", // Replace with actual block number
        };
  
        saveTransaction(transactionDetails);
  
        setCartMessage(`Successfully purchased ${selectedItem.name}!`);
      } else {
        setCartMessage("Contract or account not found.");
      }
    } catch (error) {
      console.error("Error buying item:", error);
      setCartMessage("Failed to purchase item. Please try again.");
    } finally {
      setLoadingState(false);
      setBuyModalOpen(false);
    }
  };
  

  return (
    <section className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 min-h-screen flex flex-col items-center p-8">
      {loadingState && <Loader />}
      {cartMessage && <div className="text-yellow-400 mb-4 text-lg">{cartMessage}</div>}

      <h2 className="text-4xl font-extrabold text-white mb-8">Buy Items</h2>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search items..."
        className="mb-8 px-4 py-2 rounded-md text-black w-full max-w-lg placeholder-gray-500"
      />

      <div className="flex flex-wrap justify-center gap-8">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="flex flex-col items-center bg-gray-900 rounded-lg shadow-lg p-4 w-full max-w-sm"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-60 h-60 mb-4 rounded-lg object-cover cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleImageClick(item)}
            />
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{item.description}</p>
              <p className="text-sm text-green-300 mb-4">{item.price} Token</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => handleBuyClick(item)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                  Buy
                </button>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-yellow-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for item specifications */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Specifications</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{specifications}</pre>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 mt-4"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Modal for entering purchase details */}
      {buyModalOpen && (
        <Modal onClose={() => setBuyModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Enter Purchase Details</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={buyItemDetails.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={buyItemDetails.address}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={buyItemDetails.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Contact:</label>
              <input
                type="text"
                name="contact"
                value={buyItemDetails.contact}
                onChange={handleInputChange}
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={buyItemDetails.quantity}
                onChange={handleInputChange}
                min="1"
                className="w-full p-2 rounded-md border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-bold">Total Price: {buyItemDetails.totalPrice} Tokens</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleConfirmBuy}
                className="bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700"
              >
                Confirm Purchase
              </button>
              <button
                onClick={() => setBuyModalOpen(false)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default BuyItems;
