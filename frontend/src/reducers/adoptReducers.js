import {
  ADOPT_CREATE_FAIL,
  ADOPT_CREATE_REQUEST,
  ADOPT_CREATE_RESET,
  ADOPT_CREATE_SUCCESS,
  ADOPT_DETAILS_FAIL,
  ADOPT_DETAILS_REQUEST,
  ADOPT_DETAILS_SUCCESS,
  ADOPT_PAY_FAIL,
  ADOPT_PAY_REQUEST,
  ADOPT_PAY_RESET,
  ADOPT_PAY_SUCCESS,
  ADOPT_MINE_LIST_FAIL,
  ADOPT_MINE_LIST_REQUEST,
  ADOPT_MINE_LIST_SUCCESS,
  ADOPT_LIST_REQUEST,
  ADOPT_LIST_SUCCESS,
  ADOPT_LIST_FAIL,
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

export const adoptDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ADOPT_DETAILS_REQUEST:
      return { loading: true };
    case ADOPT_DETAILS_SUCCESS:
      return { loading: false, adopt: action.payload };
    case ADOPT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adoptPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ADOPT_PAY_REQUEST:
      return { loading: true };
    case ADOPT_PAY_SUCCESS:
      return { loading: false, success: true };
    case ADOPT_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ADOPT_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const adoptMineListReducer = (state = { adopts: [] }, action) => {
  switch (action.type) {
    case ADOPT_MINE_LIST_REQUEST:
      return { loading: true };
    case ADOPT_MINE_LIST_SUCCESS:
      return { loading: false, adopts: action.payload };
    case ADOPT_MINE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adoptListReducer = (state = { adopts: [] }, action) => {
  switch (action.type) {
    case ADOPT_LIST_REQUEST:
      return { loading: true };
    case ADOPT_LIST_SUCCESS:
      return { loading: false, adopts: action.payload };
    case ADOPT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};