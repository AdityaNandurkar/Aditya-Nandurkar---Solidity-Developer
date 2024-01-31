import './App.css'
// const App = () => {

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//       const chainId = await window.ethereum.request({ method: 'eth_chainId' });
//       if (chainId != '0x1') {
//         alert("Please connect to Mainnet");
//       } else {
//         let wallet = accounts[0];
//         // setWalletAddress(wallet);
//       }
//     } else {
//       alert("Please install Mask");
//     }
//   }
//   return (
//     <>
//       <div className='App'>
//         <div className='container'>
//           <button className='ConnectWallet' onClick={connectWallet}>Connect Wallet</button>
//           <p>Connect Your Wallet</p>
//           <input type='text' placeholder='Enter recipient address' />
//           <button className='Transfer'>Transfer</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default App;


// WalletConnect.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
// import './WalletConnect.css';

const App = () => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initializeWallet = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        const accounts = await provider.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    };

    initializeWallet();
  }, []);

  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  return (
    // <div className="wallet-connect">
    //   <h1>Wallet Connect Example</h1>
    //   {account ? (
    //     <div>
    //       <p>Connected to: {account}</p>
    //       <button onClick={connectWallet}>Disconnect Wallet</button>
    //     </div>
    //   ) : (
    //     <button onClick={connectWallet}>Connect Wallet</button>
    //   )}
    // </div>

    <>
      <div className='App'>
        <div className='container'>
          <h1>Wallet Connect Example</h1>
          <button className='ConnectWallet' onClick={connectWallet}>Connect Wallet</button>
          <p>Connect Your Wallet</p>
          <input type='text' placeholder='Enter recipient address' />
          <button className='Transfer'>Transfer</button>
        </div>
      </div>
    </>
  );
};

export default App;
