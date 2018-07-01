import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Theme from './Theme';
import Header from './component/Header';
import QRCode from './component/QRCode';
import QRForm from './component/QRForm';
import Footer from './component/Footer';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {qrData: undefined};
  }
  
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Header>Generá tu código de pagosQR</Header>
        <QRForm onComplete={(data) => {
          this.setState({qrData: data.response});
        }}/>
        {this.state.qrData ? <QRCode payload={this.state.qrData}/> : undefined }
        <Footer/>
      </MuiThemeProvider>
    );
  }
}

export default App;
