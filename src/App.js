import React from 'react';
import './bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import LecturerView from './components/LecturerView';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { history } from './helpers/history';

function App() {
  if (window.performance) {
    if (performance.navigation.type === 1) {
      console.log("This page is reloaded");
      console.log(window.location.pathname)
    } else {
      console.log("This page is not reloaded");
    }
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

export default App;
