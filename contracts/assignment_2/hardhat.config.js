require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
const networks = {
  // Other networks configurations...

  uniman: {
    url: "http://134.155.50.125:8506", // Replace with the RPC URL of your network
    chainId: 1337, // Replace with the chain ID of your network
    accounts: ['47ed27e202db3e4f098990c5b1ce6c2ce9e6a72b066ed57001cfd5e23f33b174'] // Replace with the private keys of your accounts
  }
};

module.exports = {
  solidity: "0.8.24",
  networks
};
