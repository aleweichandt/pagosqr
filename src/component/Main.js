import React from 'react';
import QRCode from './QRCode';
import QRForm from './QRForm';

class Main extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {qrData: undefined};
  }

  onFormComplete(data) {
    this.setState({ qrData: data.response });
  }

  onQRDismiss() {
    this.setState({ qrData: undefined });
  }
  
  render() {
    return (
      <React.Fragment>
        <QRForm
          onComplete={this.onFormComplete.bind(this)}
        />
        <QRCode
          onDismiss={this.onQRDismiss.bind(this)}
          payload={this.state.qrData}
        />
      </React.Fragment>
    );
  }
};

export default Main;