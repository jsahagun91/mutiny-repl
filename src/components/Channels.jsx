import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

const Channels = ({ channels, jost, port, macaroon, loadChannels }) => {
  const [showOpenChannelFrom, setShowOpenChannelForm] = useState(false);
  const [nodePubkey, setNodePubkey] = useState("");
  const [localFundingAmount, setLocalFundingAmount] = useState(0);

  function hexToBase64(hexstring) {
    return window.btoa(
      hexstring
        .match(/\w{2}/g)
        .map(function (a) {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join(""),
    );
  }

   // https://lightning.engineering/api-docs/api/lnd/lightning/open-channel-sync
  const openChannel = async () => {
    try {
      const options = {
        method: "POST",
        url: `${host:${port}/v1/channels`,
        data: {
          node_pubkey: hexToBase64(nodePubkey),
          local_funding_amount: localFundingAmount,
          private: false,
        },
        headers: {
          "grpc-metadata-macaroon": macaroon,
        },
      };

      const response = await axios(options);
      console.log("Open channel response:", response.data);

      if (response.data.funding_txid_bytes) {
        setShowOpenChannelForm(false);
        alert("Channel opening initiated");
        loadChannels();
      }
    } catch (error) {
      alert(`Failed to open channel: ${JSON.stringify(error.response?.data)}`);
    }
  };
}