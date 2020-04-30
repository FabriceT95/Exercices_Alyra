import "./ERC20_test.sol";
import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract CrowdSale{

    using SafeMath for uint256;

    address public owner;
    uint256 public savedBalance = 0;
    ERC20 public token;
    uint public rate = 1; // to initialize
    mapping(address => uint256) investisments;
    address[] investismentsAddresses;
    uint dateDebut;
    uint dateFin;
    uint minToCollect;
    uint maxToCollect;
    uint ICO1 = 5;
    uint ICO2 = 10;
    uint ICO3 = 20;
    string descriptionProjet;


    event Contribution(address indexed _contributor, uint256 indexed _value, uint256 _tokens);

    event PayEther(
        address indexed _receiver,
        uint256 indexed _value,
        uint256 indexed _timestamp);

    constructor(uint _time, uint _min, uint _max, string memory _description) public{
        owner = msg.sender;
        dateDebut = now;
        dateFin = now + _time;
        minToCollect = _min;
        maxToCollect = _max;
        descriptionProjet = _description;
        // deploy new instance of ERC20
        token = new ERC20();
    }

    function calculRate() public {
        if(savedBalance > 0 && savedBalance <= ICO1){
            rate = 1;
        }else if(savedBalance > ICO1 && savedBalance <= ICO2){
            rate = 2;
        }else if(savedBalance > ICO2){
            rate = 3;
        }
    }


    // Encaisser l'argent dans la trésorerie
    fallback() payable checkIfMaximumToCollect stillRunning external{
        calculRate();
        investisments[msg.sender] = investisments[msg.sender].add(msg.value);
        investismentsAddresses.push(msg.sender);
        savedBalance = savedBalance.add(msg.value);
        // Il faut transferer l'équivalent en token en se basant sur le rate
        token.transfer(msg.sender, msg.value * rate);
    }

    // Investisseur demande de retirer son fric
    function withdrawPayments() ended notEnoughMoney public {
        address payable payee = msg.sender;
        uint256 payment = investisments[payee];

        require(payment !=0);
        require(address(this).balance >= payment);

        savedBalance = savedBalance.sub(payment);

        investisments[payee] = 0;

        payee.transfer(payment);
    }

    // Vérifie que la date de fin est dépassé, et que la trésorerie est inférieur au min
    modifier ended(){
        require(now > dateFin);
        _;
    }

    modifier stillRunning(){
        require(now < dateFin);
        _;
    }

    modifier checkIfMaximumToCollect(){
        require(savedBalance < maxToCollect);
        _;
    }

    modifier notEnoughMoney(){
        require(minToCollect > savedBalance);
        _;
    }
}
