const MarketTradingAccessControls = artifacts.require("MarketTradingAccessControls");

module.exports = function (deployer) {
  deployer.deploy(MarketTradingAccessControls);
};
