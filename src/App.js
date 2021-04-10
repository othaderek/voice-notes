import { useState, useEffect } from 'react'
import MainNavbar from './components/MainNavbar'
import SidePanel from './components/SidePanel'
import Dashboard from './components/Dashboard'
import { v4 as uuidv4 } from 'uuid'
import localforage from 'localforage'

function App() {
  // App state
  const [localforageStore, setLocalforageStore] = useState(null)
  let [isRecording, setIsRecording] = useState(false)
  let [isPlaying, setIsPlaying] = useState(false)
  let [isVoiceNoteSelected, setIsVoiceNoteSelected] = useState(false)
  let [recordingState, setRecordingState] = useState('recordReady')
  let [voiceNotes, setVoiceNotes] = useState([])
  let [selectedVoiceNote, setSelectedVoiceNote] = useState(null)
  let [audioId, setAudioId] = useState(null)
  let [mediaRecorder, setMediaRecorder] = useState(null)
  let [audioChunks, setAudioChunks] = useState([])
  let [audioBlob, setAudioBlob] = useState(null)
  let [audioURL, setAudioURL] = useState(null)
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
      clearPreviousRecordingData()
      createRecording()
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
      if (audio.paused) {
        setIsPlaying(false)
      }
    }

    if (value === 'create') {
      setIsRecording(false)
      setIsPlaying(false)
      setIsVoiceNoteSelected(false)
      setRecordingState('recordReady')
      // setSelectedVoiceNoteId(null)
      checkRecordingState()
    }
  }

  const handleVoiceNoteIdChange = (id) => {
    // setSelectedVoiceNoteId(id)
    setAudioId(id)
    setIsVoiceNoteSelected(true)
  }

  const clearPreviousRecordingData = () => {
    setMediaRecorder(null)
    setAudioChunks([])
    setAudioBlob(null)
    setAudioURL(null)
  }

  const createRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setMediaRecorder(createMediaRecorder(stream))
    })
  }

  const startRecording = () => {
    console.log('mediaRecorder: ', mediaRecorder)
    mediaRecorder.start()
    getAudioChunks()
    mediaRecorder.addEventListener('stop', createAudioBlob)
  }

  const getAudioChunks = () => {
    mediaRecorder.addEventListener('dataavailable', (e) => {
      setAudioChunks([...audioChunks, e.data])
    })
  }

  const createMediaRecorder = (stream) => {
    return new MediaRecorder(stream)
  }

  const createAudioBlob = () => {
    console.log('audioChunks: ', audioChunks)
    console.log('audioBlob: ', audioBlob)
  }

  const createAudio = () => {
    setAudio(new Audio(selectedVoiceNote.audioURL))
  }

  const playAudio = () => {
    audio.play()
  }

  const stopRecording = () => {
    console.log('stopped recording')
    mediaRecorder.stop()
  }

  const stopPlaying = () => {
    audio.stop()
  }

  const createNewVoiceNote = () => {
    console.log('Creating new voice note')
    let id = uuidv4()
    let d = new Date()
    let title = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
    let newVoiceNote = {
      id: id,
      title: title,
      audioURL: audioURL,
    }
    storeNewVoiceNote(newVoiceNote)
  }

  const storeNewVoiceNote = (newVoiceNote) => {
    // setItem to localforageStore
    // let { title, id } = newVoiceNote

    // let note = {
    //   id: id,
    //   title: title,
    // }
    setVoiceNotes([...voiceNotes, newVoiceNote])
    console.log('voice notes', voiceNotes)
    localforageStore.setItem(newVoiceNote.id, newVoiceNote)
  }

  const getVoiceNote = (id) => {
    localforageStore.getItem(id).then((val) => {
      console.log('voice note', val)
      setSelectedVoiceNote(val)
    })
  }

  // Lifecycle hooks
  // Creates new instance of db on initial page load (runs once)
  useEffect(() => {
    localforage.config()
    let store = localforage.createInstance({
      name: 'voiceNotes',
    })
    setLocalforageStore(store)
  }, [])

  // Checks recording state on render
  useEffect(() => {
    checkRecordingState()
  })

  // Runs code on state change of media recorder
  useEffect(() => {
    if (mediaRecorder === null) {
      return null
    } else {
      startRecording()
    }
  }, [mediaRecorder])

  // Runs whenever audio chunks changes. Sets new audio blob to state
  useEffect(() => {
    if (audioChunks.length === 0) {
      return null
    } else {
      console.log('audio chunks not null')
      setAudioBlob(new Blob(audioChunks))
    }
  }, [audioChunks])

  // When we have an audio blob, lets create a  new audio url
  useEffect(() => {
    if (audioBlob === null) {
      return null
    } else {
      setAudioURL(URL.createObjectURL(audioBlob))
    }
  }, [audioBlob])

  useEffect(() => {
    if (audioURL === null) {
      return null
    } else {
      createNewVoiceNote()
    }
  }, [audioURL])

  // On play selects voice note and creates new audio to be set as audio and played

  useEffect(() => {
    if (selectedVoiceNote === null) {
      return null
    } else {
      createAudio()
    }
  }, [selectedVoiceNote])

  // useEffect(() => {
  //   if (audio === null) {
  //     return null
  //   } else {
  //     playAudio()
  //   }
  // }, [audio])
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
        createAudio={createAudio}
        stopRecording={stopRecording}
        stopPlaying={stopPlaying}
      />
    </div>
  )
}

export default App
