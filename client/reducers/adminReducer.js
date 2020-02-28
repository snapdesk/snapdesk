import * as types from '../constants/actionTypes';

const adminState = {
  orgTickets: [],
  orgUsers: [1, 2, 3, 4],
  orgId: 0,
  orgName: '',
  isValidated: false
};

const adminReducer = (state = adminState, action) => {
  //need to figure out what is coming back on the action.payload
  switch (action.type) {
    case types.GET_MENTORS:
      return {
        ...state,
        orgUsers: action.payload.users
      };

    case types.ORG_VALIDATE:
      return {
        ...state,
        isValidated: true
      };

    default:
      return state;
  }
};

export default adminReducer;
