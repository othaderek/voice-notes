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
  const { classes, handleRecordingStateChange } = props
  const handleClick = () => {
    handleRecordingStateChange('play')
  }
  return (
    <Button className={classes.containedGreen} onClick={handleClick}>
      <PlayArrowOutlinedIcon style={{ fill: 'white' }} />
    </Button>
  )
}

export default withStyles(styles)(PlayButton)
