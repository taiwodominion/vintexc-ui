import React from 'react'
import Navbar from '../components/Navbar'
import RechargeForm from '../components/RechargeForm'
import RechargeHistory from '../components/RechargeHistory'
import Footer from '../components/Footer'

const Recharge = () => {
  return (
    <div className="ai-trading">
      <nav>
        <Navbar />
      </nav>
      <main>
        <RechargeForm />
        <RechargeHistory />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Recharge