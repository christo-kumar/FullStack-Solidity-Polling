import React, { useState, useEffect } from "react";
import {
  createElection,
  addCandidate,
  addVoter,
  getCandidates, // Assuming you have a function to get candidates
  getVoters,
  getElectionName,
} from "../contract"; // Ensure these functions are imported correctly

const AdminPanel = () => {
  const [electionName, setElectionName] = useState("");
  const [addElectionName, setAddElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [candidateAddress, setCandidateAddress] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [candidateParty, setCandidateParty] = useState("");
  const [candidates, setCandidates] = useState([]);

  const [voterAddress, setVoterAddress] = useState("");
  const [voterName, setVoterName] = useState("");
  const [voterAge, setVoterAge] = useState("");
  const [voters, setVoters] = useState([]);

  // Fetch candidates when the component mounts
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesList = await getCandidates();
        if (Array.isArray(candidatesList) && candidatesList.length === 0) {
          //alert("No candidates found.");
        } else {
          setCandidates(candidatesList);
        }
      } catch (error) {
        console.error(error.message);
        alert("Error fetching candidates.");
      }
    };

    const fetchElectionName = async () => {
      try {
        const electionName = await getElectionName();
        if (!electionName || electionName.trim() === "") {
          //alert("Election name is empty.");
        } else {
          setElectionName(electionName);
        }
      } catch (error) {
        console.error(error.message);
        alert("Error Fetching election name.");
      }
    };

    const fetchVoters = async () => {
      try {
        const voters = await getVoters();
        if (Array.isArray(voters) && voters.length === 0) {
          //alert("No candidates found.");
        } else {
          setVoters(voters);
        }
      } catch (error) {
        console.error(error.message);
        alert("Error Fetching voters.");
      }
    };

    fetchCandidates();
    fetchElectionName();
    fetchVoters();
  }, []); // Empty dependency array to run only once when the component mounts

  // Function to handle election creation
  const handleCreateElection = async () => {
    try {
      await createElection(addElectionName, startDate, endDate);
      setElectionName(addElectionName);
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
      setCandidateAddress("");
      setCandidateName("");
      setCandidateParty("");
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
      setVoterAddress("");
      setVoterName("");
      setVoterAge("");
    } catch (error) {
      alert(`Error adding voter: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      {/* Section to create election */}
      <div>
        {electionName ? (
          <h2>Election Name: {electionName}</h2>
        ) : (
          <>
            <h2>Create Election</h2>
            <input
              type="text"
              placeholder="Election Name"
              value={addElectionName}
              onChange={(e) => setAddElectionName(e.target.value)}
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
          </>
        )}
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
        <ul>
          {candidates.length === 0 ? (
            <li>No candidates available.</li>
          ) : (
            candidates.map((candidate, index) => (
              <li key={index}>
                <strong>Name:</strong> {candidate.name},<strong> Party:</strong>{" "}
                {candidate.party}
              </li>
            ))
          )}
        </ul>
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
        <ul>
          {voters.length === 0 ? (
            <li>No voters available.</li>
          ) : (
            voters.map((voter, index) => (
              <li key={index}>
                <strong>Name:</strong> {voter.name}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
