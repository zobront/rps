// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
	mapping (address => uint) public balances;

    event Result(uint indexed result, uint indexed amount, uint indexed newBalance);

    constructor() {
        balances[msg.sender] = 1000;
        balances[0x1f3958B482d1Ff1660CEE66F8341Bdc1329De4e0] = 1000;
    }

    function bet(uint amount, uint selection) public {
        require(selection < 3, "Invalid selection");
        require(amount < balances[msg.sender], "Not enough funds");
        if (selection == 2) {
            balances[msg.sender] += amount;
            emit Result(2, amount, balances[msg.sender]);
        } else if (selection == 1) {
            emit Result(1, amount, balances[msg.sender]);
        } else {
            balances[msg.sender] -= amount;
            emit Result(0, amount, balances[msg.sender]);
        }
    }
}