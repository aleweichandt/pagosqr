import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Theme from './Theme';
import Header from './component/Header';
import Main from './component/Main';
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
        <Main/>
        <Footer/>
      </MuiThemeProvider>
    );
  }
}

export default App;
