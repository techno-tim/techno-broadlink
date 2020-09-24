import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { requestDevices } from '../store/broadlink/actionCreator';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDevices());
  }, [dispatch]);

  // redux
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Braodlink Control
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default App;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
}));
