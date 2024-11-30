import { ethers } from "ethers";

const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_candidateAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_party",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_voterAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "addVoter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "admin",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_endDate",
        type: "uint256",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "election",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "startDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endDate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "started",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "finalized",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "endElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCandidates",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "candidateAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "party",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct SingleElectionVoting.Candidate[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWinner",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "party",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "startElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_candidateAddress",
        type: "address",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const provider = new ethers.BrowserProvider(window.ethereum);

// Function to connect to MetaMask
export const connectMetaMask = async () => {
  try {
    await provider.send("eth_requestAccounts", []);
    console.log("MetaMask connected successfully.");
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
    throw new Error("Failed to connect to MetaMask. Please try again.");
  }
};

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

// Function to get contract instance for reading
export const getContractReadOnly = async () => {
  try {
    const contract = new ethers.Contract(address, abi, provider);
    return contract;
  } catch (error) {
    console.error("Error creating contract instance:", error);
    throw new Error("Could not create contract instance.");
  }
};

// Function to create an election
export const createElection = async (name, startDate, endDate) => {
  try {
    const contract = await getContract();
    const tx = await contract.createElection(
      name,
      Math.floor(new Date(startDate).getTime() / 1000), // Convert to timestamp
      Math.floor(new Date(endDate).getTime() / 1000)
    );
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Election created successfully!");
  } catch (error) {
    console.error("Error creating election:", error.message || error);
    throw new Error("Failed to create election.");
  }
};

// Function to fetch candidates
export const getCandidates = async () => {
  try {
    const contract = await getContractReadOnly();
    const candidates = await contract.getCandidates();
    console.log("Candidates fetched:", candidates);
    return candidates;
  } catch (error) {
    console.error("Error fetching candidates:", error.message || error);
    throw new Error("Failed to fetch candidates.");
  }
};

// Function to vote for a candidate
export const voteForCandidate = async (candidateAddress) => {
  try {
    const contract = await getContract();
    const tx = await contract.vote(candidateAddress);
    console.log("Vote transaction sent:", tx.hash);
    await tx.wait();
    console.log("Vote successfully cast!");
  } catch (error) {
    console.error("Error voting:", error.message || error);
    throw new Error("Failed to cast vote.");
  }
};

// Function to fetch the winner
export const getWinner = async () => {
  try {
    const contract = await getContractReadOnly();
    const winner = await contract.getWinner();
    console.log("Election winner:", winner);
    return winner;
  } catch (error) {
    console.error("Error fetching winner:", error.message || error);
    throw new Error("Failed to fetch winner.");
  }
};
