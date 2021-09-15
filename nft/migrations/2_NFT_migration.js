const MarketTradingNFT = artifacts.require("MarketTradingNFT");
const MarketTradingAccessControls = artifacts.require("MarketTradingAccessControls");
require('dotenv').config();

module.exports = function (deployer) {
  deployer.deploy(MarketTradingNFT, MarketTradingAccessControls.address);
};
