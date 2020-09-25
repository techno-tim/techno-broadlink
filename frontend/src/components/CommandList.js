import { makeStyles } from '@material-ui/core/styles';
import { bool, array, func } from 'prop-types';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Grid from '@material-ui/core/Grid';

export default function CommandList(props) {
  const classes = useStyles();
  const { commands } = props;
  return (
    <List className={classes.root}>
      <Grid container alignItems="flex-start" justify="space-between">
        {commands.map(command => {
          return (
            <React.Fragment key={command.id}>
              <Box item pl={2} component={Grid}>
                <Typography display="inline" variant="h5" component="h2">
                  {command.name}
                </Typography>
              </Box>
              <Box item pr={2} component={Grid}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<PlayCircleOutlineIcon />}
                >
                  Send
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<HighlightOffIcon />}
                >
                  Delete
                </Button>
              </Box>
            </React.Fragment>
          );
        })}
      </Grid>
    </List>
  );
}

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    margin: theme.spacing(1),
  },
}));

CommandList.defaultProps = {};

CommandList.propTypes = {
  commands: array,
  disabled: bool,
  handleDeleteClick: func,
  handleSendClick: func,
};
