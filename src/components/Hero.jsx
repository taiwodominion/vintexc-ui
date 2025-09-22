import React from 'react';
import { useNavigate } from 'react-router-dom';
import bitcoinImg from '../assets/bitcoin.png';
import ethImg from '../assets/eth.png';
import coinsImg from '../assets/coins.png';
import dogeImg from '../assets/doge.png';
import '../css/Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="overlay">
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>

      <div className="container">
        <div className="backgroundElements">
          <div className="bitcoinElement">
            <img alt="Bitcoin" src={bitcoinImg} />
          </div>
          <div className="dodgeElement">
            <img alt="Dodge Coin" src={dogeImg} />
          </div>
          <div className="purpleCoinElement">
            <img alt="Purple Coin" src={ethImg} />
          </div>
          <div className="greenCoinElement">
            <img alt="Green Coin" src={coinsImg} />
          </div>
        </div>
        <div>
          <div className="content">
            <h1 className="headingDesktop">
              Master Tomorrow's <br /> Markets. Today.
            </h1>
            <h1 className="headingMobile">Secure & Intuitive Crypto Trading</h1>
            <p className="description">
              Vintexc delivers precision futures trading and empowers your
              strategies with state-of-the-art AI trading features, giving you
              an intelligent edge in volatile markets.
            </p>
            <div className="hero-btns">
              <button className="btn" onClick={() => navigate('/login')}>
                Get Started
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate('/login')}
              >
                Start Trading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
