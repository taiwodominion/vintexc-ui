import React from 'react'
import Navbar from '../components/Navbar'
import AiTradingHero from '../components/AiTradingHero'
import AiQuickAccess from '../components/AiQuickAccess'
import AiHistory from '../components/AiHistory'
import Footer from '../components/Footer'

const AiTrading = () => {
  return (
    <div className="ai-trading">
      <nav>
        <Navbar />
      </nav>
      <main>
        <AiTradingHero />
        <AiQuickAccess />
        <AiHistory />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default AiTrading