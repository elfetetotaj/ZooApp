import Axios from 'axios';
import {
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