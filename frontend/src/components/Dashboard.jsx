import React from 'react'
import Header from './HeaderComponents/Header'
import MainDashboard from './DashboardCompnents/Maindashboard'
import Footer from './HeaderComponents/Footer'

const Dashboard = () => {
  return (
    <div>
        <Header />
        <MainDashboard />
        <Footer />
    </div>
  )
}

export default Dashboard