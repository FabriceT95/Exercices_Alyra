pragma solidity 0.6.0;

contract PullPayment{
    mapping(address => uint) credits;

    function allowForPull(address receiver, uint amount) private {
        credits[receiver] += amount;
    }

    function pull(uint amount) public {
        require(credits[msg.sender] >= amount);
        require(address(this).balance >= amount);
        credits[msg.sender] -= amount;
        msg.sender.transfer(amount);
    }

    function push() public payable {
        allowForPull(msg.sender,msg.value);
    }
}
