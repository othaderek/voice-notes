import { ListItem, ListItemText } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'

const styles = () => ({
  listItem: {},
})

function VoiceNote(props) {
  const { classes } = props
  return (
    <ListItem button className={classes.listItem}>
      <ListItemText primary={'List item'} />
    </ListItem>
  )
}

export default withStyles(styles)(VoiceNote)
