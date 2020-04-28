pragma solidity ^0.4.0;

contract Assemblee {

    address[] membres;
    string[] descriptionDecisions;
    uint[] votesPour;
    uint[] votesContre;

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


    function proposerDecision(string memory description) public {
        if(estMembre(msg.sender)){
            descriptionDecisions.push(description);
            votesPour.push(0);
            votesContre.push(0);
        }
    }


    function voter(uint indice, bool value) public {
        if(value){
            votesPour[indice] +=1;
        }else{
            votesContre[indice] += 1;
        }
    }


    function comptabiliser(uint indice) public view returns (int){
        return int(votesPour[indice] - votesContre[indice]);

    }
}
