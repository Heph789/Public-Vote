var PublicVote = artifacts.require('./PublicVote');

module.exports = function(deployer) {
  deployer.deploy(PublicVote);
};
