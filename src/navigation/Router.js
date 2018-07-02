import React from 'react';
import { 
  BrowserRouter as Router,
  Switch, Route, Redirect
} from "react-router-dom";
import HomeScreen from '../screens/Home';
import ShareScreen from '../screens/Share';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/share/:id" component={ShareScreen}/>
      <Route exact path="/" component={HomeScreen}/>
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default AppRouter;