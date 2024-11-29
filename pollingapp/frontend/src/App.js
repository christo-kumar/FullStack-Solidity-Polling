import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { connect, getMessage, setMessage } from "./contract";

function App() {
  const [connected, setConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessageState] = useState("");
  const [newMessage, setNewMessage] = useState("");

  // Function to get the current message from the contract
  const fetchMessage = async () => {
    try {
      const msg = await getMessage(); // Assuming getMessage() is defined in contract.js
      setMessageState(msg);
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch message.");
      console.error("Error fetching message:", error);
    }
  };

  // Function to update the message in the contract
  const handleSetMessage = async () => {
    try {
      await setMessage(newMessage); // Assuming setMessage() is defined in contract.js
      setNewMessage(""); // Clear input field
      fetchMessage(); // Refresh the displayed message
    } catch (error) {
      setErrorMessage(error.message || "Failed to update message.");
      console.error("Error setting message:", error);
    }
  };

  // Handle MetaMask connection
  const handleConnect = async () => {
    try {
      await connect(); // Invoke the connect function from contract.js
      setConnected(true); // Update the state to indicate successful connection
      setErrorMessage(""); // Clear any previous error message
      fetchMessage(); // Fetch the message once connected
      console.log("Connected to MetaMask successfully.");
    } catch (error) {
      setConnected(false); // Ensure connected status is false on error
      setErrorMessage(error.message || "Failed to connect to MetaMask.");
      console.error("Error connecting to MetaMask:", error);
    }
  };

  // Fetch the message on component mount
  useEffect(() => {
    if (connected) {
      fetchMessage();
    }
  }, [connected]);

  return (
    <div className="App">
      <div className="container text-center mt-5">
        <h1>Welcome to Hello Solidity App</h1>
        <p>
          {connected
            ? "You are connected to MetaMask!"
            : "Click the button below to connect your MetaMask wallet."}
        </p>
        <button
          className="btn btn-primary"
          onClick={handleConnect}
          disabled={connected}
        >
          {connected ? "Connected" : "Connect to MetaMask"}
        </button>
        {errorMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {errorMessage}
          </div>
        )}

        {connected && (
          <>
            <div className="mt-4">
              <h3>Current Message:</h3>
              <p>{message}</p>
            </div>

            <div className="mt-4">
              <h4>Update Message</h4>
              <input
                type="text"
                className="form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter new message"
              />
              <button
                className="btn btn-success mt-2"
                onClick={handleSetMessage}
              >
                Set Message
              </button>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-info"
                onClick={fetchMessage} // Refresh the message
              >
                Refresh Message
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
