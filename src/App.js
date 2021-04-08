import { useState, useEffect } from 'react'
import DeleteButton from './components/buttons/DeleteButton'
import PlayButton from './components/buttons/PlayButton'
import RecordButton from './components/buttons/RecordButton'

function App() {
  return (
    <div className='App'>
      <PlayButton />
      <RecordButton />
      <DeleteButton />
    </div>
  )
}

export default App
