/**
 * ************************************
 *
 * @module  App.jsx
 * @author
 * @date
 * @description
 *
 * ************************************
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Wrapper from './containers/Wrapper';
import AdminDashboard from './components/admin/AdminDashboard';
import OrgCheck from './components/OrgCheck';
import MainRoom from './components/mainRoom/MainRoom';

const mapStateToProps = ({ user: { isLoggedIn } }) => ({
  isLoggedIn
});

const mapDispatchToProps = dispatch => ({});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // conditional rendering of login button
    const { isLoggedIn, isValidated } = this.props;
    if (!isLoggedIn) {
      return (
        <>
          <LoginPage />
        </>
      );
    }
    // THIS WILL BE MANDATORY TO MAKE THE ORGANIZATION PAGE RENDER!!
    // if (!isValidated) {
    //   return (
    //     <>
    //       <OrgCheck />
    //     </>
    //   );
    // }

    // if we ARE logged in, return our Wrapper component
    return (
      <div id="mainBackground">
        {/* <Wrapper /> */}
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Wrapper} />
            <Route path="/orgcheck" {...this.props} component={OrgCheck} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/mainroom" component={MainRoom} />
            {/* <Route path="/signout" exact component={Signout} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
