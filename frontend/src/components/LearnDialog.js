import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { bool, func, string } from 'prop-types';
import React from 'react';

export default function LearnDialog(props) {
  const {
    handleClose,
    open,
    learnDisabled,
    handleLearn,
    learnInput,
    handleInputChange,
    cancelDisabled,
    inputDisabled,
  } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Learn Command</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a command name to teach your device. After pressing learn, be
            sure to press the button on your remote!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="command"
            label="Command Name"
            fullWidth
            value={learnInput}
            onChange={handleInputChange}
            disabled={inputDisabled}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            disabled={cancelDisabled}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLearn}
            color="secondary"
            disabled={learnDisabled}
          >
            Learn
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     minWidth: 160,
//     minheight: 160,
//   },
//   selectedRoot: {
//     backgroundColor: theme.palette.background.paper,
//     border: `1px solid ${theme.palette.secondary.main}`,
//     minWidth: 160,
//     minheight: 160,
//   },
//   paper: {
//     margin: theme.spacing(1),
//   },
// }));

LearnDialog.defaultProps = {};

LearnDialog.propTypes = {
  open: bool,
  handleClose: func,
  learnDisabled: bool,
  handleLearn: func,
  learnInput: string,
  handleInputChange: func,
  inputDisabled: bool,
};
