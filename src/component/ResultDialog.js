import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = (props) => (
  <Slide direction="up" {...props}/>
);

class ResultDialog extends React.PureComponent {
  constructor(props)  {
    super(props);
  }
  render () {
    const { title, children, open, onDismiss, onShare } = this.props;
    return (
      <Dialog
        open={open}
        onClose={onDismiss}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary" onClick={onShare}>
            Descargar
          </Button>
          <Button size="small" color="secondary" onClick={onDismiss}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
ResultDialog.propTypes = {
  title: PropTypes.string,
  onDismiss: PropTypes.func,
  onShare: PropTypes.func,
  children: PropTypes.node,
  open: PropTypes.bool,
};
ResultDialog.defaultProps = {
  title: '',
  onDismiss: () => {},
  onShare: () => {},
  children: undefined,
  open: false,
};

export default ResultDialog;