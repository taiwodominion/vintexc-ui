import React from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'


const Login = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <LoginForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Login