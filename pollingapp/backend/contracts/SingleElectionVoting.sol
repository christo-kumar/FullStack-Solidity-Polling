// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.27;

import "hardhat/console.sol";

contract SingleElectionVoting {

    struct Voter {
        address voterAddress;
        string name;
        uint256 age;
        bool hasVoted;
    }

    struct Candidate {
        address candidateAddress;
        string name;
        string party;
        uint256 voteCount;
    }

    struct Election {
        string name;
        uint256 startDate; // Timestamp for voting start
        uint256 endDate; // Timestamp for voting end
        address[] candidateAddresses; // List of candidate addresses
        mapping(address => Voter) voterList; // Map voter addresses to voter data
        mapping(address => Candidate) candidateList; // Map candidate addresses to candidate data
        bool started;
        bool finalized;
    }

    Election public election;

    address public admin;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action.");
        _;
    }

    modifier onlyBefore(uint256 _timestamp) {
        require(block.timestamp < _timestamp, "Action not allowed after this time.");
        _;
    }

    modifier onlyDuring(uint256 _start, uint256 _end) {
        require(block.timestamp >= _start && block.timestamp <= _end, "Action only allowed during the election.");
        _;
    }

    modifier onlyAfter(uint256 _timestamp) {
        require(block.timestamp > _timestamp, "Action only allowed after this time.");
        _;
    }

    constructor() {
        console.log("Owner contract deployed by:", msg.sender);
        admin = msg.sender;
    }

    // Admin functions
    function createElection(string memory _name, uint256 _startDate, uint256 _endDate) 
        external 
        onlyAdmin 
    {
        console.log("Sender trying to create the election:", msg.sender);
        require(bytes(election.name).length == 0, "Election already created.");
        require(_startDate > block.timestamp, "Start date must be in the future.");
        require(_endDate > _startDate, "End date must be after start date.");
        
        election.name = _name;
        election.startDate = _startDate;
        election.endDate = _endDate;
        election.finalized = false;
    }

    function getElectionName() external view returns (string memory) {
        return election.name;
    }
}



