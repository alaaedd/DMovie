var movie_publish = artifacts.require("./movie_publish.sol");
module.exports = function(deployer) {
    deployer.deploy(movie_publish);
}