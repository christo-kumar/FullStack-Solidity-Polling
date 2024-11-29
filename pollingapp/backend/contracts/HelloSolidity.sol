// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.27;

contract HelloSolidity {
    string private messageHello;

    constructor() {
        messageHello = "Hello, Solidity!";
    }

    function getMessage() public view returns (string memory) {
        return messageHello;
    }

    function setMessage(string memory _msg) public {
        messageHello = _msg;
    }
}
