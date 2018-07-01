import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';

const styles = {
  card: {
    maxHeight: '200px',
    maxWidth: '200px',

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

const Transition = (props) => (
  <Slide direction="up" {...props}/>
);

class QRCode extends React.PureComponent {
  constructor(props)  {
    super(props);
    this.state = {
      src: ''
    };
  }
  component (nextProps) {
    if (nextProps.payload !== this.props.payload) {
      this.update();
    }
  }
  getSVG () {
    const src = 'data:image/svg+xml,' + this.props.payload;
    return src;
  }
  render () {
    const src = this.getSVG();
    return this.renderContent(src);
  }
  renderContent (src) {
    const { classes, title, payload, onShare, onDismiss } = this.props;
    const open = payload !== undefined;
    return (
      <Dialog
        open={open}
        onClose={onDismiss}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>
          Codigo de pagosQR
        </DialogTitle>
        <DialogContent>
          <img src={src}/>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="primary" onClick={onShare}>
            Compartir
          </Button>
          <Button size="small" color="secondary" onClick={onDismiss}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
};
QRCode.propTypes = {
  classes: PropTypes.object.isRequired,
  payload: PropTypes.string,
  title: PropTypes.string,
  onShare: PropTypes.func,
  onDismiss: PropTypes.func,
};
QRCode.defaultProps = {
  payload: undefined,
  title: undefined,
  onShare: () => {},
  onDismiss: () => {},
};

export default withStyles(styles)(QRCode);