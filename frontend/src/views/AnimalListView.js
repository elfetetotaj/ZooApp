import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAnimal, listAnimals } from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ANIMAL_CREATE_RESET } from '../constants/animalConstants';

export default function AnimalListView(props) {
  const navigate = useNavigate();
  const animalList = useSelector((state) => state.animalList);
  const { loading, error, animals } = animalList;
  const animalCreate = useSelector((state) => state.animalCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    animal: createdAnimal,
  } = animalCreate;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ANIMAL_CREATE_RESET });
      navigate(`/animal/${createdAnimal._id}/edit`);
    }
    dispatch(listAnimals());
  }, [createdAnimal, dispatch, navigate, successCreate]);
  const deleteHandler = () => {
    /// TODO: dispatch delete action
  };
  const createHandler = () => {
    dispatch(createAnimal());
  };
  return (
    <div>
      <div className="row">
        <h1>Animals</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Animal
        </button>
      </div>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal._id}>
                <td>{animal._id}</td>
                <td>{animal.name}</td>
                <td>{animal.price}</td>
                <td>{animal.category}</td>
                <td>{animal.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                     navigate(`/animal/${animal._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(animal)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}