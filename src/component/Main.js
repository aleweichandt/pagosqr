import React from 'react';
import svg from 'save-svg-as-png';
// import ReactDOM from 'react-dom'

import ResultDialog from './ResultDialog';
import QRCode from './QRCode';
import QRForm from './QRForm';
import ErrorView from './ErrorView';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      qrData: undefined,
      error: undefined,
    };
  }

  onFormError(error) {
    this.setState({ error })
  }

  onFormComplete(data) {
    this.setState({ qrData: data.response });
  }

  onErrorDismiss() {
    this.setState({ error: undefined });
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
    const { qrData, error } = this.state;
    return (
      <React.Fragment>
        <QRForm
          onError={this.onFormError.bind(this)}
          onComplete={this.onFormComplete.bind(this)}
        />
        <ResultDialog
          title="Codigo de pagosQR"
          onShare={this.onQRShare.bind(this)}
          onDismiss={this.onQRDismiss.bind(this)}
          open={qrData !== undefined}
        >
          <QRCode payload={qrData}/>
        </ResultDialog>
        <ErrorView
          onDismiss={this.onErrorDismiss.bind(this)}
          error={error}
        />
      </React.Fragment>
    );
  }
};

export default Main;