import React from 'react';
import logo from './logo.svg';
import './App.css';
import apiCall from './api';
import QRCode from './QRCode';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {qrData: ''};
  }
  componentDidMount() {
    apiCall('https://pagosqr-web.firebaseapp.com/test').then((res) => {
      console.log(res.response);
      this.setState({qrData: res.response});
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className='qrcode-container'>
          <QRCode payload={this.state.qrData} />
        </div>
      </div>
    );
  }
}

export default App;
