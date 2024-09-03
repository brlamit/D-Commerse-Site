# D-Commerse Site

## Overview

D-Commerse Site is a decentralized commerce platform built using React and Solidity. It integrates with blockchain technology to provide a secure 
and efficient way to buy and sell items using a custom ERC20 token. The site includes features for managing a wallet, buying tokens, purchasing 
items, managing a cart, and displaying item specifications.

## Features

- **Token Management**: Mint and buy ERC20 tokens.
- **Item Marketplace**: Create, view, and purchase items using tokens.
- **Cart Management**: Add, view, and remove items from the cart.
- **Modal Popups**: View item specifications and purchase items through interactive modals.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Solidity (Ethereum smart contracts)
- **Blockchain**: Ethereum

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/brlamit/D-Commerse-Site.git
    ```
2. **Navigate into the project directory**:
    ```bash
    cd D-Commerse-Site
    ```
3. **Install dependencies**:
    ```bash
    npm install
    ```
4. **Install additional dependencies**:
   ```bash
    npm install ethers web3
    npm install -D tailwindcss postcss autoprefixer
   ```
5. **Initialize Tailwind CSS**:
   ```bash
    npx tailwindcss init
  ```

  **Update the tailwind.config.js file to include paths to your source files**:
   ```
          /** @type {import('tailwindcss').Config} */
          module.exports = {
            content: [
            "./index.html",
              "./src/**/*.{js,ts,jsx,tsx}",
            ],
            theme: {
              extend: {},
            },
            plugins: [],
          } 
    ```
6. **Run the project**:
    ```bash
   npm run dev
    ```

## Usage

1. **Frontend**: 
   - Access the web application through your browser at `http://localhost:3000`.
   - Use the interface to manage your wallet, buy tokens, and interact with the marketplace.

2. **Backend**:
   - Deploy the Solidity contracts to an Ethereum network.
   - Configure the contract addresses and other relevant details in your frontend application.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements for the project.

## License

This project is not licensed. All rights are reserved.

## Contact

For questions or feedback, please contact [your-email@example.com](mailto:baralamit881@gmail.com).

