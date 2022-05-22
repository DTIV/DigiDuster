# Deploy Locally

**Clone GitHub repo.**

```
https://github.com/DTIV/DigiDuster.git
```

**Install dependencies**

```
npm install
```

**Start Ganache forked Mainnet-Boba**

```
ganache-cli -f https://mainnet.boba.network 
-m "MEMOMNIC PHRASE"
```

**Configure Settings**

Create a .env file from the .sampleenv file provided, Add forked private keys and ganache localhost URL to the .env file

```
GANACHE_URL = "HTTP://127.0.0.1:8545"
GANACHE_PK1 = "PRIVATE KEY 1"
GANACHE_PK2 = "PRIVATE KEY 2"
REACT_APP_FACTORY_ETH = "OOLONGSWAP FACTORY CONTRACT"
REACT_APP_ROUTER_ETH = "OOLONGSWAP ROUTER CONTRACT"
```

**Deploy Contracts**

Deploy all contracts using the deploy.js script file, set the solidity compiler to 0.8.0

First, **deploy the DUST Token contract,**&#x20;

```
const deploy_dust = true;
```

```
npx hardhat run src/hardhat/scripts/deploy.js --network ganache_boba
```

Add the deployed DUST contract address and the main DUST holder wallet address to the deploy.js file

```
const DUST = "DUST CONTRACT ADDRESS" 
const tokenWallet = "TOKEN WALLET ADDRESS";
```

Second, **deploy a random token,**

```
const deploy_rando = true;
const deploy_dust =false;
```

```
npx hardhat run src/hardhat/scripts/deploy.js --network ganache_boba2
```

Third, **deploy the Swap Contract.**

Set the Solidity compiler to 0.6.6, ensure the correct token wallet address and DUST token address are set.

```
const deploy_rando = false;
const deploy_dust =false;
const deploy_swap = true;
```

Set the token owner in the .env file

```
REACT_APP_OWNER_ETH = "CONTRACT OWNER"
```

**Connect and Setup Metamask**

Add the Localhost network to metamask,&#x20;

> Network Name:  Localhost 8545
>
> Network RPC URL: [http://localhost:8545](http://localhost:8545)
>
> Chain ID: 1337
>
> Symbol: ETH

Then, Import the accounts, with the private keys provided in the .env file

And import the deployed tokens each for each account.&#x20;

**Start Localhost**

Start the frontend.

```
npm start
```
