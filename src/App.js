import React from 'react';
import './bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './routes/PrivateRoute';
import { history } from './helpers/history';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/exams" component={Home} />
          <Route path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
