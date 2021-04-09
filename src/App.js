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
  let [voiceNotes, setVoiceNotes] = useState([])
  let [selectedVoiceNoteId, setSelectedVoiceNoteId] = useState(null)
  let [audioId, setAudioId] = useState(null)
  let [mediaRecorder, setMediaRecorder] = useState(null)
  let [audioChunks, setAudioChunks] = useState([])
  let [audioBlob, setAudioBlob] = useState(null)
  let [audio, setAudio] = useState(null)

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

  const createRecording = async () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      let mR = new MediaRecorder(stream)
      console.log('mediaRecorder: ', mediaRecorder)
      mR.start()

      mR.addEventListener('dataavailable', (e) => {
        setAudioChunks([...audioChunks, e.data])
      })
      mR.addEventListener('stop', createAudio)
    })
  }

  const createAudio = () => {
    console.log('audioChunks: ', audioChunks)
    let blob = new Blob(audioChunks)
    setAudioBlob(blob)
    console.log(audioBlob)
    // let audioURL = URL.createObjectURL(audioBlob)
    // let newAudio = new Audio(audioURL)
    // prompt for voice note name
    // let newVoiceNote = createNewVoiceNote(newAudio)
    // storeNewVoiceNote(newVoiceNote)
  }

  const playAudio = () => {
    // audio.play()
    // itemPromise.then((val) => {
    //   console.log(audioId, val)
    // })
  }

  const stopRecording = () => {
    mediaRecorder.stop()
    createAudio()
  }

  const createNewVoiceNote = (audio) => {
    let id = uuidv4()
    let d = new Date()
    let title = `${d.toLocaleDateString} ${d.toLocaleTimeString}`
    let newVoiceNote = {
      id: id,
      title: title,
      audio: audio,
    }
    return newVoiceNote
  }

  const storeNewVoiceNote = (newVoiceNote) => {
    // setItem to localforageStore
    let { title, id } = newVoiceNote

    let note = {
      id: id,
      title: title,
    }
    setVoiceNotes([...voiceNotes], note)
    localforageStore.setItem(newVoiceNote.id, newVoiceNote)
  }

  const getVoiceNote = (id) => {
    localforageStore.getItem(id).then((val) => {
      console.log(val)
    })
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
        getVoiceNote={getVoiceNote}
      />
      <Dashboard
        recordingState={recordingState}
        handleRecordingStateChange={handleRecordingStateChange}
        playAudio={playAudio}
        stopRecording={stopRecording}
      />
    </div>
  )
}

export default App
