import { useState, useEffect } from 'react'
import MainNavbar from './components/MainNavbar'
import SidePanel from './components/SidePanel'
import Dashboard from './components/Dashboard'
import { v4 as uuidv4 } from 'uuid'
import localforage from 'localforage'

function App() {
  // App state
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
  const [mediaRecorder, setMediaRecord] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [audioBlob, setAudioBlob] = useState(null)
  const [audio, setAudio] = useState(null)

  // App functions
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
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.start()

      mediaRecorder.addEventListener('dataavailable', (e) => {
        setAudioChunks([...audioChunks, e.data])
      })
      mediaRecorder.addEventListener('stop', createAudio)
    })

    createAudio()
    setVoiceNotes([...voiceNotes, newVoiceNote])
  }

  const createAudio = () => {
    setAudioBlob(new Blob(audioChunks))
    let audioURL = URL.createObjectURL(audioBlob)
    let newAudio = new Audio(audioURL)
    // prompt for voice note name
    let newVoiceNote = createNewVoiceNote('new title', audio)
    storeNewVoiceNote(newVoiceNote)
  }

  const playAudio = () => {
    let itemPromise = localforageStore.getItem(audioId)
    itemPromise.then((val) => {
      console.log(audioId, val)
    })
  }

  const createNewVoiceNote = (title, audio) => {
    let id = uuidv4()
    let newVoiceNote = {
      id: id,
      title: title,
      audio: audio,
    }
    return newVoiceNote
  }

  const storeNewVoiceNote = (newVoiceNote) => {
    // setItem to localforageStore
    localforageStore.setItem(newVoiceNote.id, newVoiceNote)
  }

  // Lifecycle hooks
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
