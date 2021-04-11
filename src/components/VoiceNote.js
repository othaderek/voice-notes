import { ListItem, ListItemText } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

const styles = () => ({
  listItem: {},
})

function VoiceNote(props) {
  const {
    classes,
    id,
    title,
    handleVoiceNoteIdChange,
    getVoiceNote,
    deleteVoiceNote,
  } = props
  const handleClick = (e) => {
    console.log(id)
    handleVoiceNoteIdChange(id)
    getVoiceNote(id)
  }

  const handleDelete = () => {
    deleteVoiceNote(id)
  }

  return (
    <ListItem button className={classes.listItem} onClick={handleClick}>
      <ListItemText primary={title} />
      <DeleteForeverIcon onClick={handleDelete} />
    </ListItem>
  )
}

export default withStyles(styles)(VoiceNote)
