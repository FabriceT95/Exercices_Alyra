pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol";

contract Credibilite{
    using SafeMath for uint256;

    mapping (address => uint256) public cred;
    bytes32[] private devoirs;

    function addAddresses(address _address) public {
        cred[_address] = 1;
    }

    function produireHash(string memory url) pure public returns(bytes32){
        return keccak256(bytes(url));
    }

    function transfer(address destinataire, uint256 valeur) public {
        require(cred[msg.sender] > valeur);
        require(cred[destinataire] >= 1);
        cred[msg.sender].sub(valeur);
        cred[destinataire].add(valeur);
    }

    function remettre(bytes32 dev) public returns (uint) {
        devoirs.push(dev);
        uint ordre = devoirs.length;
        uint valeur = 10;
        if(ordre < 3) {
            if (ordre == 1) {
                valeur = 30;
            } else {
                valeur = 20;
            }
        }
        cred[msg.sender] = cred[msg.sender].add(valeur);
        return ordre;
    }
}
