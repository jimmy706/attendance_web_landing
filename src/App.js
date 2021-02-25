import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import IndexPage from "./views/Index";
import "./styles/index.scss";
import HomePage from "./views/Home";
import dayjs from 'dayjs';

class App extends React.Component {
  componentDidMount() {
    const accessToken = JSON.parse(localStorage.getItem('access'));
    if (accessToken) {
      console.log(dayjs().isBefore(dayjs(accessToken.expire)));
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <IndexPage />
          </Route>
          <Route path="/home" >
            <HomePage />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App;
