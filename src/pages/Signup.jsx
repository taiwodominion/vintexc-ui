import React from 'react'
import Navbar from '../components/Navbar'
import RegistrationForm from '../components/RegistrationForm'
import Footer from '../components/Footer'


const Signup = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <RegistrationForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Signup