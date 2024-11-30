import React, { useState } from "react";
import { createElection } from "../contract";

const AdminPanel = () => {
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateElection = async () => {
    try {
      await createElection(electionName, startDate, endDate);
      alert("Election created successfully!");
    } catch (error) {
      console.error(error.message);
      alert("Error creating election.");
    }
  };
  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="text"
        placeholder="Election Name"
        onChange={(e) => setElectionName(e.target.value)}
      />
      <input
        type="datetime-local"
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleCreateElection}>Create Election</button>
    </div>
  );

  /*return (
    <div>
      <p>Admin Panel</p>
    </div>
  );*/
};

export default AdminPanel;
