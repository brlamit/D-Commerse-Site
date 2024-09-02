// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    struct Item {
        uint id;
        string name;
        string description;
        uint priceInTokens;
        address payable seller;
        bool sold;
    }

    struct Transaction {
        uint id;
        string transactionType; // e.g., "Item Purchase"
        uint amount;
        uint timestamp;
    }

    struct Order {
        uint itemId;
        uint quantity;
        uint totalPrice;
        uint timestamp;
    }

    uint public itemCount = 0;
    mapping(uint => Item) public items;
    address public owner;
    IERC20 public token;

    // Mapping to store transaction history by wallet address
    mapping(address => Transaction[]) public transactionHistory;

    // Mapping to store orders by wallet address
    mapping(address => Order[]) public orders;

    event ItemCreated(
        uint id,
        string name,
        string description,
        uint priceInTokens,
        address payable seller,
        bool sold
    );

    event ItemPurchased(
        uint id,
        address payable buyer,
        uint priceInTokens
    );

    constructor(address _tokenAddress) {
        owner = msg.sender;
        token = IERC20(_tokenAddress);  // Initialize the token contract
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function createItem(string memory _name, string memory _description, uint _priceInTokens) public onlyOwner {
        require(_priceInTokens > 0, "Price must be greater than zero");

        itemCount++;
        items[itemCount] = Item(itemCount, _name, _description, _priceInTokens, payable(msg.sender), false);

        emit ItemCreated(itemCount, _name, _description, _priceInTokens, payable(msg.sender), false);
    }

    function buyItem(uint _id) public {
        Item storage item = items[_id];

        require(_id > 0 && _id <= itemCount, "Item does not exist");
        require(token.balanceOf(msg.sender) >= item.priceInTokens, "Not enough tokens to purchase this item");
        require(token.allowance(msg.sender, address(this)) >= item.priceInTokens, "Token allowance too low");
        require(!item.sold, "Item already sold");
        require(item.seller != msg.sender, "Seller cannot buy their own item");

        // Transfer tokens from buyer to seller
        require(token.transferFrom(msg.sender, item.seller, item.priceInTokens), "Token transfer failed");

        item.sold = true;

        // Record the transaction for both buyer and seller
        transactionHistory[msg.sender].push(Transaction({
            id: _id,
            transactionType: "Item Purchase",
            amount: item.priceInTokens,
            timestamp: block.timestamp
        }));
        transactionHistory[item.seller].push(Transaction({
            id: _id,
            transactionType: "Item Sale",
            amount: item.priceInTokens,
            timestamp: block.timestamp
        }));

        emit ItemPurchased(_id, payable(msg.sender), item.priceInTokens);
    }

    function saveOrder(address buyer, uint itemId, uint quantity, uint totalPrice) public {
        require(msg.sender == buyer, "Only the buyer can save the order");

        orders[buyer].push(Order({
            itemId: itemId,
            quantity: quantity,
            totalPrice: totalPrice,
            timestamp: block.timestamp
        }));
    }

    function getTransactionHistory(address _wallet) public view returns (Transaction[] memory) {
        return transactionHistory[_wallet];
    }

    function getOrderHistory(address _wallet) public view returns (Order[] memory) {
        return orders[_wallet];
    }
}
