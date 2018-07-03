import React from 'react';
import PropTypes from 'prop-types';

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
  downloadSVG() {
  }
  render () {
    const src = this.getSVG();
    return (
      <img ref={n => this.svgImage = n} src={src}/>
    );
  }
};
QRCode.propTypes = {
  payload: PropTypes.string,
};
QRCode.defaultProps = {
  payload: undefined,
};

export default QRCode;