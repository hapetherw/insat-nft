import MarketTradingNFT from "./MarketTradingNFT.json";
import NFTAuction from "./NFTAuction.json";

const config = {
  marketTradingNFTAddress: process.env.NFT_ADDRESS,
  marketTradingNFTABI: MarketTradingNFT.abi,
  marketAuctionAddress: process.env.AUCTION_ADDRESS,
  marketAuctionABI: NFTAuction.abi, 
  marketPlaceAddress: "0x5445a220f7BE7EEEeEEBfc62a79E1E9954324166",
  marketPlaceABI: [
    {
      inputs: [
        {
          internalType: "contract MarketTradingAccessControls",
          name: "_accessControls",
          type: "address",
        },
        {
          internalType: "contract IMarketTradingNFT",
          name: "_MarketTradingNFT",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "_platformFeeRecipient",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [],
      name: "NFTMarketplaceContractDeployed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "OfferCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "OfferCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "primarySalePrice",
          type: "uint256",
        },
      ],
      name: "OfferPurchased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "bool",
          name: "isPaused",
          type: "bool",
        },
      ],
      name: "PauseToggled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "accessControls",
          type: "address",
        },
      ],
      name: "UpdateAccessControls",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "creatorFee",
          type: "uint256",
        },
      ],
      name: "UpdateMarketplaceCreatorFee",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "platformFee",
          type: "uint256",
        },
      ],
      name: "UpdateMarketplacePlatformFee",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "primarySalePrice",
          type: "uint256",
        },
      ],
      name: "UpdateOfferPrimarySalePrice",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address payable",
          name: "platformFeeRecipient",
          type: "address",
        },
      ],
      name: "UpdatePlatformFeeRecipient",
      type: "event",
    },
    {
      inputs: [],
      name: "MarketTradingNFT",
      outputs: [
        {
          internalType: "contract IMarketTradingNFT",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "accessControls",
      outputs: [
        {
          internalType: "contract MarketTradingAccessControls",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "cancelOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "confirmOffer",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "_primarySalePrice", type: "uint256" },
        { internalType: "uint256", name: "_startTimestamp", type: "uint256" },
        { internalType: "uint256", name: "_endTimestamp", type: "uint256" },
      ],
      name: "createOffer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "creatorFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_tokenId", type: "uint256" }],
      name: "getOffer",
      outputs: [
        { internalType: "uint256", name: "_primarySalePrice", type: "uint256" },
        { internalType: "uint256", name: "_startTime", type: "uint256" },
        { internalType: "uint256", name: "_endTime", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "isPaused",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "offers",
      outputs: [
        { internalType: "uint256", name: "primarySalePrice", type: "uint256" },
        { internalType: "uint256", name: "startTime", type: "uint256" },
        { internalType: "uint256", name: "endTime", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "platformFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "platformFeeRecipient",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "reclaimETH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "toggleIsPaused",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "contract MarketTradingAccessControls",
          name: "_accessControls",
          type: "address",
        },
      ],
      name: "updateAccessControls",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_creatorFee", type: "uint256" },
      ],
      name: "updateMarketplaceCreatorFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_platformFee", type: "uint256" },
      ],
      name: "updateMarketplacePlatformFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_tokenId", type: "uint256" },
        { internalType: "uint256", name: "_primarySalePrice", type: "uint256" },
      ],
      name: "updateOfferPrimarySalePrice",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address payable",
          name: "_platformFeeRecipient",
          type: "address",
        },
      ],
      name: "updatePlatformFeeRecipient",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ],
};

export default config;
