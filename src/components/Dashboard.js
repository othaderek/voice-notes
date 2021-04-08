import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import RecordButton from './buttons/RecordButton'

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
  const { classes } = props
  return (
    <div className={classes.dashboard}>
      <Grid container direction='column' justify='center' alignItems='center'>
        <RecordButton />
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Dashboard)
