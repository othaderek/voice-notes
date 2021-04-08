import { useState } from 'react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import blue from '@material-ui/core/colors/blue'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'

const styles = (theme) => ({
  containedBlue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    width: '200px',
    height: '80px',
  },
})

function CreateButton(props) {
  const { classes } = props
  // clickedOn state that tracks if it is on or off
  let [clickedOn, setClickedOn] = useState(false)
  // Ficgure out even handlers in Material UI
  return (
    <Button className={classes.containedBlue}>
      <AddBoxOutlinedIcon />
    </Button>
  )
}

export default withStyles(styles)(CreateButton)
