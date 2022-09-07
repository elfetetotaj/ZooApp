import Axios from 'axios';
import {
  ANIMAL_DETAILS_FAIL,
  ANIMAL_DETAILS_REQUEST,
  ANIMAL_DETAILS_SUCCESS,
  ANIMAL_LIST_FAIL,
  ANIMAL_LIST_REQUEST,
  ANIMAL_LIST_SUCCESS,
} from '../constants/animalConstants';

export const listAnimals = () => async (dispatch) => {
  dispatch({
    type: ANIMAL_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/animals');
    dispatch({ type: ANIMAL_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ANIMAL_LIST_FAIL, payload: error.message });
  }
};
export const detailsAnimal = (animalId) => async (dispatch) => {
  dispatch({ type: ANIMAL_DETAILS_REQUEST, payload: animalId });
  try {
    const { data } = await Axios.get(`/api/animals/${animalId}`);
    dispatch({ type: ANIMAL_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ANIMAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};