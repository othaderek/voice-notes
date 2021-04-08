import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import blue from '@material-ui/core/colors/blue'
import CreateButton from './buttons/CreateButton'

const styles = (theme) => ({
  appBar: {
    alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    height: '100px',
  },
})

function MainNavbar(props) {
  const { classes } = props
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.appBar}>
        <CreateButton />
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(MainNavbar)
