import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import React from 'react';

export default function SkeletonDevice() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Skeleton variant="rect" width={160} height={160} />
    </Paper>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    // margin: theme.spacing(1),
  },
}));

SkeletonDevice.defaultProps = {};

SkeletonDevice.propTypes = {};
