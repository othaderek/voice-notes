import { ListItem, ListItemText } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  listItem: {},
})

function VoiceNote(props) {
  const { classes, id, title } = props
  let handleClick = (e) => {
    console.log(id)
  }
  return (
    <ListItem button className={classes.listItem} onClick={handleClick}>
      <ListItemText primary={title} />
    </ListItem>
  )
}

export default withStyles(styles)(VoiceNote)
