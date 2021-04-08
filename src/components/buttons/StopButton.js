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
  const { classes, handleRecordingStateChange } = props
  let handleClick = (e) => {
    handleRecordingStateChange(e.target.name)
  }
  return (
    <Button className={classes.stopButton} name='stop' onClick={handleClick}>
      <StopOutlinedIcon style={{ fill: 'white' }} name='stop' />
    </Button>
  )
}

export default withStyles(styles)(StopButton)
