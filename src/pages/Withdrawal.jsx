import React from 'react'
import Navbar from '../components/Navbar'
import WithdrawalForm from '../components/WithdrawalForm'
import WithdrawalHistory from '../components/WithdrawalHistory'
import Footer from '../components/Footer'

const Recharge = () => {
  return (
    <div className="ai-trading">
      <nav>
        <Navbar />
      </nav>
      <main>
        <WithdrawalForm />
        <WithdrawalHistory />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Recharge