import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';

import React from 'react';
import {
  SKELETON_DEVICE_MIN_HEIGHT,
  SKELETON_DEVICE_MIN_WIDTH,
} from '../constants/constants';

export default function SkeletonDevice() {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Skeleton
        variant="rect"
        width={SKELETON_DEVICE_MIN_WIDTH}
        height={SKELETON_DEVICE_MIN_HEIGHT}
      />
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
