import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ADOPT_CREATE_FAIL,
  ADOPT_CREATE_REQUEST,
  ADOPT_CREATE_SUCCESS,
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