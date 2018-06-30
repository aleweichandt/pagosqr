import React from 'react';

export default class QRCode extends React.PureComponent {
    constructor(props)  {
        super(props);
        this.state = {src:''};
    }
    component (nextProps) {
      if (nextProps.payload !== this.props.payload) {
        this.update()
      }
    }
    getSVG () {
        const src = 'data:image/svg+xml,' + this.props.payload;
        console.log(src);
        return src
    }
    render () {
        const src = this.getSVG();
        return (
            <div className='qrcode'>
            <img src={src} alt='QR Code' />
            </div>
        )
    }
  }