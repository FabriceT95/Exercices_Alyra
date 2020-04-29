pragma solidity >=0.4.22 <0.7.0;


contract CagnotteFestival{

    using SafeMath for uint256;

    mapping (address => uint) organisateurs;
    address[] numberOrganisateurs;
    mapping (address => bool) festivaliers;
    string[] sponsors;
    uint256 private depensesTotales;
    mapping (uint  => uint256) dailyDepenses;
    uint256 placesRestantes;
    uint seuil;
    uint256 dateLiquidation;


    constructor() public {
        organisateurs[msg.sender] = 100;
        placesRestantes = 50;
        seuil = 50;
        dateLiquidation = now + 2 weeks;
    }

    function transfererOrga(address orga, uint parts) public {
        if(organisateurs[msg.sender]>parts){
            organisateurs[orga] = parts;
            organisateurs[msg.sender].sub(parts);
            numberOrganisateurs.push(orga);
        }
    }

    function estOrga(address orga) public view returns (bool){
        if (organisateurs[orga] != 0) {
            return true;
        }
        return false;
    }

    function acheterTicket() public payable {
        require(msg.value>= 500 finney, "Place à 0.5 Ethers");
        require(placesRestantes > 0 , "Plus de places !");
        festivaliers[msg.sender]=true;
        placesRestantes.sub(1);
    }


    function comptabiliserDepense(uint montant) view private {
        require(controleDepense(montant), "Vous êtes sur le point de dépasser le seuil");
        dailyDepenses[now].add(montant);
        depensesTotales.add(montant);
    }

    function sponsoriser(string memory nom) public payable {
        require(msg.value >= 30 ether, "Nécessite de payer 30 Ether au minimum !");
        sponsors.push(nom);

    }

    function controleDepense(uint montant) internal view returns (bool) {
        if(dailyDepenses[now]!=0 || (dailyDepenses[now]+montant < seuil)){
            return true;
        }
        else{
            return false;
        }
    }

    function retraitOrganisateurs() public {
        require(block.timestamp >= dateLiquidation);
        for (uint i=0; i<numberOrganisateurs.length; i++) {
            if(i == numberOrganisateurs.length-1){
                selfdestruct(address(uint256(numberOrganisateurs[i])));
                delete organisateurs[numberOrganisateurs[i]];
            }
            delete organisateurs[numberOrganisateurs[i]];
        }
    }
}



library SafeMath {
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        require(c / a == b);
        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b > 0);
        uint256 c = a / b;
        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a);
        uint256 c = a - b;

        return c;
    }
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a);

        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0);
        return a % b;
    }
}
