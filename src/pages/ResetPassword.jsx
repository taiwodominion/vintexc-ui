import React from 'react'
import Navbar from '../components/Navbar'
import ResetPasswordForm from '../components/ResetPasswordForm'
import Footer from '../components/Footer'

const ResetPassword = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <ResetPasswordForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default ResetPassword