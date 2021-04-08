import { useState, useEffect } from 'react'
import CreateButton from './components/buttons/CreateButton'
import DeleteButton from './components/buttons/DeleteButton'
import PlayButton from './components/buttons/PlayButton'
import RecordButton from './components/buttons/RecordButton'

function App() {
  return (
    <div className='App'>
      <CreateButton />
      <PlayButton />
      <RecordButton />
      <DeleteButton />
    </div>
  )
}

export default App
