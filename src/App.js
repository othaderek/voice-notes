import { useState, useEffect } from 'react'
import CreateButton from './components/buttons/CreateButton'
import DeleteButton from './components/buttons/DeleteButton'
import PlayButton from './components/buttons/PlayButton'
import RecordButton from './components/buttons/RecordButton'
import StopButton from './components/buttons/StopButton'

function App() {
  return (
    <div className='App'>
      <CreateButton />
      <PlayButton />
      <RecordButton />
      <DeleteButton />
      <StopButton />
    </div>
  )
}

export default App
