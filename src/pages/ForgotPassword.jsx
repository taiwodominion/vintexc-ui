import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const ForgotPassword = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <ForgotPasswordForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default ForgotPassword