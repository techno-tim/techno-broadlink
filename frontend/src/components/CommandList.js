import { makeStyles } from '@material-ui/core/styles';
import { bool, array } from 'prop-types';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function CommandList(props) {
  const classes = useStyles();
  const { commands } = props;
  return (
    <List className={classes.root}>
      {commands.map(command => {
        return (
          <Box key={command.id}>
            <Typography>{command.id}</Typography>
            <Typography>{command.name}</Typography>
            <Typography>{command.data}</Typography>
          </Box>
        );
      })}
    </List>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

CommandList.defaultProps = {
  commands: array,
};

CommandList.propTypes = {
  disabled: bool,
};
