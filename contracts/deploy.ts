import { ethers } from "hardhat";

async function main() {
  console.log("Deploying BlockchainWordle contract...");

  const BlockchainWordle = await ethers.getContractFactory("BlockchainWordle");
  const contract = await BlockchainWordle.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`BlockchainWordle deployed to: ${address}`);
  
  // Save address for frontend
  console.log("\nAdd this to your .env.local:");
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });