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
  },
});

const Footer = (props) => {
  const { classes, onComplete, onError } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography component="p">
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