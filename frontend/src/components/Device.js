import { makeStyles } from '@material-ui/core/styles';
import { string, bool, func } from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { ButtonBase } from '@material-ui/core';

import React from 'react';

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
  } = props;
  return (
    <ButtonBase onClick={handleClick} disableRipple disabled={disabled}>
      <Card className={selected ? classes.selectedRoot : classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name || 'Name'}
          </Typography>
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
    minWidth: 160,
  },
  selectedRoot: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.secondary.main}`,
    minWidth: 160,
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
};
