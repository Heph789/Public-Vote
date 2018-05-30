
var throws = require('./helpers/expectThrow.js');

var PublicVote = artifacts.require("PublicVote");

contract('PublicVote', function(accounts) {
  describe('Estabilishing the vote', () => {
    var owner = accounts[0];
    const name = [...Buffer.from("Hillary v Donald", "ascii")];

    it('should establish a vote setting owner to the parameter', () => {
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

    it('should not allow establishing a vote of the same name', () => {
      var vote;
      return PublicVote.deployed().then((pv) => {
        vote = pv;
        return throws.expectThrow(vote.establishVote(name, 10, {from: accounts[1]}));
      })
      .then((state)=>{
        assert(state, "Expected error not thrown");
      });

    });

    it('should not allow establishing a vote with more than 19 candidates', () => {
      var vote;
      return PublicVote.deployed().then((pv) => {
        vote = pv;
        return throws.expectThrow(vote.establishVote([0], 20, {from: accounts[1]}));
      })
      .then((state) => {
        assert(state, "Expected error not thrown");
      });

    });

  });

});
