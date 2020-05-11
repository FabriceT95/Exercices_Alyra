pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//import "./SafeMath.sol";

contract PlaceDeMarche {

    // using SafeMath for uint;

    // Récupération de la réputation d'un illustrateur depuis son adresse
    mapping(address => uint) public userToReputation;

    // Récupératiion du nom d'un illustrateur depuis son adresse
    mapping(address => string) public userToName;

    // Voir si l'illustrateur est inscrit
    mapping(address => bool) public users;

    // Voir si l'illustrateur est blacklisté
    mapping(address => bool) public blackList;

    // adresse du propriétaire
    address public owner;

    // Adresse du porte monnaie ciblé
    address payable public wallet;

    // Liste des entreprises inscrites
    address[] public companies;

    // Liste des administrateurs
    address[] public admins;

    // Status de la demande
    enum Status {OUVERTE, ENCOURS, FERMEE}

    // Structure de demande à créer lors de l'ajout d'une demande
    struct Demande {
        uint id;
        string nomOffre;
        address addressCompany;
        uint remuneration;
        uint depot;
        uint delay;
        string description;
        Status status;
        uint minReputation;
        address[] candidates;
        address illustrateurChoisi;
        bytes32 travail;
    }

    // Liste des demandes
    Demande[] public demandes;


    // Initialisation du contrat avec l'ajout de l'owner dans la liste des admins
    constructor() public{
        owner = msg.sender;
        admins.push(owner);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // MODIFIERS ////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    modifier checkReputation(uint _idDemande){
        require(demandes[_idDemande].minReputation <= userToReputation[msg.sender]);
        _;
    }

    modifier checkIfOpen(uint _idDemande) {
        require(demandes[_idDemande].status == Status.OUVERTE, "BAH CEST TROP TARD !");
        _;
    }

    modifier checkIfIllustrateurInCandidates(uint _idDemande, address _illustrateur){
        require(isInCandidates(_idDemande, _illustrateur));
        _;
    }

    modifier checkDelay(uint _idDemande){
        require(demandes[_idDemande].delay > now, "Toujours dans les temps");
        _;
    }

    modifier checkIllustrateurChoisi(uint _idDemande){
        require(demandes[_idDemande].illustrateurChoisi == msg.sender);
        _;
    }

    modifier pasEncorePostule(uint _idDemande){
        require(!aDejaPostule(_idDemande, msg.sender), "Il a déjà postulé !");
        _;
    }

    modifier pasInscrit(){
        require(users[msg.sender] != true, "Cet utilisateur est déjà inscrit !");
        _;
    }

    modifier companyPasInscrit(){
        require(!isCompanyInscrit(msg.sender), "Votre entreprise est déjà inscrite !");
        _;
    }

    modifier companyInscrit(){
        require(isCompanyInscrit(msg.sender), "Votre entreprise n'est pas inscrite !");
        _;
    }

    modifier bannable(address _illustrateur){
        require(users[_illustrateur] == true, "Vous ne pouvez pas ban un type pas inscrit !");
        _;
    }

    modifier onlyAdmin(){
        require(isAdmin(msg.sender), "Vous n'êtes pas le propriétaire");
        _;
    }

    modifier notBanned(){
        require(blackList[msg.sender] != true);
        _;
    }

    modifier onlyCompany(uint _idDemande){
        require(idDemandeToCompany(_idDemande));
        _;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // BOOLEAN RETURN FUNCTIONS FOR MODIFIERS ///////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////

    // Check si admin
    function isAdmin(address user) public view returns (bool) {
        for (uint i = 0; i < admins.length; i++) {
            if (user == admins[i]) {
                return true;
            }
        }
        return false;
    }

    // Check si entreprise est inscrite
    function isCompanyInscrit(address company) public view returns (bool) {
        for (uint i = 0; i < companies.length; i++) {
            if (company == companies[i]) {
                return true;
            }
        }
        return false;
    }

    // Check si l'adresse de l'entreprise correspond à l'adresse du sender
    function idDemandeToCompany(uint _idDemande) public view returns (bool) {
        for (uint i = 0; i < demandes.length; i++) {
            if (msg.sender == demandes[_idDemande].addressCompany) {
                return true;
            }
        }
        return false;
    }


    // Check si illustrateur est candidat
    function isInCandidates(uint _idDemande, address _illustrateur) public view returns (bool) {
        for (uint i = 0; i < demandes[_idDemande].candidates.length; i++) {
            if (_illustrateur == demandes[_idDemande].candidates[i]) {
                return true;
            }
        }
        return false;
    }

    // Check si illustrateur est parmi les candidats de la demande (pour la fonction postuler())
    function aDejaPostule(uint _idDemande, address _illustrateur) public view returns (bool) {
        for (uint i = 0; i < demandes[_idDemande].candidates.length; i++) {
            if (_illustrateur == demandes[_idDemande].candidates[i]) {
                return true;
            }
        }
        return false;
    }

    // Retourne le nombre d'admins
    function getAdminLength() public view returns (uint){
        return admins.length;
    }

    // Retourne le nombre d'entreprises
    function getCompaniesLength() public view returns (uint) {
        return companies.length;
    }

    // Retourne une demande en particulier
    function getDemande(uint _id) public view returns (Demande memory) {
        return demandes[_id];
    }

    // Retourne toutes les demandes
    function getAllDemandes() public view returns (Demande[] memory){
        return demandes;
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////


    // Ajout d'un admin par un admin
    function addAdmin(address newAdmin) onlyAdmin public {
        admins.push(newAdmin);
    }

    // Inscription d'un illustrateur si il n'est pas déjà inscrit + il ne figure pas dans la liste des bannis
    function inscription(string memory _name) pasInscrit notBanned public {
        userToReputation[msg.sender] = 1;
        userToName[msg.sender] = _name;
        users[msg.sender] = true;
    }

    // inscription de l'entreprise en vérifiant que l'entreprise ne l'est pas déjà
    function inscriptionCompany() companyPasInscrit public {
        companies.push(msg.sender);
    }

    // Ajout d'une demande en vérifiant que l'entreprise est inscrite
    function ajouterDemande(uint _remuneration, uint _delay, string memory _description, uint _minReputation, string memory _nomOffre) companyInscrit payable public {
        Demande memory demande;
        demande.nomOffre = _nomOffre;
        demande.addressCompany = msg.sender;
        demande.remuneration = _remuneration;
        demande.depot = msg.value;
        demande.delay = now + _delay;
        demande.description = _description;
        demande.status = Status.OUVERTE;
        demande.minReputation = _minReputation;
        demande.id = demandes.length - 1;
        demandes.push(demande);

    }

    // Illustrateur qui postule en insérant l'id de la demande, en vérifiant si il n'a pas postulé + si le status de la demande est OUVERTE + si réputation correspond
    function postuler(uint _idDemande) pasEncorePostule(_idDemande) checkIfOpen(_idDemande) checkReputation(_idDemande) public {
        demandes[_idDemande].candidates.push(msg.sender);
    }

    // Entreprise accepte l'offre, en vérifiant si l'id de la demande correspond à l'entreprise, si la demande est OUVERTE et si l'illustrateur est dans les candidats
    function accepterOffre(uint _idDemande, address _illustrateur) onlyCompany(_idDemande) checkIfOpen(_idDemande) checkIfIllustrateurInCandidates(_idDemande, _illustrateur) public {
        demandes[_idDemande].illustrateurChoisi = _illustrateur;
        demandes[_idDemande].status = Status.ENCOURS;
        delete demandes[_idDemande].candidates;

    }

    // Illustrateur donne l'id de la demande ainsi que l'adresse de son travail en vérifiant si l'illustrateur choisi est bien celui de la demande en question
    function livraison(uint _idDemande, string memory _travail) public checkIllustrateurChoisi(_idDemande) {
        demandes[_idDemande].travail = keccak256(bytes(_travail));
        demandes[_idDemande].status = Status.FERMEE;
        userToReputation[msg.sender] += 1;
        msg.sender.transfer(demandes[_idDemande].remuneration);
    }

    // Retard de la demande en vérifiant que le délais est supérieur à la date du jour
    function retard(uint _idDemande) public checkDelay(_idDemande) {
        userToReputation[demandes[_idDemande].illustrateurChoisi] -= 1;
    }

    // Ban d'un illustrateur en vérifiant si c'est l'admin qui fait la requête + si l'illustrateur existe
    function banned(address _illustrateur) onlyAdmin bannable(_illustrateur) public {
        blackList[_illustrateur] = true;
        userToReputation[_illustrateur] = 0;
    }
}
