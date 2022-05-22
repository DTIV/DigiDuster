// const { ethers } = require("ethers");
const { artifacts } = require("hardhat");
const hre = require("hardhat");

const deploy_rando = false;
const deploy_dust = true;
const deploy_swap = false;

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const tokenWallet = "0x0Fb605F3d716F5C9DdFdE424BFFDD4d583c2c02A";
  const DUST = "0x88e0EbfD03240A5013231a58BfF7427b122d97C7" //DUST FAKE (TEST)

  let Token;

  if(deploy_swap){
    Token = await ethers.getContractFactory("TokenMultiplier");
  }
  if(deploy_dust){
    Token = await ethers.getContractFactory("DigiDust");
  }
  if(deploy_rando){
    Token = await ethers.getContractFactory("RandoToken");
  }
  
  if(deploy_swap){
    const token = await Token.deploy(DUST, tokenWallet);
    await token.deployed();
    console.log("Swap Contract deployed to:", token.address);
    saveFrontendFiles(token);
  }else{
    if(deploy_dust){
      const token = await Token.deploy();
      await token.deployed();
      console.log("DUST Token deployed to:", token.address);
      saveFrontendFiles(token);
    }else if(deploy_rando){
      const token = await Token.deploy();
      await token.deployed();
      console.log("Rando Token deployed to:", token.address);
      saveFrontendFiles(token);
    }
  }
}


function saveFrontendFiles(token){
  const fs = require("fs");
  const contractsDir = __dirname + "/../../contractData";

  if(!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  if(deploy_swap){
    fs.writeFileSync(
      contractsDir + "/swap-address.json",
      JSON.stringify({Token: token.address}, undefined,2)
    );
  }else if(deploy_dust){
    fs.writeFileSync(
      contractsDir + "/dust-address.json",
      JSON.stringify({Token: token.address}, undefined,2)
    );
  }else if(deploy_rando){
    fs.writeFileSync(
      contractsDir + "/rando-address.json",
      JSON.stringify({Token: token.address}, undefined,2)
    );
  }
  
  if(deploy_swap){
    const TokenArtifact = artifacts.readArtifactSync("TokenMultiplier");
    fs.writeFileSync(
      contractsDir + "/Swap.json",
      JSON.stringify(TokenArtifact,null,2)
    );
  }else{
    if(deploy_dust){
      const TokenArtifact = artifacts.readArtifactSync("DigiDust");
      fs.writeFileSync(
        contractsDir + "/DUSTToken.json",
        JSON.stringify(TokenArtifact,null,2)
      );
    }else if(deploy_rando){
      const TokenArtifact = artifacts.readArtifactSync("RandoToken");
      fs.writeFileSync(
        contractsDir + "/RandoToken.json",
        JSON.stringify(TokenArtifact,null,2)
      );
    }
  }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
