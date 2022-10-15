import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { createAnimal, listAnimals, deleteAnimal } from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ANIMAL_CREATE_RESET,
  ANIMAL_DELETE_RESET
} from '../constants/animalConstants';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

export default function AnimalListView(props) {
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
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
  const animalDelete = useSelector((state) => state.animalDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = animalDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: ANIMAL_CREATE_RESET });
      navigate(`/animal/${createdAnimal._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: ANIMAL_DELETE_RESET });
    }
    dispatch(listAnimals ({ 
      seller: sellerMode ? userInfo._id : '' }));
  }, [
    createdAnimal, 
    dispatch, 
    navigate, 
    successCreate, 
    successDelete,
    sellerMode,
    userInfo._id
  ]);
  const deleteHandler = (animal) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteAnimal(animal._id));
    }
  };
  const createHandler = () => {
    dispatch(createAnimal());
  };
  return (
    <div>
      <Row>
        <Col>
          <h1>Animals</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" variant="success" onClick={createHandler}>
              Create Animal
            </Button>
          </div>
        </Col>
      </Row>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Animal Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <Table striped bordered hover className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>image</th>
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
                <td>{animal.image}</td>
                <td>
                  <Button
                    type="button"
                    className="small"
                    variant="info"
                    onClick={() =>
                      navigate(`/animal/${animal._id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                  &nbsp;
                    <Button
                    type="button"
                    variant="danger"
                    className="small"
                    onClick={() => deleteHandler(animal)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </>
      )}
    </div>
  );
}