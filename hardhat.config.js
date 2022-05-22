require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const RINKEBY_BOBA_URL = process.env.RINKEBY_BOBA_URL
const PRIVATE_KEY1 = process.env.RINKEBY_BOBA_PK1
const PRIVATE_KEY2 = process.env.RINKEBY_BOBA_PK2

const GANACHE_URL = process.env.GANACHE_URL
const GANACHE_PK1 = process.env.GANACHE_PK1
const GANACHE_PK2 = process.env.GANACHE_PK2

const BOBA_RINK_PK1 = process.env.BOBA_RINK_PK1
const BOBA_RINK_PK2 = process.env.BOBA_RINK_PK2

console.log("HERE",GANACHE_PK1)
module.exports = {
  solidity: "0.6.6",
  networks:{
    rboba : {
      url: RINKEBY_BOBA_URL,
      accounts: [PRIVATE_KEY1]
    },
    rboba2 : {
      url: RINKEBY_BOBA_URL,
      accounts: [PRIVATE_KEY2]
    },
    ganache_boba : {
      url: GANACHE_URL,
      accounts: [GANACHE_PK1]
    },
    ganache_boba2 : {
      url: GANACHE_URL,
      accounts: [GANACHE_PK2]
    },
    ganache_boba_rinkeby : {
      url: GANACHE_URL,
      accounts: [BOBA_RINK_PK1]
    },
    ganache_boba_rinkeby2 : {
      url: GANACHE_URL,
      accounts: [BOBA_RINK_PK2]
    }
  },
  paths: {
    artifacts: "./src/hardhat/artifacts",
    sources: "./src/hardhat/contracts",
    cache: "./src/hardhat/cache",
    tests: "./src/hardhat/test"
  },
};
