import React from 'react';
import Header from '../component/Header';
import Main from '../component/Main';
import Footer from '../component/Footer';

class Home extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header>Generá tu código de pagosQR</Header>
        <Main/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default Home;
