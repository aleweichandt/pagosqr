import React from 'react';
import Header from '../component/Header';
import PrivacyPolicy from '../component/PrivacyPolicy';
import Footer from '../component/Footer';

class PrivacyPolicyScreen extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Header>Políticas de Privacidad</Header>
        <PrivacyPolicy/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default PrivacyPolicyScreen;