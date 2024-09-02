// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Combined Token and TokenSale Contract
contract EcommerseToken is ERC20("WALLETTOKEN", "WTK"), Ownable(msg.sender)  {
    uint256 public rate = 1000; // Number of tokens per ETH

    event TokensPurchased(address indexed buyer, uint256 amount);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);
    event RateUpdated(uint256 newRate);

    constructor()  {
        _mint(msg.sender, 100000 * 10 ** 18); // Mint initial supply to contract owner
    }

    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * rate;
        require(balanceOf(owner()) >= tokenAmount, "Not enough tokens in owner's account");

        // Transfer tokens from the owner (initial supply holder) to the buyer
        _transfer(owner(), msg.sender, tokenAmount);

        emit TokensPurchased(msg.sender, tokenAmount);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);

        emit FundsWithdrawn(owner(), balance);
    }

    function withdrawTokens(uint256 _amount) public onlyOwner {
        require(balanceOf(address(this)) >= _amount, "Not enough tokens in contract");
        _transfer(address(this), owner(), _amount);

        emit TokensWithdrawn(owner(), _amount);
    }

    function updateRate(uint256 _newRate) public onlyOwner {
        require(_newRate > 0, "Rate must be greater than zero");
        rate = _newRate;

        emit RateUpdated(_newRate);
    }
}
