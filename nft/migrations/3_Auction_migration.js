const NFTAuction = artifacts.require("NFTAuction");
const MarketTradingAccessControls = artifacts.require("MarketTradingAccessControls");
const MarketTradingNFT = artifacts.require("MarketTradingNFT");
require('dotenv').config();

module.exports = function (deployer) {
  console.log("Log AccessControl", MarketTradingAccessControls.address);
  console.log("Log NFT", MarketTradingNFT.address);
  deployer.deploy(NFTAuction, MarketTradingAccessControls.address, MarketTradingNFT.address, process.env.RECIPIENT);
};
