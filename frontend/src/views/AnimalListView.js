import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAnimals } from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AnimalListView(props) {
  const animalList = useSelector((state) => state.animalList);
  const { loading, error, animals } = animalList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAnimals());
  }, [dispatch]);
  const deleteHandler = () => {
    /// TODO: dispatch delete action
  };
  return (
    <div>
      <h1>Animals</h1>
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
                      props.history.push(`/animal/${animal._id}/edit`)
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