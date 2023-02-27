import React from "react";
import "./Headerstyle.css";
import bakerySwap from "../img/bakery_swap.svg";
import logo from "../img/logo_white.b1858a79.svg";
import { FaBars, FaCog } from "react-icons/fa";
import { Connectwallet } from "./Connectwallet";
import { color } from "../utils/style";
import image from "../assets/img/img";

export const Header = ({ wallet, connect, connecting }) => {
  return (
    <div
      className="flex flex-row justify-between w-full"
      style={{ backgroundColor: color.black }}
    >
      <div className="flex flex-row">
        <div className="flex flex-row gap-4 h-14 pt-4">
          <div style={{ paddingLeft: 10 }}>
            <img alt="nav logo" src={image.logoD} width={130} height={25} />
          </div>
          <div style={{ color: color.colors_textSubtle }}>Trade</div>
          <div style={{ color: color.colors_textSubtle }}>Earn</div>
          <div className="text-white">Win</div>
          <div className="text-white">NFT</div>
        </div>
      </div>
      <div className="flex flex-row">
        <img
          src={image.nav}
          className="lg:block md:block hidden cursor-pointer h-10 mt-3 "
          width={400}
          alt="nav"
        />
        <Connectwallet
          connect={connect}
          connecting={connecting}
          wallet={wallet}
        />
      </div>
    </div>
  );
};
