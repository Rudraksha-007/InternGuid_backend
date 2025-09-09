import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import LoginPage from './components/Login'
import SignUpPage from './components/SignUp'
const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/SignUp' element={<SignUpPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
