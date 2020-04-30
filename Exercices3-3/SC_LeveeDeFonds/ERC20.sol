pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract ERC20 {
    using SafeMath for uint;

    address public owner;
    string public name = "ERC20 Token";
    string public symbol = "TOK";
    uint decimals = 18;
    uint private _totalSupply;

    mapping (address => uint) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor() public{
        owner = msg.sender;
        _balances[msg.sender] = _totalSupply;
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "pas le propriétaire");
        _;
    }

    function mint(address account, uint256 amount) onlyOwner public{
        // require(msg.sender == owner);
        _balances[account] = _balances[account].add(amount);
        _totalSupply = _totalSupply.add(amount);
    }

    function totalSupply() public view returns (uint256){
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256){
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) external returns (bool){
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool){
        require(msg.sender != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[msg.sender][spender] = amount.add(_allowances[msg.sender][spender]);

        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function allowance(address spender) external view returns (uint256){
        return _allowances[owner][spender];
    }

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool){
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _allowances[sender][msg.sender] = _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance");
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);

        emit Transfer(sender, recipient, amount);
        return true;
    }

}
