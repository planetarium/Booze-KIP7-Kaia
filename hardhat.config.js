require('@nomiclabs/hardhat-waffle');
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require('hardhat-contract-sizer');
require('hardhat-docgen');
require('solidity-coverage')
require("dotenv").config({ path: "./.env" })
require('hardhat-abi-exporter');

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

function getPrivateKey(networkName) {
  if (networkName) {
    const privateKey = process.env['PRIVATE_KEY_' + networkName.toUpperCase()];
    if (privateKey && privateKey !== '') {
      return privateKey;
    }
  }

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey || privateKey === '') {
    return 'notsecureprivatekey'
  }

  return privateKey;
}

module.exports = {
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
        details: {
          yul: true
        }
      },
      viaIR : false
    },
  },
  networks: {
    karios: {
      chainId: 1001,
      url: "https://public-en-kairos.node.kaia.io",
        accounts: [getPrivateKey('karios')],
    },
    klaytn: {
      chainId: 8217,
      url: "https://public-en.node.kaia.io",
      accounts: [getPrivateKey('klaytn')],
    },
  },
  etherscan: {
    apiKey: {
      karios: "unnecessary",
      klaytn: "unnecessary",
    },
    customChains: [
      {
        network: "karios",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
      {
        network: "klaytn",
        chainId: 8217,
        urls: {
          apiURL: "https://api-cypress.klaytnscope.com/api",
          browserURL: "https://kaiascope.com",
        },
      },
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  },
  abiExporter: [
    {
      path: './abi/json',
      format: "json",
    },
    {
      path: './abi/minimal',
      format: "minimal",
    },
    {
      path: './abi/fullName',
      format: "fullName",
    },
  ]
};
