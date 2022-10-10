import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ADOPT_CREATE_FAIL,
  ADOPT_CREATE_REQUEST,
  ADOPT_CREATE_SUCCESS,
  ADOPT_DETAILS_FAIL,
  ADOPT_DETAILS_REQUEST,
  ADOPT_DETAILS_SUCCESS,
  ADOPT_PAY_REQUEST,
  ADOPT_PAY_FAIL,
  ADOPT_PAY_SUCCESS,
  ADOPT_MINE_LIST_REQUEST,
  ADOPT_MINE_LIST_FAIL,
  ADOPT_MINE_LIST_SUCCESS,
  ADOPT_LIST_REQUEST,
  ADOPT_LIST_SUCCESS,
  ADOPT_LIST_FAIL,
  ADOPT_DELETE_REQUEST,
  ADOPT_DELETE_SUCCESS,
  ADOPT_DELETE_FAIL,
  ADOPT_DELIVER_REQUEST,
  ADOPT_DELIVER_SUCCESS,
  ADOPT_DELIVER_FAIL
} from '../constants/adoptConstants';

export const createAdopt = (adopt) => async (dispatch, getState) => {
  dispatch({ type: ADOPT_CREATE_REQUEST, payload: adopt });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/adopts', adopt, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ADOPT_CREATE_SUCCESS, payload: data.adopt });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ADOPT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsAdopt = (adoptId) => async (dispatch, getState) => {
  dispatch({ type: ADOPT_DETAILS_REQUEST, payload: adoptId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get(`/api/adopts/${adoptId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADOPT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_DETAILS_FAIL, payload: message });
  }
};

export const payAdopt = (adopt, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ADOPT_PAY_REQUEST, payload: { adopt, paymentResult } });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(`/api/adopts/${adopt._id}/pay`, paymentResult, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADOPT_PAY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_PAY_FAIL, payload: message });
  }
};

export const listAdoptMine = () => async (dispatch, getState) => {
  dispatch({ type: ADOPT_MINE_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/adopts/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ADOPT_MINE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_MINE_LIST_FAIL, payload: message });
  }
};

export const listAdopts = () => async (dispatch, getState) => {
  dispatch({ type: ADOPT_LIST_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.get('/api/adopts', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    console.log(data);
    dispatch({ type: ADOPT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_LIST_FAIL, payload: message });
  }
};

export const deleteAdopt = (adoptId) => async (dispatch, getState) => {
  dispatch({ type: ADOPT_DELETE_REQUEST, payload: adoptId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.delete(`/api/adopts/${adoptId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: ADOPT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_DELETE_FAIL, payload: message });
  }
};

export const deliverAdopt = (adoptId) => async (dispatch, getState) => {
  dispatch({ type: ADOPT_DELIVER_REQUEST, payload: adoptId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = Axios.put(
      `/api/adopts/${adoptId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: ADOPT_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ADOPT_DELIVER_FAIL, payload: message });
  }
};