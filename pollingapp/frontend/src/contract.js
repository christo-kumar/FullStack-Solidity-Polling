import { ethers } from "ethers";

const address = "";
const abi = [];

const provider = new ethers.BrowserProvider(window.ethereum);

// Function to get the signer asynchronously
export const getSigner = async () => {
  try {
    const signer = await provider.getSigner();
    console.log("*** Signer fetched successfully: ***", signer);
    return signer;
  } catch (error) {
    console.error("Error fetching signer:", error);
    throw new Error(
      "Could not fetch signer. Please check MetaMask connection."
    );
  }
};

// Function to get the contract instance
export const getContract = async () => {
  try {
    const signer = await getSigner();
    const contract = new ethers.Contract(address, abi, signer);
    return contract;
  } catch (error) {
    console.error("Error creating contract instance:", error);
    throw new Error("Could not create contract instance.");
  }
};

// Function to fetch the current message from the contract
export const getMessage = async () => {
  try {
    // Use the provider directly for calling view functions
    const contract = new ethers.Contract(address, abi, provider);
    const message = await contract.getMessage();
    console.log("Message from contract:", message);
    return message;
  } catch (error) {
    console.error("Error fetching message:", error.message || error);
    throw new Error("Failed to fetch message from the contract.");
  }
};

// Function to update the message in the contract
export const setMessage = async (newMessage) => {
  try {
    if (!newMessage || typeof newMessage !== "string") {
      throw new Error("Invalid message: Please provide a valid string.");
    }

    const contract = await getContract();
    const tx = await contract.setMessage(newMessage);
    console.log("Transaction sent:", tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log("Transaction mined:", receipt.transactionHash);
    console.log("Message updated successfully!");
  } catch (error) {
    console.error("Error setting message:", error.message || error);
    if (error.code) {
      console.error("Error code:", error.code);
      console.error("Error data:", error.data);
    }
    throw new Error("Failed to update the message in the contract.");
  }
};

// Function to connect to MetaMask
export const connect = async () => {
  try {
    await provider.send("eth_requestAccounts", []);
    console.log("MetaMask connected successfully.");
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw new Error("Failed to connect to MetaMask. Please try again.");
  }
};
