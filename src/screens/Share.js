import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import QRCode from '../component/QRCode';
import apiCall from '../api';

class Share extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      qrData: undefined,
    }
  }
  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    const queryPath = `api/share/${id}`;
    // const queryPath = `http://localhost:5000/api/share/${id}`;
    apiCall(queryPath)
      .then(({response}) =>  this.setState({qrData: response}))
      .catch(err => console.log(err));
  }
  render() {
    const { qrData } = this.state;
    const src = 'data:image/svg+xml,' + qrData;
    return (
      <React.Fragment>
        <Header>Tu código de pagosQR</Header>
        { qrData ? 
          <img src={src}/> : undefined }
        {/* {qrData ? <QRCode payload={this.state.qrData}/> : undefined} */}
        <Footer/>
      </React.Fragment>
    );
  }
};

export default Share;