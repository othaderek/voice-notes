import { useState, useEffect } from 'react'
import MainNavbar from './components/MainNavbar'
import SidePanel from './components/SidePanel'
import Dashboard from './components/Dashboard'
import { v4 as uuidv4 } from 'uuid'
import localforage from 'localforage'

function App() {
  const [localforageStore, setLocalforageStore] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVoiceNoteSelected, setIsVoiceNoteSelected] = useState(false)
  const [recordingState, setRecordingState] = useState('recordReady')
  const [voiceNotes, setVoiceNotes] = useState([
    {
      id: 1,
      title: 'Song idea',
    },
    {
      id: 2,
      title: 'Book idea',
    },
    {
      id: 3,
      title: 'thing that happened',
    },
  ])
  const [selectedVoiceNoteId, setSelectedVoiceNoteId] = useState(null)
  const [audioId, setAudioId] = useState(null)

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
      setIsRecording(true)
      checkRecordingState()
      createRecording()
    }

    if (value === 'stop') {
      setIsRecording(false)
      setIsPlaying(false)
      checkRecordingState()
    }

    if (value === 'play') {
      setIsRecording(false)
      playAudio()
      setIsPlaying(true)
      checkRecordingState()
    }

    if (value === 'create') {
      setIsRecording(false)
      setIsPlaying(false)
      setIsVoiceNoteSelected(false)
      setRecordingState('recordReady')
      setSelectedVoiceNoteId(null)
      checkRecordingState()
    }
  }

  const handleVoiceNoteIdChange = (id) => {
    setSelectedVoiceNoteId(id)
    setAudioId(id)
    setIsVoiceNoteSelected(true)
  }

  const createRecording = () => {
    let id = uuidv4()
    console.log(id)
    setAudioId(id)
    let newVoiceNote = {
      id: id,
      title: 'newly created item',
      audio: null,
    }
    localforageStore.setItem(id, newVoiceNote)
    setVoiceNotes([...voiceNotes, newVoiceNote])
    // navigator.mediaDevices.getUserMedia({audio: true})
    // .then( stream => {...})
    // Create an instance of MediaRecorder
    // Call start on that instance
    // add event listener 'dataavailable' to the mediaRecorder instance, the callback pushes event.data into an array called audio chunks
    // under this event listener add another one that has a stop event that calls a createAudio callback
  }

  const createAudio = () => {
    // this creates a new audio blob
    // URL.createObjectURl(audioBlob)
    // Create new audio object with audio url
  }

  const playAudio = () => {
    let itemPromise = localforageStore.getItem(audioId)
    itemPromise.then((val) => {
      console.log(audioId, val)
    })
  }
  useEffect(() => {
    localforage.config()
    let store = localforage.createInstance({
      name: 'voiceNotes',
    })
    setLocalforageStore(store)
  }, [])
  useEffect(() => {
    checkRecordingState()
  })
  return (
    <div className='App'>
      <audio />
      <MainNavbar handleRecordingStateChange={handleRecordingStateChange} />
      <SidePanel
        voiceNotes={voiceNotes}
        handleVoiceNoteIdChange={handleVoiceNoteIdChange}
      />
      <Dashboard
        recordingState={recordingState}
        handleRecordingStateChange={handleRecordingStateChange}
        playAudio={playAudio}
      />
    </div>
  )
}

export default App
