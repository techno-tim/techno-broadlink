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
import AddIcon from '@material-ui/icons/Add';
import {
  requestDevices,
  setSelectedDevice,
  requestLearnCommand,
  requestSendCommand,
  requestDeleteCommand,
} from '../store/broadlink/actionCreator';
import {
  setShowAlert,
  setLearnOpen,
  setLearnInput,
} from '../store/layout/actionCreator';
import Device from './Device';
import SkeletonDevice from './SkeletonDevice';
import CommandList from './CommandList';
import LearnDialog from './LearnDialog';

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestDevices());
  }, [dispatch]);

  const { isBusy, alert, learnOpen, learnInput } = useSelector(
    state => state.layout
  );
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
        {selectedDevice && selectedDevice.commands && (
          <>
            <Grid container direction="row" alignItems="center">
              <Tooltip title="Learn Command">
                <span>
                  <IconButton
                    color="secondary"
                    aria-label="learn command"
                    disabled={isBusy}
                    edge="start"
                    onClick={() => {
                      dispatch(setLearnOpen(true));
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </span>
              </Tooltip>
              <Typography variant="h5">Commands</Typography>
            </Grid>
            <Divider />
            <Box>
              <CommandList
                commands={selectedDevice.commands}
                handleSendClick={commandId =>
                  dispatch(requestSendCommand(selectedDevice.ip, commandId))
                }
                handleDeleteClick={commandId =>
                  dispatch(requestDeleteCommand(selectedDevice.ip, commandId))
                }
                disabled={isBusy}
              />
            </Box>
          </>
        )}

        {!selectedDevice.mac && !isBusy && (
          <Typography variant="subtitle1" color="textSecondary">
            Select a device to see commands
          </Typography>
        )}

        <Snackbar
          open={alert.show}
          autoHideDuration={5000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alert.severity}>{alert.message}</Alert>
        </Snackbar>
        <LearnDialog
          open={learnOpen}
          handleClose={() => {
            dispatch(setLearnOpen(false));
            dispatch(setLearnInput(''));
          }}
          handleLearn={() => {
            dispatch(requestLearnCommand(selectedDevice.ip, learnInput));
          }}
          learnInput={learnInput}
          handleInputChange={event =>
            dispatch(setLearnInput(event.target.value))
          }
          learnDisabled={!learnInput || isBusy}
          cancelDisabled={isBusy}
          inputDisabled={isBusy}
        />
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
