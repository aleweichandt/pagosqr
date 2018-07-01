import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  made: {
    position: 'fixed',
    right: 10,
    bottom: 10,
  }
});

const Footer = (props) => {
  const { classes, onComplete, onError } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography component="p" className={classes.made}>
          made by Mates Inc.
        </Typography>
      </Paper>
    </div>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Footer);