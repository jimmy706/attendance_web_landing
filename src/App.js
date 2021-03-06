import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import IndexPage from "./views/Index";
import "./styles/index.scss";
import HomePage from "./views/Home";
import dayjs from 'dayjs';
import RegisterPage from "./views/Register";
import { useSelector, connect } from 'react-redux';
import { loginAndFetchProfile } from "./redux/actions/user.action";
import 'react-placeholder/lib/reactPlaceholder.css';

function PrivateRoute({ component: Component, ...rest }) {
  const userState = useSelector(state => state.userState);
  return (
    <Route
      {...rest}
      render={(props) => userState.isLogin
        ? <Component {...props} />
        : <Redirect to={{ pathname: `/?redir=${encodeURI(rest.path)}`, state: { from: props.location } }} />}
    />
  )
}

class App extends React.Component {
  componentDidMount() {
    const accessToken = JSON.parse(localStorage.getItem('access'));
    if (accessToken) {
      const isExpired = !dayjs().isBefore(dayjs(accessToken.expire));
      if (!isExpired) {
        this.props.dispatchLoginAction(accessToken.data);
      }
    }
  }

  render() {
    const { userState } = this.props;

    return (
      <Router>
        <Switch>

          <PrivateRoute path="/home" component={HomePage} />
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/" >
            {userState.isLogin ? <Redirect to="/home" /> : <IndexPage />}
          </Route>
        </Switch>
      </Router>
    )
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userState
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoginAction: (token) => dispatch(loginAndFetchProfile(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
