import React, { useState, useEffect } from "react";
import {
  createElection,
  addCandidate,
  addVoter,
  getCandidates, // Assuming you have a function to get candidates
} from "../contract"; // Ensure these functions are imported correctly

const AdminPanel = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [showCandidates, setShowCandidates] = useState(false);

  const [voterAddress, setVoterAddress] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState("");
  const [voters, setVoters] = useState([]);
  const [showVoters, setShowVoters] = useState(false);

  // Fetch candidates when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesList = await getCandidates();
        setCandidates(candidatesList);
      } catch (error) {
        console.error(error.message);
        alert("Error fetching candidates.");
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array to run only once when the component mounts

  // Function to handle election creation
  const handleCreateElection = async () => {
    try {
      await createElection(electionName, startDate, endDate);
      alert("Election created successfully!");
    } catch (error) {
      alert(`Error creating election: ${error.message}`);
    }
  };

  // Function to handle adding a candidate
  const handleAddCandidate = async () => {
    try {
      await addCandidate(candidateAddress, candidateName, candidateParty);
      setCandidates((prev) => [
        ...prev,
        {
          address: candidateAddress,
          name: candidateName,
          party: candidateParty,
        },
      ]);
      alert("Candidate added successfully!");
    } catch (error) {
      alert(`Error adding candidate: ${error.message}`);
    }
  };

  // Function to handle adding a voter
  const handleAddVoter = async () => {
    try {
      await addVoter(voterAddress, voterName, voterAge);
      setVoters((prev) => [
        ...prev,
        { address: voterAddress, name: voterName, age: voterAge },
      ]);
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

      {/* Section to manage candidates */}
      <div>
        <h2>Manage Candidates</h2>
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
        <button onClick={() => setShowCandidates((prev) => !prev)}>
          {showCandidates ? "Hide Candidates" : "Show Candidates"}
        </button>
        {showCandidates && (
          <ul>
            {candidates.map((candidate, index) => (
              <li key={index}>
                <strong>Name:</strong> {candidate.name},<strong> Party:</strong>{" "}
                {candidate.party},<strong> Address:</strong> {candidate.address}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Section to manage voters */}
      <div>
        <h2>Manage Voters</h2>
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
        <button onClick={() => setShowVoters((prev) => !prev)}>
          {showVoters ? "Hide Voters" : "Show Voters"}
        </button>
        {showVoters && (
          <ul>
            {voters.map((voter, index) => (
              <li key={index}>
                <strong>Name:</strong> {voter.name},<strong> Age:</strong>{" "}
                {voter.age},<strong> Address:</strong> {voter.address}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
