import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Background from './backgroundSVG/Background';
import Logo from './backgroundSVG/Logo';

import * as adminActions from '../actions/adminActions';

const mapStateToProps = state => ({
  // messageInput: state.admin.messageInput
  isValidated: state.org.isValidated
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(adminActions, dispatch);

class OrgCheck extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('propsfromorgcheck: ', this.props);
  }

  render() {
    return (
      <div className="leading-normal tracking-normal text-white gradient flex flex-col min-h-screen ">
        <div className="pt-24 flex-grow">
          <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center relative ">
            <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <Logo />
              <h1 className="my-4 text-3xl font-bold leading-tight">
                Enter your organization name to join your SnapDesk space
              </h1>
              <form
                className="mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                method="GET"
                onSubmit={e => {
                  e.preventDefault();
                  console.log(e.target);
                  let value = e.target.Organization.value;
                  this.props.orgValidate(value);
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-l font-bold mb-2"
                    htmlFor="Organization"
                  >
                    Organization
                  </label>
                  <input
                    className="mx-auto shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Organization"
                    type="text"
                    placeholder="Organization"
                    onChange={e => {
                      return false;
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="mx-auto bg-red-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    // onClick={props.orgValidate(org)}
                  >
                    Sign In
                  </button>
                  <button
                    className="mx-auto bg-red-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    // onClick={props.orgValidate(org)}
                  >
                    Join Org
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full md:w-3/5 py-6 text-center">
              <img
                className="w-full md:w-4/5 z-50"
                src="../../img/people-search.png"
              />
            </div>
          </div>
        </div>
        <Background />
      </div>
    );
  }
}

// export default OrgCheck;
export default connect(mapStateToProps, mapDispatchToProps)(OrgCheck);
