import React from 'react'
import Hero from './HomeComponents/Hero.jsx'
import Features from './HomeComponents/Feature.jsx'
import HowItWorks from './HomeComponents/HowItWorks.jsx'
import Footer from './HeaderComponents/Footer.jsx'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks /> 
      <Footer/>
    </>
  );
}

export default Home