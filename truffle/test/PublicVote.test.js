
var throws = require('./helpers/expectThrow.js');

var PublicVote = artifacts.require("PublicVote");

contract('PublicVote', function(accounts) {

  describe('Estabilishing the vote', () => {
    const owner = accounts[0];
    //const name = web3.fromAscii("Hello");
    const name = "Establish vote";
    var vote;
    var proces;

    before(() => {
      var proces = PublicVote.deployed().then(function(pv) {
        vote = pv;
        vote.establishVote(name, 3, {from: owner});
      });
    });

    it('should establish a vote setting owner to the parameter', () => {

      return proces
      .then(function() {
        return vote.votes.call(name);
      })
      .then(function(struct) {
        assert.equal(struct[0], owner, "This is struct: " + struct);
      });

    });

    it('should not allow establishing a vote of the same name', () => {
      return proces.then(() => {
        return throws.expectThrow(vote.establishVote(name, 10, {from: accounts[1]}));
      })
      .then((state)=>{
        assert(state, "Expected error not thrown");
      });

    });

    it('should not allow establishing a vote with more than 19 candidates', () => {
      return proces.then(() => {
        return throws.expectThrow(vote.establishVote("more than 19", 20, {from: accounts[1]}));
      })
      .then((state) => {
        assert(state, "Expected error not thrown");
      });

    });

  });

  describe('Adding candidates to the vote', () => {
    const name = 'a';
    const owner = accounts[0];
    const numOfItems = 3;
    var vote;
    var proces;

    before(() => {
      proces = PublicVote.deployed().then((pv) => {
        vote = pv;
        vote.establishVote(name, numOfItems, {from: owner});
      });
    });

    it('Should add a candidate', () => {
      return proces
      .then(() => {
        const itemName = "item";
        vote.addItem(name, itemName, 0, {from: owner});
        return itemName;
      })
      .then(async (iN) => {
        const candidate = await vote.getCandidates.call(name, 0);
        assert.equal(web3.toUtf8(candidate), iN);
      });
    });

    it("Should not allow anyone but owner to add candidate", () => {
      const notOwner = accounts[1];
      return proces.then(() => {
        return throws.expectThrow(vote.addItem(name, "notOwner", 1, {from: notOwner}));
      })
      .then((state) => {
        assert(state);
      });
    });

  });

  describe('Voting', () => {

  });

});
