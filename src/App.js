import React from 'react';
import './bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import LecturerView from './components/LecturerView';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { connect } from 'react-redux';
import { history } from './helpers/history';
import { userExists } from './helpers/userExists';
import { reload } from './actions/';

function App(props) {
  if (window.performance && userExists()) {
    props.reload(window.location.pathname);
  }

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/exams" component={LecturerView} />
          <Route path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    reload: (pathname) => {
      dispatch(reload(pathname))
    }
  }
}

export default connect(null, mapDispatchToProps)(App);