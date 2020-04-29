pragma solidity >=0.4.22 <0.7.0;


contract LotoFestival{

    // Adresse qui crée le contrat
    address owner;

    // Réservation par date, pour vérifier que les participants ne jouent qu'une fois par jour
    mapping (address  => uint) dateReservation;

    // Le nombre choisi peut être représenter plusieurs fois (par plusieurs adresses), on définit le nombre choisi en clé, et un tableau d'adresses payable pour les participants
    mapping (uint8 => address payable[]) numberToAddress;

    // Tirage par jour, pour vérifier que l'on fait un tirage unique par jour
    mapping (uint=>bool) tirageEffectuerParJour;

    // Somme totale qui cumule l'ensemble des places
    uint lotSomme;

    // Somme gagnée par chaque participant (lotSomme / allWinners)
    uint256 balanceToDistribute;

    // Tous les participants qui ont gagné
    uint256 allWinners;

    // Le nombre aléatoire
    uint8 winningNumber;


    constructor() public {
        owner = msg.sender;
    }

    // Achat d'un ticket : nombre choisi inférieur à 255, on paie 100 finney,
    // On vérifie que la personne n'a pas participé aujourd'hui, on ajoute la somme au gros lot, on ajoute le ticket à aujourd'hui
    // On ajoute le nombre choisi en clé et l'adresse du participant en valeur
    function acheterTicket(uint8 number) public payable {
        require(number <= 255);
        require(msg.value>= 100 finney, "Place à 0.1 Ethers");
        require(dateReservation[msg.sender]!=now, "Vous avez déjà acheté un ticket aujourd'hui");
        lotSomme += 100 finney;
        dateReservation[msg.sender]=now;
        numberToAddress[number].push(msg.sender);
    }

    // On vérifie qu'il n'y a pas eu de tirage aujourd'hui, on tire un nombre au hasard, on vérifie le(s) gagnant(e)(s)
    // Si il y a des gagnants, on divise le lot en parts égales
    function tirerUnNombre() public {
        require(!tirageEffectuerParJour[now]);
        winningNumber = random();
        allWinners = CheckWinnerNumber(winningNumber);
        require(allWinners > 0);
        balanceToDistribute = lotSomme / ( 2 * allWinners );
    }

    // Fonction de nombre aléatoire de 0 à 255
    function random() private view returns (uint8) {
        return uint8(block.blockhash(block.number-1)%251);
    }


    // On vérifie le nombre de gagnant grâce à la clé, on aura ainsi la longueur du tableau d'adresses correspondant, retourne le nombre de gagnants
    function CheckWinnerNumber(uint8 randomNumber) public view returns (uint256){
        uint256 winnerCount = numberToAddress[randomNumber].length;
        return winnerCount;
    }

    // Les participants peuvent réclamer leur lot
    // Le participant récupère son lot puis est supprimé de la liste
    function getMyMoney() public {
        for(uint i=0; i < allWinners; i++){
            if(msg.sender == numberToAddress[winningNumber][i]){
                numberToAddress[winningNumber][i].transfer(balanceToDistribute);
                delete numberToAddress[winningNumber][i];
            }
        }
    }
}
