import List from '@material-ui/core/List'
import VoiceNote from './VoiceNote'

function VoiceNotes({
  voiceNotes,
  handleVoiceNoteIdChange,
  getVoiceNote,
  deleteVoiceNote,
}) {
  const notes = () => {
    return voiceNotes.map((voiceNote) => {
      return (
        <VoiceNote
          key={voiceNote.id}
          id={voiceNote.id}
          title={voiceNote.title}
          handleVoiceNoteIdChange={handleVoiceNoteIdChange}
          getVoiceNote={getVoiceNote}
          deleteVoiceNote={deleteVoiceNote}
        />
      )
    })
  }
  return <List>{notes()}</List>
}

export default VoiceNotes
