import React from 'react'
import Navbar from '../components/Navbar'
import ExchangeHistoryForm from '../components/ExchangeHistoryForm'
import Footer from '../components/Footer'

const Exchange = () => {
  return (
    <div className="exchange">
      <nav>
        <Navbar />
      </nav>
      <main>
        <ExchangeHistoryForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Exchange