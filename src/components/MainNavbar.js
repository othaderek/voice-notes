import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import blue from '@material-ui/core/colors/blue'
import CreateButton from './buttons/CreateButton'

const styles = (theme) => ({
  containedBlue: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    height: '100px',
  },
})

function MainNavbar(props) {
  const { classes } = props
  return (
    <AppBar className={classes.containedBlue}>
      <Toolbar className={classes.containedBlue}>
        <CreateButton />
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(MainNavbar)
