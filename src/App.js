import { useState, useEffect } from 'react'
import CreateButton from './components/buttons/CreateButton'
import DeleteButton from './components/buttons/DeleteButton'
import PlayButton from './components/buttons/PlayButton'
import RecordButton from './components/buttons/RecordButton'
import StopButton from './components/buttons/StopButton'
import MainNavbar from './components/MainNavbar'

function App() {
  return (
    <div className='App'>
      <MainNavbar />
    </div>
  )
}

export default App
