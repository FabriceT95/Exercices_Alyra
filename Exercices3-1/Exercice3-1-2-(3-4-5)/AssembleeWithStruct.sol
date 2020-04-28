pragma solidity ^0.6.0;
contract Assemblee {


    string public nombAssemblee;
    address[] membres;
    address[] administrateurs;

    constructor(string memory _nom) public {
        nombAssemblee = _nom;
        require(administrateurs.length == 0 && membres.length == 0);
        administrateurs.push(msg.sender);
    }


    struct Decision {
        string description;
        uint votesPour;
        uint votesContre;
        mapping (address => bool) aVote;
        bool statut;
    }

    Decision[] decisions;
    Decision decisionSimple;

    function rejoindre() public {
        membres.push(msg.sender);
    }


    function estMembre(address utilisateur) public view returns (bool) {
        for (uint i=0; i<membres.length; i++) {
            if(utilisateur == membres[i]){
                return true;
            }
        }
        return false;
    }

    function estAdmin(address utilisateur) public view returns (bool){
        for (uint i=0; i<administrateurs.length; i++) {
            if(utilisateur == administrateurs[i]){
                return true;
            }
        }
        return false;
    }


    function proposerDecision(string memory description) public {
        if(estMembre(msg.sender)){
            decisionSimple.description = description;
            decisionSimple.votesPour = 0;
            decisionSimple.votesContre = 0;
            decisionSimple.statut = true;
            decisions.push(decisionSimple);
        }
    }


    function voter(uint indice, bool value) public {
        require(!decisions[indice].aVote[msg.sender] && estMembre(msg.sender) && decisions[indice].statut == true);
        if(value){
            decisions[indice].votesPour +=1;
        }else{
            decisions[indice].votesContre +=1;
        }
        decisions[indice].aVote[msg.sender] = true;
    }


    function comptabiliser(uint indice) public view returns (int){
        return int(decisions[indice].votesPour - decisions[indice].votesContre);

    }

    function nommerAdmin(address utilisateur) public{
        require(estAdmin(msg.sender));
        administrateurs.push(utilisateur);
    }

    function demissionerAdmin(address utilisateur) public{
        require(estAdmin(msg.sender));
        for (uint i=0; i<administrateurs.length; i++) {
            if(utilisateur == administrateurs[i]){
                delete administrateurs[i];
            }
        }
    }

    function closeDecision(uint indice) public {
        require(estAdmin(msg.sender) && decisions[indice].statut == true);
        decisions[indice].statut = false;
    }


}
