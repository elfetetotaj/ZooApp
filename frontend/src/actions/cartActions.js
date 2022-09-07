import Axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const addToCart = (animalId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/animals/${animalId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      animal: data._id,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (animalId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: animalId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};