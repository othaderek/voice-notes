import { useState, useEffect } from 'react'
import MainNavbar from './components/MainNavbar'
import SidePanel from './components/SidePanel'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className='App'>
      <MainNavbar />
      <SidePanel />
      <Dashboard />
    </div>
  )
}

export default App
