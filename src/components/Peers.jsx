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

  
}
