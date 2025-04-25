// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract Faucet {
    // Accept any incoming amount
    receive() external payable {}

    // Function to withdraw a limited amount of ether
    function withdraw(uint withdraw_amount) public {
        // Limit withdrawal amount
        require(withdraw_amount <= 0.01 ether, "Withdrawal amount exceeds limit");

        // Send the amount to the address that requested it
        payable(msg.sender).transfer(withdraw_amount);
    }
}
