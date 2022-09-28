import {
    ADOPT_CREATE_FAIL,
    ADOPT_CREATE_REQUEST,
    ADOPT_CREATE_RESET,
    ADOPT_CREATE_SUCCESS,
  } from '../constants/adoptConstants';
  
  export const adoptCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADOPT_CREATE_REQUEST:
        return { loading: true };
      case ADOPT_CREATE_SUCCESS:
        return { loading: false, success: true, adopt: action.payload };
      case ADOPT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case ADOPT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };