import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

import Theme from './Theme';
import Router from './navigation/Router';

class App extends React.PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <Router />
      </MuiThemeProvider>
    );
  }
}

export default App;
