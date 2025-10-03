import React from 'react'
import Navbar from '../components/Navbar'
import AssetHero from '../components/AssetHero'
import AssetQuickAccess from '../components/AssetQuickAccess'
import AssetTable from '../components/AssetTable'
import Footer from '../components/Footer'

const Assets = () => {
  return (
    <div className="asset">
      <nav>
        <Navbar />
      </nav>
      <main>
        <AssetHero />
        <AssetQuickAccess />
        <AssetTable />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Assets