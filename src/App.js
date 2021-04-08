import { useState, useEffect } from 'react'
import MainNavbar from './components/MainNavbar'
import SidePanel from './components/SidePanel'
import Dashboard from './components/Dashboard'

function App() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVoiceNoteSelected, setIsVoiceNoteSelected] = useState(false)
  const [recordingState, setRecordingState] = useState('recordReady')
  const checkRecordingState = () => {
    if (isRecording) {
      setRecordingState('recording')
    } else if (isPlaying) {
      setRecordingState('playing')
    } else if (isVoiceNoteSelected) {
      setRecordingState('playReady')
    } else {
      setRecordingState('recordReady')
    }
  }

  useEffect(() => {
    checkRecordingState()
  }, [])
  return (
    <div className='App'>
      <MainNavbar />
      <SidePanel />
      <Dashboard recordingState={recordingState} />
    </div>
  )
}

export default App
