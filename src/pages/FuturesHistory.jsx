import React from 'react'
import Navbar from '../components/Navbar'
import FuturesHistoryForm from '../components/FuturesHistoryForm'
import Footer from '../components/Footer'

const FuturesHistory = () => {
  return (
    <div className="exchange">
      <nav>
        <Navbar />
      </nav>
      <main>
        <FuturesHistoryForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default FuturesHistory