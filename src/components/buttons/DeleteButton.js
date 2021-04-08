import { useState } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import yellow from '@material-ui/core/colors/yellow'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

const styles = (theme) => ({
  containedYellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
    width: '200px',
    height: '80px',
  },
})

function DeleteButton(props) {
  const { classes } = props
  // clickedOn state that tracks if it is on or off
  let [clickedOn, setClickedOn] = useState(false)
  // Ficgure out even handlers in Material UI
  return (
    <Button className={classes.containedYellow}>
      <CloseOutlinedIcon style={{ fill: 'white' }} />
    </Button>
  )
}

export default withStyles(styles)(DeleteButton)
