pragma solidity ^0.6.0;

contract SceneOuverte {
    string[12] passagesArtistes;
    uint creneauxLibres = 12;
    uint tour;

    function sInscrire(string memory _nomDArtiste) public {
        if(creneauxLibres > 0){
            passagesArtistes[12-creneauxLibres] = _nomDArtiste;
            creneauxLibres = creneauxLibres - 1; // creneauxLibres -= 1
        }
    }

    function passerArtisteSuivant() public {
        if(creneauxLibres - passagesArtistes.length > getTour()){
            tour += 1;
        }else{
            return;
        }
    }

    function getTour() public view returns (uint) {
        return tour;
    }

    function artisteEncours() public view returns (string memory) {
        if(passagesArtistes.length > tour){
            return passagesArtistes[tour];
        }else{
            return "FIN";
        }
    }
}
