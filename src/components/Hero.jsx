import { useNavigate } from "react-router-dom";
import bitcoinImg from "../assets/bitcoin.png"
import ethImg from "../assets/eth.png"
import coinsImg from "../assets/coins.png"
import dogeImg from "../assets/doge.png"
import "../css/Hero.css";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="overlay">
      <section className="hero-container">        
        <section className="hero">
          <div className="coin coin-1">
            <img src={bitcoinImg} alt="Bitcoin" />
          </div>
          <div className="coin coin-2">
            <img src={dogeImg} alt="Dogecoin" />
          </div>
          <div className="coin coin-3">
            <img src={ethImg} alt="Ethereum" />
          </div>
          <div className="coin coin-4">
            <img src={coinsImg} alt="Cryptocurrency" />
          </div>

          <div className="hero-content">
            <div className="hero-texts">
              <h1>Master Tomorrow's <span>Markets. Today.</span></h1>
              <p>
                Vintexc delivers precision futures trading and empowers your strategies with state-of-
                the-art AI trading features, giving you an intelligent edge in volatile markets.
              </p>
            </div>
            <div className="hero-btns">
              <button className="btn" onClick={() => navigate("/login")} >Get Started</button>
              <button className="btn btn-outline" onClick={() => navigate("/login")} >Start Trading</button>
            </div>
          </div>
        </section>
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </section>
    </div>
  );
};

export default Hero;