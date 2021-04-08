import { useState } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import red from '@material-ui/core/colors/red'
import AlbumOutlinedIcon from '@material-ui/icons/AlbumOutlined'

const styles = (theme) => ({
  containedRed: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    width: '200px',
    height: '80px',
  },
})

function RecordButton(props) {
  const { classes } = props
  // clickedOn state that tracks if it is on or off
  let [clickedOn, setClickedOn] = useState(false)
  // Ficgure out even handlers in Material UI
  return (
    <Button className={classes.containedRed}>
      <AlbumOutlinedIcon />
    </Button>
  )
}

export default withStyles(styles)(RecordButton)
