/**
 * ************************************
 *
 * @module  ticketActions.js
 * @author team snapdesk
 * @date 02/22/2020
 * @description Action Creators for ticketReducer
 *
 * ************************************
 */

// import actionType constants
import axios from 'axios';
import * as types from '../constants/actionTypes';

export const postTicket = () => (dispatch, getState) =>
  axios
    .post('/api/tickets', {
      mentee_id: getState().user.userId,
      message: getState().tickets.messageInput,
      status: 'active',
      snaps_given: getState().tickets.messageRating
    })
    .then(({ data }) => {
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.POST_TICKET,
          payload: data
        });
      }
    });

export const getTickets = () => dispatch =>
  axios.get('/api/tickets').then(({ data }) => {
    if (!data.isLoggedIn) {
      dispatch({
        type: types.USER_LOGOUT,
        payload: data
      });
    } else {
      console.log(data.activeTickets);
      dispatch({
        type: types.GET_TICKETS,
        payload: data.activeTickets || []
      });
    }
  });

export const updateMessage = event => ({
  type: types.UPDATE_MESSAGE,
  payload: event.target.value
});

export const updateRating = event => ({
  type: types.UPDATE_RATING,
  payload: event.target.value
});

export const deleteTicket = id => (dispatch, getState) =>
  axios
    .patch('/api/tickets', {
      ticketId: id,
      status: 'deleted'
    })
    .then(({ data }) => {
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.DELETE_TICKET,
          payload: id
        });
      }
    });

// resolve ticket action type
export const resolveTicket = id => (dispatch, getState) =>
  // this should PATCH to whatever backend route resolves tickets -- URL NEED TO BE UPDATED LATER
  axios
    .patch('/api/tickets', {
      ticketId: id,
      status: 'resolved'
    })
    .then(({ data }) => {
      // Checks whether user is logged in -- prob unnecessary?
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      }
      // update our redux state so everything displays properly
      else {
        dispatch({
          type: types.RESOLVE_TICKET,
          payload: id
        });
      }
    });

export const acceptTicket = id => (dispatch, getState) =>
  // this should patch to whatever backend route accept tickets
  axios
    .patch('api/tickets', {
      ticketId: id,
      status: 'pending',
      mentor_id: getState().user.userId
    })
    .then(({ data }) => {
      console.log(getState().tickets.activeTickets, 'active tick');
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.ACCEPT_TICKET,
          payload: id
        });
      }
    });

export const cancelAccept = id => (dispatch, getState) =>
  // this should patch to whatever backend route accept tickets
  axios
    .patch('api/tickets', {
      ticketId: id,
      status: 'active',
      mentor_id: getState().user.userId
    })
    .then(({ data }) => {
      console.log(getState().tickets.activeTickets, 'active tick');
      if (!data.isLoggedIn) {
        dispatch({
          type: types.USER_LOGOUT,
          payload: data
        });
      } else {
        dispatch({
          type: types.ACCEPT_TICKET,
          payload: id
        });
      }
    });
