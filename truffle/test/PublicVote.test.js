var PublicVote = artifacts.require("PublicVote");

contract('PublicVote', function(accounts) {
  describe('Estabilishing the vote', () => {
    var owner = accounts[0];
    it('should establish a vote setting owner to the parameter', () => {
      const name = [...Buffer.from("Hillary v Donald", "ascii")];
      const numOfItems = 10;
      var vote;

      return PublicVote.deployed().then(function(pv) {
        vote = pv;
        vote.establishVote(name, numOfItems, {from: owner});
      })
      .then(function() {
        return vote.votes.call(name);
      })
      .then(function(struct) {
        assert.equal(struct, owner, "This is struct: " + struct);
      });

    });
  });
});
