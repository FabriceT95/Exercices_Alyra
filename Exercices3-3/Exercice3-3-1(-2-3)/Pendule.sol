
pragma solidity ^0.6.6;
import "./Pulsation.sol";

contract Pendule {

    string[] public balancier;
    Pulsation contratTac;
    Pulsation contratTic;

    function ajouterTicTac(Pulsation _tic, Pulsation _tac)public{
        contratTic = _tic;
        contratTac = _tac;
    }

    function mouvementsBalancier() public {
        balancier.push(contratTic.ajouterBattement());
        balancier.push(contratTac.ajouterBattement());
    }
}
