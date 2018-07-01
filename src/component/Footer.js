import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  FacebookShareButton,
  FacebookShareCount,
  FacebookIcon
} from 'react-share';

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
  },
  shareButton:{
    cursor: 'pointer',
  },
  shareCount: {
    marginTop: 3,
    fontSize: 12,
  },
  buttonContainer: {
    verticalAlign: "top",
    display: "inline-block",
    marginRight: 30,
    textAlign: 'center'
  }
});

const Footer = (props) => {
  const { classes, onComplete, onError } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <div className={classes.buttonContainer}>
          <FacebookShareButton
              url={"https://pagosqr-web.firebaseapp.com/"}
              quote={"Genera tu codigo de pagoQR"}
              className={classes.shareButton}>
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <FacebookShareCount
              url={"https://pagosqr-web.firebaseapp.com/"}
              className={classes.shareCount}>
              {count => count}
            </FacebookShareCount>
        </div>
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