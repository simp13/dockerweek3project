import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Recognize from './components/Recognize';

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to Face Recognition System</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Recognize</Link></li>
            <li><Link to={'/Register'} className="nav-link">Register</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Recognize} />
              <Route path='/Register' component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;