import { ethers } from "hardhat";

async function main() {
  console.log("Deploying data_exchange contract...")
  const Contract = await ethers.getContractFactory("data_transaction");
  const contract = await Contract.deploy();

  await contract.deployed();
  //Origin Address: 0x7CC67D0264896eBE0f896c251ca5A1B1Fb5D3eEd
  //First Update Address: 0x297B8FC0FB776FAABcaabD3db60999bED31FbF7c
  //Second Update Address: 0x1B7b4F0Fd746c5e2Ef2e53Fba6F602D4B53f4e74
  console.log("Contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});