import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

const styles = {
  card: {
    display: 'inline-block',
    maxWidth: '345px',
    maxHeight: '200px',
    margin: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  qr: {
    height: '200px',
  }
};

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
    const { classes, title, payload } = this.props;
    return (
      <Card className={classes.card}>
        <Fade
          in={payload === undefined}
          style={{
            transitionDelay: payload === undefined ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
        <Fade
          in={payload !== undefined}
          style={{
            transitionDelay: payload !== undefined ? '800ms' : '0ms',
          }}
          unmountOnExit
        >
          <CardContent>
            <img src={src} alt='QR Code' />
            {title ? 
            <Typography gutterBottom component="p">
              {title}
            </Typography> : undefined}
          </CardContent>
        </Fade>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    );
  }
};
QRCode.propTypes = {
  classes: PropTypes.object.isRequired,
  payload: PropTypes.string,
  title: PropTypes.string,
};
QRCode.defaultProps = {
  payload: undefined,
  title: undefined,
};

export default withStyles(styles)(QRCode);