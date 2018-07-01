import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import apiCall from './api';

import Theme from './Theme';
import Header from './component/Header';
import QRCode from './component/QRCode';
import QRForm from './component/QRForm';
import Footer from './component/Footer';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {qrData: ''};
  }
  componentDidMount() {
    apiCall('api/test')
    // apiCall('http://localhost:5000/api/test')
      .then((res) => {
        console.log(res.response);
        this.setState({qrData: res.response});
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Header>Generá tu código de pagosQR</Header>
        <QRForm/>
        <QRCode payload={this.state.qrData} title="Fernando Basello"/>
        <Footer/>
      </MuiThemeProvider>
    );
  }
}

export default App;
