import React from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';

class Share extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header>Generá tu código de pagosQR</Header>
        <Footer/>
      </React.Fragment>
    );
  }
};

export default Share;