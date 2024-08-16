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
};

const connect = async () => {
  await connectToNode();
  setShowConnectForm(false);
  await loadAll();
};

 // https://lightning.engineering/api-docs/api/lnd/lightning/get-info
const getInfo = async function ()  {
  await connectToNode();
};

// https://lightning.engineering/api-docs/api/lnd/lightning/list-channels
const loadChannels = async function () {
  try {
    const options = {
      method: "GET",
      url: `${host}:${port}/v1/channels`,
      headers: {
        "grpc-metadata-macaroon": macaroon,
      },
    };

const response = await axios(options);
    console.log("load channels", response.data);

    if (response.data?.channels.length > 0) {
      setChannels(response.data.channels);

      // Calculate total inbound and outbound liquidity
      let inbound = 0;
      let outbound = 0;
      response.data.channels.forEach((channel) => {
        if (channel.initiator) {
          outbound += parseInt(channel.local_balance, 10);
          inbound += parseInt(channel.remote_balance, 10);
        } else {
          inbound += parseInt(channel.local_balance, 10);
          outbound += parseInt(channel.remote_balance, 10);
        }
      });

      setInbound(inbound);
      setOutbound(outbound);
    }
  } catch (error) {
    alert(`Failed to load channels: ${JSON.stringify(error.response?.data)}`);
  }
};

// https://lightning.engineering/api-docs/api/lnd/lightning/wallet-balance
const loadOnchainBalance = async function () {
  try {
    const options = {
      method: 'GET',
      url: `${host}:{port}/v1/balance/blockchain`,
      headers: {
        "grpc-metadata-macaroon": macaroon,
      },
    };

    const response = await axios(options);

    if(response.data) {
      setOnchainBalance(response.data.total_balance);
    }
  } catch (error) {
    alert(
      `Failed to load onchain balance: ${JSON.stringify(error.response?.data)}`,
    );
  }
};

const loadAll = async function () {
  await getInfo();
  await loadChannels();
  await loadChannelBalances();
  await loadOnchainBalance();
};

  return (
    <main>
      React ⚛️ + Vite ⚡ + Replit
    </main>
  )
}
