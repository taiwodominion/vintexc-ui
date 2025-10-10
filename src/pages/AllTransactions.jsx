import React from 'react'
import Navbar from '../components/Navbar'
import AllTransactionsHistoryForm from '../components/AllTransactionsHistoryForm'
import Footer from '../components/Footer'

const AllTransactions = () => {
  return (
    <div className="exchange">
      <nav>
        <Navbar />
      </nav>
      <main>
        <AllTransactionsHistoryForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AllTransactions