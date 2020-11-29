import './App.css';
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainToDo from './components/todo/ToDoPage';
import Login from './components/user/Login';
import SignUp from './components/user/SignUp'

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <section>
            <Switch>
              <Route path='/signup' component={SignUp} exact />
              <Route path='/login' component={Login} exact />
              <Route path='/' component={MainToDo} exact />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
