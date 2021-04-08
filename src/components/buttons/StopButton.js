import { useState } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import StopOutlinedIcon from '@material-ui/icons/StopOutlined'
const styles = (theme) => ({
  stopButton: {
    backgroundColor: '#A9A9A9',
    width: '200px',
    height: '80px',
  },
})

function StopButton(props) {
  const { classes } = props
  // clickedOn state that tracks if it is on or off
  let [clickedOn, setClickedOn] = useState(false)
  // Ficgure out even handlers in Material UI
  return (
    <Button className={classes.stopButton}>
      <StopOutlinedIcon style={{ fill: 'white' }} />
    </Button>
  )
}

export default withStyles(styles)(StopButton)
