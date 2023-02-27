import React from 'react';
import './Sidebarstyle.css';
import Home from '../img/home.svg';
import Trade from '../img/trade.svg';
import Earning from '../img/earning_select.svg';
import NFT from '../img/nft.svg';
import Gallery from '../img/gallery.svg';
import Launchpad from '../img/launchpad.svg';
import Game from '../img/game.svg';
import Info from '../img/info.svg';
import Contact from '../img/contact.svg';

export const Sidebar = () => {
  return (
        <div className='sidebar'>
            <nav className='navbar'>
                <a href='#' className='home-link link-icon'>
                    <img src={Home} alt="Home" className='img-link' style={{height : "24px"}}/>
                </a>

                <div className='trade-link link-icon'>
                    <img src={Trade} alt="Trade" className='img-link' style={{height : "24px"}}/>
                </div>

                <a  href='#' className='earning-link link-icon' aria-current="page">
                    <img src={Earning} alt="Earning" className='img-link' style={{height : "24px"}}/>
                </a>

                <div className='nft-link link-icon'>
                    <img src={NFT} alt="NFT" className='img-link' style={{height : "24px"}}/>
                </div>

                <div className='gallery-link link-icon'>
                    <img src={Gallery} alt='Gallery' className='img-link' style={{height : "24px"}}/>
                </div>

                <a href='#' className='launchpad-link link-icon'>
                    <img src={Launchpad} alt='Launchpad' className='img-link' style={{height : "24px"}}/>
                </a>

                <a href='#' className='game-link link-icon'>
                    <img src={Game} alt='Game' className='img-link' style={{height : "24px"}}/>    
                </a>

                <a href='#' className='info-link link-icon'>
                    <img src={Info} alt='Info' className='img-link' style={{height : "24px"}}/>
                </a>

                <div className='contact-link link-icon'>
                    <img src={Contact} alt="Contact" className='img-link' style={{height : "24px"}}/>
                </div>
            </nav>
        </div>
    )
}
