import React from 'react';
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
  
  render() {
    return (
      <React.Fragment>
        <QRForm
          onError={this.onFormError.bind(this)}
          onComplete={this.onFormComplete.bind(this)}
        />
        <QRCode
          onDismiss={this.onQRDismiss.bind(this)}
          payload={this.state.qrData}
        />
        <ErrorView
          onDismiss={this.onErrorDismiss.bind(this)}
          error={this.state.error}
        />
      </React.Fragment>
    );
  }
};

export default Main;