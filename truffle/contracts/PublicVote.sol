pragma solidity ^0.4.24;

contract PublicVote {
    struct Vote {
        address owner;
        uint8 numItems;
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
        require(votes[nameOfVote].owner == msg.sender);
        votes[nameOfVote].candidates[index] = item;
    }

    function vote(bytes30 name, uint8 candidateIndex) public payable {
        votes[name].amount[candidateIndex] = msg.value;
    }

    /*function getCandidatesLength(bytes30 nameOfVote) returns(uint256) public {
      return votes[nameOfVote].candidates.length;
    }*/

    //for testing purposes only
    function getCandidates(bytes30 nameOfVote, uint8 index) public view returns (bytes15) {
      return votes[nameOfVote].candidates[index];
    }
}
