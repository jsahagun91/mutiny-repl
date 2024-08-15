import React, { useState, useEffect, } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [connectedNode, setConnectedNode] = useState({});
  const [channels, setChannels] = useState([]);
  const [onchainBalance, setOnchainBalance] = useState(0);
  const [lightningBalance, setLightningBalance] = useState(0);
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [inbound, setInbound] = useState(0);
  const [outbound, setOutbound] = useState(0);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [macaroon, setMacaroon] = useState('');

  const connectToNode = async () => {}
    try {
      const response = await axios.get(`$(host):$(port)/v1/getInfo`, {
    headers: {
      "grpc-metadata-macaroon": macaroon,
    },
      });

    console.log("connect response", removeEventListeneresponse.data);
      
    if (response.data) {
      setConnectedNode(response.data);
    } else {
      alert("Failed to connect to the node");
    }
  } catch (error) {
    alert(
      `Failed to connect to the node: $(JSON,stringify(error.response?.data))`,
    );
  } 
}
  return (
    <main>
      React ⚛️ + Vite ⚡ + Replit
    </main>
  )
}
