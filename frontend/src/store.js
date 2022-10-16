import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { animalListReducer, animalDetailsReducer, animalCreateReducer, animalUpdateReducer, animalDeleteReducer, animalReviewCreateReducer, animalCategoryListReducer } from './reducers/animalReducers';
import { userSigninReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer, userAddressMapReducer } from './reducers/userReducers';
import {
  adoptCreateReducer,
  adoptDeleteReducer,
  adoptDeliverReducer,
  adoptDetailsReducer,
  adoptListReducer,
  adoptMineListReducer,
  adoptPayReducer,
  adoptSummaryReducer
} from './reducers/adoptReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
  },
};

const reducer = combineReducers({
  animalList: animalListReducer,
  animalDetails: animalDetailsReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  adoptCreate: adoptCreateReducer,
  adoptDetails: adoptDetailsReducer,
  adoptPay: adoptPayReducer,
  adoptMineList: adoptMineListReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  animalCreate: animalCreateReducer,
  animalUpdate: animalUpdateReducer,
  animalDelete: animalDeleteReducer,
  adoptList: adoptListReducer,
  adoptDelete: adoptDeleteReducer,
  adoptDeliver: adoptDeliverReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  animalReviewCreate: animalReviewCreateReducer,
  userAddressMap: userAddressMapReducer,
  adoptSummary: adoptSummaryReducer,
  animalCategoryList: animalCategoryListReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;