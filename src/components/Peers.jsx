import React, { useState, useEffect } from "react";
import axios from "axios";

function Peers({ host, port, macaroon }) {
  const [showAddPeerForm, setShowAddPeerForm] = useState(false);
  const [peerPubkey, setPeerPubkey] = useState("");
  const [peerHost, setPeerHost] = useState([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    loadPeers();
  }, []);

  const loadPeers = async () => {
    try {
      const options = {
        method: "GET",
        url: `${host}:${port}/v1/peers`,
        headers: {
          "grpc-metadata-macaroon": macaroon,
        },
      };

      const response = await axios(options);
      console.log("Load peers response:", response.data);

      if (response.data?.peers) {
        setPeers(response.data.peers);
      }
    } catch (error) {
      alert("Failed to load peers: ${JSON.stringify(error.response?.data)}");
    }
  };

  const addPeer = async () => {
    try {
      const options = {
        method: "POST",
        url: `${host}:${port}/v1/peers`,
        data: {
          addr: {
          pubkey: peerPubkey,
          host: peerHost,
        },
        perm: true,
      },
        headers: {
          "grpc-metadata-macaroon": macaroon,
        },
    };

    const response = await axios(options);
    console.log("Add peer response:", response.data);

    alert("Peer added successfully.");
    setShowAddPeerForm(false);
    loadPeers();
  } catch (error) {
    alert(`Failed to add peer: ${JSON.stringify(error.response?.data)}`); 
  }
};

return (
  <div className="peers">
    <h2>Peers</h2>
    <button onClick={() => setShowAddPeerForm(!showAddPeerForm)}>
      Add Peer
    </button>
  </div>
)