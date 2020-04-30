pragma solidity ^0.6.6;

contract Pulsation {
    uint battement;
    string private message;

    constructor(string memory _word) public {
        battement = 0;
        message = _word;

    }

    function ajouterBattement() public returns(string memory) {
        battement += 1;
        return message;
    }
}

