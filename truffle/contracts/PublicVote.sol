pragma solidity ^0.4.24;

contract PublicVote {
    struct Vote {
        address owner;
        bytes15[] candidates;
        mapping(uint8 => uint256) amount;
    }

    //storage of items for each vote
    mapping(bytes30 => Vote) public votes;

    //@dev Creates a new vote
    //@param name The name of the vote
    function establishVote(bytes30 name, uint8 numItems) public {
        require(votes[name].owner == address(0));
        require(numItems < 20);
        votes[name].owner = msg.sender;
        votes[name].candidates.length = numItems;
    }

    function addItem(bytes30 nameOfVote, bytes15 item, uint8 index) public {
        require(index < votes[nameOfVote].candidates.length);
        require(votes[nameOfVote].owner == msg.sender);
        votes[nameOfVote].candidates[index] = item;
    }

    function vote(bytes30 name, uint8 candidateIndex) public payable {
        votes[name].amount[candidateIndex] = msg.value;
    }
}
