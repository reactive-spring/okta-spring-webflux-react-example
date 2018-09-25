import * as React from 'react';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { Auth } from './App';

import logo from './logo.svg';
import { NavLink } from 'react-router-dom';

interface HomeProps {
  auth: Auth;
}

interface HomeState {
  authenticated: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {authenticated: false};
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({authenticated});
    }
  }

  async componentDidMount() {
    await this.checkAuthentication();
  }

  async componentDidUpdate() {
    await this.checkAuthentication();
  }

  async login() {
    this.props.auth.login('/')
  }

  async logout() {
    this.props.auth.logout('/');
  }

  render() {
    const {authenticated} = this.state;
    let body = null;
    if (authenticated) {
      body = (
        <div className="Buttons">
          <button onClick={this.logout}>Logout</button>
          <p>
            <NavLink to="/profiles" activeClassName="active">Profile List</NavLink>&nbsp;|&nbsp;
            <NavLink to="/profiles/interval" activeClassName="active">Interval</NavLink>&nbsp;|&nbsp;
            <NavLink to="/profiles/eventsource" activeClassName="active">EventSource</NavLink>&nbsp;|&nbsp;
            <NavLink to="/profiles/rxjs" activeClassName="active">RxJS</NavLink>&nbsp;|&nbsp;
            <NavLink to="/profiles/ws" activeClassName="active">WebSockets</NavLink>
            {/*<a href="/profiles/rsocket">Profile List with RSocket</a><br/>
            <a href="/profiles/socketio">Profile List with SocketIO</a><br/>*/}
          </p>
        </div>
      );
    } else {
      body = (
        <div className="Buttons">
          <button onClick={this.login}>Login</button>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {body}
      </div>
    );
  }
}

export default withAuth(Home);