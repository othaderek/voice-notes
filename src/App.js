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

  const handleRecordingStateChange = (value) => {
    console.log('handleRecordingStateChange: ' + value)
    if (value === 'recording') {
      // check if voice note selected
      setIsRecording(true)
      checkRecordingState()
    }

    if (value === 'stop') {
      setIsRecording(false)
      setIsPlaying(false)
      checkRecordingState()
    }

    if (value === 'play') {
      setIsRecording(false)
      setIsPlaying(true)
      checkRecordingState()
    }
  }

  useEffect(() => {
    checkRecordingState()
  })
  return (
    <div className='App'>
      <MainNavbar />
      <SidePanel />
      <Dashboard
        recordingState={recordingState}
        handleRecordingStateChange={handleRecordingStateChange}
      />
    </div>
  )
}

export default App
