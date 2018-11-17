var movie_publish = artifact.require("./movie_publish.sol");
module.exports = function(deployer) {
    deployer.deploy(movie_publish);
}