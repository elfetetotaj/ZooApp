const {
  ANIMAL_LIST_REQUEST,
  ANIMAL_LIST_SUCCESS,
  ANIMAL_LIST_FAIL,
} = require('../constants/animalConstants');

export const animalListReducer = (
  state = { loading: true, animals: [] },
  action
) => {
  switch (action.type) {
    case ANIMAL_LIST_REQUEST:
      return { loading: true };
    case ANIMAL_LIST_SUCCESS:
      return { loading: false, animals: action.payload };
    case ANIMAL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};