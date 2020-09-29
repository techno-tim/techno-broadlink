import { makeStyles } from '@material-ui/core/styles';
import { string, bool, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';

import React from 'react';
import {
  SKELETON_DEVICE_MIN_HEIGHT,
  SKELETON_DEVICE_MIN_WIDTH,
} from '../constants/constants';

export default function Device(props) {
  const classes = useStyles();
  const {
    name,
    ip,
    mac,
    selected,
    model,
    manufacturer,
    handleClick,
    disabled,
    handleChange,
    temperature,
    humidity,
  } = props;
  return (
    <ButtonBase onClick={handleClick} disableRipple disabled={disabled}>
      <Card className={selected ? classes.selectedRoot : classes.root}>
        <CardContent>
          <Grid container direction="row" justify="flex-end"></Grid>
          <InputBase
            className={classes.margin}
            defaultValue={name || 'Room'}
            inputProps={{
              'aria-label': 'naked',
              min: 0,
              style: { textAlign: 'center', fontSize: 24 },
            }}
            rows={1}
            onChange={handleChange}
            disabled={disabled}
          />
          {temperature && (
            <Typography variant="body2" component="p">
              {temperature}°
            </Typography>
          )}
          {humidity && (
            <Typography variant="body2" component="p">
              {humidity} RH
            </Typography>
          )}

          <Typography className={classes.pos} color="textSecondary">
            {manufacturer}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {model}
          </Typography>
          <Typography variant="body2" component="p">
            {ip}
          </Typography>
          <Typography variant="body2" component="p">
            {mac}
          </Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minWidth: SKELETON_DEVICE_MIN_WIDTH,
    minheight: SKELETON_DEVICE_MIN_HEIGHT,
  },
  selectedRoot: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    minWidth: SKELETON_DEVICE_MIN_WIDTH,
    minheight: SKELETON_DEVICE_MIN_HEIGHT,
  },
  paper: {
    margin: theme.spacing(1),
  },
}));

Device.defaultProps = {};

Device.propTypes = {
  name: string,
  ip: string,
  mac: string,
  selected: bool,
  model: string,
  manufacturer: string,
  handleClick: func,
  disabled: bool,
  handleChange: func,
};
