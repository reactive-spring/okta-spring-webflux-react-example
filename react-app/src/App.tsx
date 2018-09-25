import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import ProfileList from './ProfileList';
import ProfileListEventSource from './ProfileListEventSource';
import ProfileListInterval from './ProfileListInterval';
import ProfileListRxJS from './ProfileListRxJS';
import ProfileListSocketIO from './ProfileListSocketIO';
import ProfileListWebSocket from './ProfileListWebSocket';

const config = {
  issuer: 'https://dev-737523.oktapreview.com/oauth2/default',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oagbqbpk4qmJDpaS0h7'
};

export interface Auth {
  login(redirectUri: string): {};
  logout(redirectUri: string): {};
  isAuthenticated(): boolean;
  getAccessToken(): string;
}

class App extends React.Component {
  render() {
    return (
      <Router>
        <Security {...config}>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/profiles" exact={true} component={ProfileList}/>
          <Route path="/profiles/interval" exact={true} component={ProfileListInterval}/>
          <Route path="/profiles/eventsource" exact={true} component={ProfileListEventSource}/>
          <Route path="/profiles/rxjs" exact={true} component={ProfileListRxJS}/>
          <Route path="/profiles/socketio" exact={true} component={ProfileListSocketIO}/>
          <Route path="/profiles/ws" exact={true} component={ProfileListWebSocket}/>
          <Route path="/implicit/callback" component={ImplicitCallback}/>
        </Security>
      </Router>
    );
  }
}

export default App;
