import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom";
import HomeScreen from '../screens/Home';
import ShareScreen from '../screens/Share';
import PrivacyPolicyScreen from '../screens/PrivacyPolicy';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/share/:code" component={ShareScreen}/>
      <Route path="/privacy_policy" component={PrivacyPolicyScreen}/>
      <Route exact path="/" component={HomeScreen}/>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;