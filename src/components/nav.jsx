import React from "react";

import image from "../assets/img/img";
import { color } from "../utils/style";

const Nav = ({
  initWallet,
  wallet,
}) => {
  return (
    <React.Fragment>
      <div
        className="flex flex-row justify-between"
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
            alt='nav'
          />
          <div className="flex gap-8 pl-7 pr-7 mt-2 pb-5">
            <button
              onClick={initWallet}
              className="p-3 rounded-2xl font-semibold text-white"
              style={{ backgroundColor: color.btnColor }}
            >
              {wallet ? "Connected" : "Connect wallet"}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Nav;
