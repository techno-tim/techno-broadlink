import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { bool, func } from 'prop-types';

export default function DeleteDialog(props) {
  const { handleDelete, open, handleClose, disabled } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this command?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" disabled={disabled}>
            No
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            autoFocus
            disabled={disabled}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

DeleteDialog.defaultProps = {};

DeleteDialog.propTypes = {
  open: bool,
  handleClose: func,
  handleDelete: func,
  disabled: bool,
};
