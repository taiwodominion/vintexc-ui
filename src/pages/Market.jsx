import React from 'react'
import Navbar from '../components/Navbar'
import MarketLeaders from '../components/MarketLeaders'
import Announcement from '../components/Announcement'
import Contracts from '../components/Contracts'
import Action from '../components/Action'
import Footer from '../components/Footer'

const Market = () => {
  return (
    <div>
      <Navbar />
      <MarketLeaders />
      <Announcement />
      <Contracts showCryptoBtn ={false} />
      <Action />
      <Footer />
    </div>
  )
}

export default Market