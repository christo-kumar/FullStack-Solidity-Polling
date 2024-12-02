import React, { useState } from "react";
import {
  createElection,
  startElection,
  endElection,
  addCandidate,
  addVoter,
} from "../contract";

const AdminPanel = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState("");

  // Function to handle election creation
  const handleCreateElection = async () => {
    try {
      await createElection(electionName, startDate, endDate);
      alert("Election created successfully!");
    } catch (error) {
      alert(`Error creating election: ${error.message}`);
    }
  };

  // Function to handle starting the election
  const handleStartElection = async () => {
    try {
      await startElection();
      alert("Election started successfully!");
    } catch (error) {
      alert(`Error starting election: ${error.message}`);
    }
  };

  // Function to handle ending the election
  const handleEndElection = async () => {
    try {
      await endElection();
      alert("Election ended successfully!");
    } catch (error) {
      alert(`Error ending election: ${error.message}`);
    }
  };

  // Function to handle adding a candidate
  const handleAddCandidate = async () => {
    try {
      await addCandidate(candidateAddress, candidateName, candidateParty);
      alert("Candidate added successfully!");
    } catch (error) {
      alert(`Error adding candidate: ${error.message}`);
    }
  };

  // Function to handle adding a voter
  const handleAddVoter = async () => {
    try {
      await addVoter(voterAddress, voterName, voterAge);
      alert("Voter added successfully!");
    } catch (error) {
      alert(`Error adding voter: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Section to create election */}
      <div>
        <h2>Create Election</h2>
        <input
          type="text"
          placeholder="Election Name"
          value={electionName}
          onChange={(e) => setElectionName(e.target.value)}
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleCreateElection}>Create Election</button>
      </div>

      {/* Section to start and end election */}
      <div>
        <h2>Manage Election</h2>
        <button onClick={handleStartElection}>Start Election</button>
        <button onClick={handleEndElection}>End Election</button>
      </div>

      {/* Section to add candidates */}
      <div>
        <h2>Add Candidate</h2>
        <input
          type="text"
          placeholder="Candidate Address"
          value={candidateAddress}
          onChange={(e) => setCandidateAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Candidate Party"
          value={candidateParty}
          onChange={(e) => setCandidateParty(e.target.value)}
        />
        <button onClick={handleAddCandidate}>Add Candidate</button>
      </div>

      {/* Section to add voters */}
      <div>
        <h2>Add Voter</h2>
        <input
          type="text"
          placeholder="Voter Address"
          value={voterAddress}
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Voter Name"
          value={voterName}
          onChange={(e) => setVoterName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Voter Age"
          value={voterAge}
          onChange={(e) => setVoterAge(e.target.value)}
        />
        <button onClick={handleAddVoter}>Add Voter</button>
      </div>
    </div>
  );
};

export default AdminPanel;
