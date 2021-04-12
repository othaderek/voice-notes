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
      checkRecordingState()
    }
  }

  const handleVoiceNoteIdChange = (id) => {
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

  const createAudioBlob = () => {}

  const createAudio = () => {
    setAudio(new Audio(selectedVoiceNote.audioURL))
  }

  const playAudio = () => {
    console.log(audio.duration)
    audio.play()
    setIsPlaying(true)

    setInterval(() => {
      if (audio.paused) {
        setIsPlaying(false)
      }
    }, audio.duration * 1000)
  }

  const stopRecording = () => {
    mediaRecorder.stop()
    setIsRecording(false)
  }

  const stopPlaying = () => {
    audio.stop()
  }

  const createNewVoiceNote = () => {
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
    setVoiceNotes([...voiceNotes, newVoiceNote])
    localforageStore.setItem(newVoiceNote.id, newVoiceNote)
  }

  const getVoiceNote = (id) => {
    localforageStore.getItem(id).then((val) => {
      setSelectedVoiceNote(val)
    })
  }

  const deleteVoiceNote = (id) => {
    if (selectedVoiceNote === null) {
      return null
    } else {
      if (selectedVoiceNote.id === id) {
        console.log('hi')
        setRecordingState('recordReady')
        setSelectedVoiceNote(null)
        setIsVoiceNoteSelected(false)
        let newNotes = voiceNotes.filter((voiceNote) => voiceNote.id !== id)
        setVoiceNotes(newNotes)
      } else {
        let newNotes = voiceNotes.filter((voiceNote) => voiceNote.id !== id)
        setVoiceNotes(newNotes)
      }
    }
    setTimeout(() => {
      if (voiceNotes.length === 0) {
        console.log('none')
        clearPreviousRecordingData()
        setRecordingState('recordReady')
        setIsVoiceNoteSelected(false)
        clearPreviousRecordingData()
      }
    }, 1000)
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
    if (recordingState === 'playing') {
      if (audio) {
        if (audio.paused) {
          console.log('audio is paused')
          setIsPlaying(false)
          setRecordingState('playReady')
          checkRecordingState()
        }
      }
    }
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

  useEffect(() => {
    if (audio) {
      if (audio.paused) {
        setIsPlaying(false)
        setRecordingState('playReady')
      } else {
      }
    } else {
      return null
    }
  }, [audio])

  return (
    <div className='App'>
      <audio />
      <MainNavbar handleRecordingStateChange={handleRecordingStateChange} />
      <SidePanel
        voiceNotes={voiceNotes}
        handleVoiceNoteIdChange={handleVoiceNoteIdChange}
        getVoiceNote={getVoiceNote}
        deleteVoiceNote={deleteVoiceNote}
      />
      <Dashboard
        recordingState={recordingState}
        handleRecordingStateChange={handleRecordingStateChange}
        playAudio={playAudio}
        createAudio={createAudio}
        stopRecording={stopRecording}
        stopPlaying={stopPlaying}
        selectedVoiceNote={selectedVoiceNote}
      />
    </div>
  )
}

export default App
