import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import QRCode from '../component/QRCode';
import apiCall from '../api';
import ResultDialog from '../component/ResultDialog';
import svg from 'save-svg-as-png';

class Share extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      qrData: undefined,
    }
  }
  componentDidMount() {
    const { match: { params: { id }}} = this.props;
    const queryPath = `${window.location.origin}/api/share/${id}`
    // const queryPath = "http://localhost:5000/api/share/" + id;
    apiCall(queryPath)
      .then(({response}) =>  this.setState({qrData: response}))
      .catch(err => console.log(err));
  }
  onQRDismiss() {
    this.setState({ qrData: undefined });
  }

  onQRShare() {
    const { qrData } = this.state;
    var parser = new DOMParser();
    var doc = parser.parseFromString(qrData, "image/svg+xml");
    svg.saveSvgAsPng(doc.lastChild,"codigoQR.png",{scale: 10})
  }
  render() {
    const { qrData } = this.state;
    return (
      <React.Fragment>
        <Header>Tu código de pagosQR</Header>
        <ResultDialog
          title="Codigo de pagosQR"
          onShare={this.onQRShare.bind(this)}
          onDismiss={this.onQRDismiss.bind(this)}
          open={qrData !== undefined}
        >
          <QRCode payload={qrData}/>
        </ResultDialog>
        <Footer/>
      </React.Fragment>
    );
  }
};

export default Share;