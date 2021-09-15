import React, { useState, useCallback, useEffect, useContext } from 'react';
import Web3 from 'web3';
import { useMetamask } from "use-metamask";
import { Button } from 'react-bootstrap';

const WalletContainer = () => {
  const { connect, metaState } = useMetamask();

  useEffect(() => {
    console.log(metaState.isConnected);
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(Web3);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [])
  const connectMetamask = async () => {
    if (!metaState.isConnected) {
      (async () => {
        try {
          await connect(Web3);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }

  return (
    <div className="wallet-container">
      <Button
        className="gradient-button"
        disabled={metaState.isConnected}
        onClick={() => connectMetamask() }
      >
        Connect Metamask
      </Button>
    </div>
  );
}

export default WalletContainer;