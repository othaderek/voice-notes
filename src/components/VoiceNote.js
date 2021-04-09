import { ListItem, ListItemText } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  listItem: {},
})

function VoiceNote(props) {
  const { classes } = props
  let handleClick = (e) => {
    console.log(e)
  }
  return (
    <ListItem button className={classes.listItem} onClick={handleClick} id='1'>
      <ListItemText primary={'Voice recording'} id='1' />
    </ListItem>
  )
}

export default withStyles(styles)(VoiceNote)
