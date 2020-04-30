pragma solidity ^0.6.6;
import "./Pulsation.sol";

contract Pendule {

    string[] public balancier;
    Pulsation contratTic = new Pulsation("tic");
    Pulsation contratTac = new Pulsation("tac");

    function mouvementsBalancier(uint k) public {
        for(uint i; i < k; i++){
            balancier.push(contratTic.ajouterBattement());
            balancier.push(contratTac.ajouterBattement());
        }
    }

    function inspection() public returns (uint) {
        for(uint i; i < balancier.length;i++){
            if(keccak256(abi.encode(balancier[i])) == keccak256("Criii")){
                return i+1;
            }
        }
        return 0;
    }
}
