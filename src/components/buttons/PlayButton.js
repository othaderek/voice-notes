import { useState } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import green from '@material-ui/core/colors/green'
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined'

const styles = (theme) => ({
  containedGreen: {
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    width: '200px',
    height: '80px',
  },
})

function PlayButton(props) {
  const { classes } = props
  // clickedOn state that tracks if it is on or off
  let [clickedOn, setClickedOn] = useState(false)
  // Ficgure out even handlers in Material UI
  return (
    <Button className={classes.containedGreen} style={{ flex: 1 }}>
      <PlayArrowOutlinedIcon style={{ fill: 'white' }} />
    </Button>
  )
}

export default withStyles(styles)(PlayButton)
