import React from 'react'
import bitcoinImg from "../assets/bitcoin.png"
import ethImg from "../assets/eth.png"
import coinsImg from "../assets/coins.png"
import dogeImg from "../assets/doge.png"
import "../css/Contracts.css"

const Contracts = () => {
  return (
    <div className="overlay">
    <section className='contract-container'>
        <div className='contract-title'>Market</div>
        <h1>Popular Contracts</h1>
        <div className="contract-grid">
            <div className="contract-logos">
                <div className="coin-logo">
                     <img src={bitcoinImg} alt="bitcoin-image" />
                 <div className="coin-name">
                     <h2>Bitcoin</h2>
                     <p>INR</p>
                 </div>
                 </div>

                 <div className="coin-logo">
                     <img src={ethImg} alt="bitcoin-image" />
                 <div className="coin-name">
                     <h2>Ethereum</h2>
                     <p>INR</p>
                 </div>
                 </div>
                 <div className="coin-logo">
                     <img src={coinsImg} alt="bitcoin-image" />
                 <div className="coin-name">
                     <h2>Solana</h2>
                     <p>INR</p>
                 </div>
                 </div>
                 <div className="coin-logo">
                     <img src={dogeImg} alt="bitcoin-image" />
                 <div className="coin-name">
                     <h2>Doge</h2>
                     <p>INR</p>
                 </div>
                 </div>
            </div>

            <div className="coin-changes">
                <div className="coin-change">
                     <h3>Change</h3>
                     <p>+14.04%</p>
                 </div>

                 <div className="coin-change">
                     <h3>Change</h3>
                     <p>+14.04%</p>
                 </div>

                 <div className="coin-change">
                     <h3>Change</h3>
                     <p className='red'>+14.04%</p>
                 </div>

                 <div className="coin-change">
                     <h3>Change</h3>
                     <p>+14.04%</p>
                 </div>
            </div>

            <div className="coin-prices">
                <div className="coin-price">
                     <h3>Price</h3>
                     <p>40,645 <span>inr</span></p>
                 </div>

                 <div className="coin-price">
                     <h3>Price</h3>
                     <p>40,645 <span>inr</span></p>
                 </div>

                 <div className="coin-price">
                     <h3>Price</h3>
                     <p>40,645 <span>inr</span></p>
                 </div>

                 <div className="coin-price">
                     <h3>Price</h3>
                     <p>40,645 <span>inr</span></p>
                 </div>
            </div>

            <div className="coin-charts">
                 <div className="coin-chart">
                     <h3>Chart</h3>
                 <svg width="100" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
                 </svg>
                 </div>
                 <div className="coin-chart">
                     <h3>Chart</h3>
                 <svg width="100" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
                 </svg>
                 </div>
                 <div className="coin-chart">
                     <h3>Chart</h3>
                 <svg width="100" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
                 </svg>
                 </div>
                 <div className="coin-chart">
                     <h3>Chart</h3>
                 <svg width="100" height="30" viewBox="0 0 100 30">
                     <defs>
                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                         <feDropShadow dx="0" dy="7" 
                         stdDeviation="7" flood-color="yellow" />
                         </filter>
                     </defs>
                     <polyline fill="none"
                     stroke="yellow"
                     stroke-width="2"
                     filter="url(#shadow)"
                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
                 </svg>
                 </div>
            </div>

            <div className="trade-buttons">
                <div className="trade-btn">
                     <button>Trade</button>
                 </div>
                 <div className="trade-btn">
                     <button>Trade</button>
                 </div>
                 <div className="trade-btn">
                     <button>Trade</button>
                 </div>
                 <div className="trade-btn">
                     <button>Trade</button>
                 </div>
            </div>
            
        </div>
        <button className='view-crypto'>View Other Crypto</button>
    </section>
    </div>
  )
}

export default Contracts



// import React from 'react'
// import bitcoinImg from "../assets/bitcoin.png"
// import ethImg from "../assets/eth.png"
// import coinsImg from "../assets/coins.png"
// import dogeImg from "../assets/doge.png"
// import "../css/Contracts.css"

// const Contracts = () => {
//   return (
//     <section className='contract-container'>
//         <div className='contract-title'>Market</div>
//         <h1>Popular Contracts</h1>
//         <div className="contract-grid">
//             <div className="contract-coin">
//                 <div className="coin-logo">
//                     <img src={bitcoinImg} alt="bitcoin-image" />
//                 <div className="coin-name">
//                     <h2>Bitcoin</h2>
//                     <p>INR</p>
//                 </div>
//                 </div>
//                 <div className="coin-change">
//                     <h3>Change</h3>
//                     <p>+14.04%</p>
//                 </div>
//                 <div className="coin-price">
//                     <h3>Price</h3>
//                     <p>40,645 <span>inr</span></p>
//                 </div>
//                 <div className="coin-chart">
//                     <h3>Chart</h3>
//                 <svg width="100" height="30" viewBox="0 0 100 30">
//                     <defs>
//                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//                         <feDropShadow dx="0" dy="7" 
//                         stdDeviation="7" flood-color="yellow" />
//                         </filter>
//                     </defs>
//                     <polyline fill="none"
//                     stroke="yellow"
//                     stroke-width="2"
//                     filter="url(#shadow)"
//                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
//                 </svg>
//                 </div>
//                 <div className="trade-btn">
//                     <button>Trade</button>
//                 </div>
//             </div>
//             <div className="contract-coin">
//                 <div className="coin-logo">
//                     <img src={ethImg} alt="bitcoin-image" />
//                 <div className="coin-name">
//                     <h2>Ethereum</h2>
//                     <p>INR</p>
//                 </div>
//                 </div>
//                 <div className="coin-change">
//                     <h3>Change</h3>
//                     <p>+14.04%</p>
//                 </div>
//                 <div className="coin-price">
//                     <h3>Price</h3>
//                     <p>40,645 <span>inr</span></p>
//                 </div>
//                 <div className="coin-chart">
//                     <h3>Chart</h3>
//                 <svg width="100" height="30" viewBox="0 0 100 30">
//                     <defs>
//                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//                         <feDropShadow dx="0" dy="7" 
//                         stdDeviation="7" flood-color="yellow" />
//                         </filter>
//                     </defs>
//                     <polyline fill="none"
//                     stroke="yellow"
//                     stroke-width="2"
//                     filter="url(#shadow)"
//                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
//                 </svg>
//                 </div>
//                 <div className="trade-btn">
//                     <button>Trade</button>
//                 </div>
//             </div>
//             <div className="contract-coin">
//                 <div className="coin-logo">
//                     <img src={coinsImg} alt="bitcoin-image" />
//                 <div className="coin-name">
//                     <h2>Solana</h2>
//                     <p>INR</p>
//                 </div>
//                 </div>
//                 <div className="coin-change">
//                     <h3>Change</h3>
//                     <p>+14.04%</p>
//                 </div>
//                 <div className="coin-price">
//                     <h3>Price</h3>
//                     <p>40,645 <span>inr</span></p>
//                 </div>
//                 <div className="coin-chart">
//                     <h3>Chart</h3>
//                 <svg width="100" height="30" viewBox="0 0 100 30">
//                     <defs>
//                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//                         <feDropShadow dx="0" dy="7" 
//                         stdDeviation="7" flood-color="yellow" />
//                         </filter>
//                     </defs>
//                     <polyline fill="none"
//                     stroke="yellow"
//                     stroke-width="2"
//                     filter="url(#shadow)"
//                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
//                 </svg>
//                 </div>
//                 <div className="trade-btn">
//                     <button>Trade</button>
//                 </div>
//             </div>
//             <div className="contract-coin">
//                 <div className="coin-logo">
//                     <img src={dogeImg} alt="bitcoin-image" />
//                 <div className="coin-name">
//                     <h2>Doge</h2>
//                     <p>INR</p>
//                 </div>
//                 </div>
//                 <div className="coin-change">
//                     <h3>Change</h3>
//                     <p>+14.04%</p>
//                 </div>
//                 <div className="coin-price">
//                     <h3>Price</h3>
//                     <p>40,645 <span>inr</span></p>
//                 </div>
//                 <div className="coin-chart">
//                     <h3>Chart</h3>
//                 <svg width="100" height="30" viewBox="0 0 100 30">
//                     <defs>
//                         <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
//                         <feDropShadow dx="0" dy="7" 
//                         stdDeviation="7" flood-color="yellow" />
//                         </filter>
//                     </defs>
//                     <polyline fill="none"
//                     stroke="yellow"
//                     stroke-width="2"
//                     filter="url(#shadow)"
//                     points="0,20,20,10,40,15,60,5,80,15,100,10" />
//                 </svg>
//                 </div>
//                 <div className="trade-btn">
//                     <button>Trade</button>
//                 </div>
//             </div>

//         </div>
//         <button className='view-crypto'>View Other Crypto</button>
//     </section>
//   )
// }

// export default Contracts