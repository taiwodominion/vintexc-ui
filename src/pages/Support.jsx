import React from 'react';
import Navbar from '../components/Navbar';
import ContactForm from '../components/ContactForm';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

const CustomerSupport = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <ContactForm />
        <Faq />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CustomerSupport;
