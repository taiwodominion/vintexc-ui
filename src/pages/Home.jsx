import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Announcement from '../components/Announcement';
import Contracts from '../components/Contracts';
import About from '../components/About';
import Choice from '../components/Choice';
import Trade from '../components/Trade';
import Blog from '../components/Blog';
import Action from '../components/Action';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      <nav>
        <Navbar />
      </nav>
      <main>
        <Hero />
        <Announcement />
        <Contracts />
        <About />
        <Choice />
        <Trade />
        <Blog />
        <Action />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
