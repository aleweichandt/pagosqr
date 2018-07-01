import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

const ErrorView = (props) => {
  const { classes, error, onDismiss } = props;
  const hasError = error !== undefined;
  return error ? (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={5000}
      open={hasError}
      onClose={onDismiss}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{error.message}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onDismiss}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  ) : null;
};
ErrorView.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.instanceOf(Error),
  onDismiss: PropTypes.func,
};
ErrorView.defaultProps = {
  onDismiss: () => {},
};

export default withStyles(styles)(ErrorView);