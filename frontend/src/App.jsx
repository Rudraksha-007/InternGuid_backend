import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/Login'
import SignUpPage from './components/SignUp'
import ProfilePage from './components/Profile'
import Chatbot from './components/Chatbot'
import Discover from './components/Discover'
// import Dashboard2 from './components/Dashboard2'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <main>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Login' element={<LoginPage/>}/>
          <Route path='/SignUp' element={<SignUpPage/>}/>
          <Route path='/Profile' element={<ProfilePage/>}/>
          <Route path='/SmartAssistant' element={<Chatbot/>}/>
          <Route path='/Discover' element={<Discover/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
