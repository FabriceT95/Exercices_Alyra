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
        if(random() == 1){
            message = "Criii";
        }
        return message;
    }

    function random() private view returns (uint8) {
        return uint8(block.blockhash(block.number-1)%10);
    }

}
