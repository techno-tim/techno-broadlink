import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import {
  requestDevices,
  setSelectedDevice,
} from '../store/broadlink/actionCreator';
import { setShowAlert } from '../store/layout/actionCreator';
import Device from './Device';
import SkeletonDevice from './SkeletonDevice';
import CommandList from './CommandList';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDevices());
  }, [dispatch]);

  const { isBusy, alert } = useSelector(state => state.layout);
  const { devices, selectedDevice } = useSelector(state => state.broadlink);

  const handleCloseAlert = () => {
    dispatch(setShowAlert('success', '', false));
  };

  const Alert = props => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Broadlink Control
          </Typography>
        </Toolbar>
      </AppBar>
      <Fade in={isBusy}>
        <LinearProgress color="secondary" />
      </Fade>

      <Box mr={8} ml={8} mt={2} mb={2} component={Grid}>
        <Grid container direction="row" alignItems="center">
          <Tooltip title="Discover Devices">
            <span>
              <IconButton
                color="secondary"
                aria-label="discover devices"
                disabled={isBusy}
                edge="start"
                onClick={() => {
                  // I think we should deselect when refreshing
                  dispatch(setSelectedDevice({}));
                  dispatch(requestDevices());
                }}
              >
                <RefreshIcon />
              </IconButton>
            </span>
          </Tooltip>

          {isBusy && (
            <Typography variant="h5">Discovering devices...</Typography>
          )}

          {!isBusy && (
            <Typography variant="h5">
              Discovered {devices.length}{' '}
              {devices.length === 1 ? 'device' : 'devices'}
            </Typography>
          )}
        </Grid>

        <Divider />
        <Box pt={2} pb={2}>
          <Typography variant="h6">Devices</Typography>
        </Box>
        <Box spacing={3} container component={Grid} pb={4}>
          {isBusy && devices.length === 0 && (
            <Grid item>
              <SkeletonDevice />
            </Grid>
          )}

          {devices.map(device => {
            return (
              <Grid item key={device.mac}>
                <Device
                  ip={device.ip}
                  mac={device.mac}
                  name={device.name}
                  selected={selectedDevice && selectedDevice.mac === device.mac}
                  manufacturer={device.manufacturer}
                  model={device.model}
                  handleClick={() => dispatch(setSelectedDevice(device))}
                  disabled={isBusy}
                />
              </Grid>
            );
          })}
        </Box>
        <Divider />
        {selectedDevice && selectedDevice.commands && (
          <>
            <Box pt={2} pb={2}>
              <Typography variant="h6">Commands</Typography>
            </Box>
            <Box>
              <CommandList commands={selectedDevice.commands} />
            </Box>
          </>
        )}

        <Snackbar
          open={alert.show}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default App;

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1,
  },
  deviceContainer: {
    display: 'flex',
  },
}));
