import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import RecordButton from './buttons/RecordButton'
import PlayButton from './buttons/PlayButton'
import StopButton from './buttons/StopButton'

const styles = () => ({
  dashboard: {
    width: '100vw',
    height: '1000px',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {},
})

function Dashboard(props) {
  const { classes, recordingState, handleRecordingStateChange } = props
  return (
    <div className={classes.dashboard}>
      <Grid container direction='column' justify='center' alignItems='center'>
        {
          {
            recording: (
              <StopButton
                handleRecordingStateChange={handleRecordingStateChange}
              />
            ),
            playing: (
              <div>
                <div style={{ textAlign: 'center' }}>Voice Note Details</div>
                <StopButton
                  handleRecordingStateChange={handleRecordingStateChange}
                />
              </div>
            ),
            recordReady: (
              <div>
                <div style={{ textAlign: 'center' }}>Click to Record</div>
                <RecordButton
                  handleRecordingStateChange={handleRecordingStateChange}
                />
              </div>
            ),
            playReady: (
              <div>
                <div style={{ textAlign: 'center' }}>Voice Note Details</div>
                <PlayButton
                  handleRecordingStateChange={handleRecordingStateChange}
                />
              </div>
            ),
          }[recordingState]
        }
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Dashboard)
