import React from 'react';
import Navbar from '../components/Navbar';
import MarketLeaders from '../components/MarketLeaders';
import Announcement from '../components/Announcement';
import Contracts from '../components/Contracts';
import Action from '../components/Action';
import Footer from '../components/Footer';

const Market = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <MarketLeaders />
        <Announcement />
        <Contracts showCryptoBtn={false} />
        <Action />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Market;
