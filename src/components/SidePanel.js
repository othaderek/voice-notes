import Drawer from '@material-ui/core/Drawer'
import VoiceNotes from './VoiceNotes'
import { withStyles } from '@material-ui/core'

const styles = () => ({
  root: {
    display: 'flex',
  },
  sidePanel: {
    width: '240px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '240px',
    paddingTop: '100px',
  },
})

function SidePanel(props) {
  const { classes, voiceNotes, handleVoiceNoteIdChange } = props
  return (
    <div className={classes.root}>
      <Drawer
        variant='permanent'
        anchor='left'
        className={classes.sidePanel}
        classes={{ paper: classes.drawerPaper }}
      >
        <VoiceNotes
          voiceNotes={voiceNotes}
          handleVoiceNoteIdChange={handleVoiceNoteIdChange}
          getVoiceNote={getVoiceNote}
        />
      </Drawer>
    </div>
  )
}

export default withStyles(styles)(SidePanel)
