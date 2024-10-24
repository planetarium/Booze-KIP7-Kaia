# testnet - karios
# mainnet - klaytn

npx hardhat run scripts/deploy_BOOZE.js --network karios
npx hardhat run scripts/deploy_BOOZE.js --network klaytn

# Verify Booze Demo Token Contract
npx hardhat verify --network karios 0xfB09f03965b36df43C5b20B08d3E667AE98Ab823
npx hardhat verify --network klaytn 0xf7283d92779b4d260B318De14bf846F74f5A5A84

