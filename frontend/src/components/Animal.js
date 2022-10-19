import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { detailsAnimal, createReview } from '../actions/animalActions';
import { ANIMAL_REVIEW_CREATE_RESET } from '../constants/animalConstants';
import { Navigate } from '../../node_modules/react-router-dom/index';

export default function Animal(props) {
  const { animal } = props;
  const navigate = useNavigate();
  const addToCartHandler = async (item) => {
    navigate(`/cart/${animal._id}`);
  };
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const params = useParams();
  // const { id: animalId } = params;
  // const [qty, setQty] = useState(1);
  // const animalDetails = useSelector((state) => state.animalDetails);
  // const { loading, error, animal } = animalDetails;

  // const userSignin = useSelector((state) => state.userSignin);
  // const { userInfo } = userSignin;

  // const animalReviewCreate = useSelector((state) => state.animalReviewCreate);
  // const {
  //   loading: loadingReviewCreate,
  //   error: errorReviewCreate,
  //   success: successReviewCreate,
  // } = animalReviewCreate;

  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState('');
  // useEffect(() => {
  //   if (successReviewCreate) {
  //     window.alert('Review Submitted Successfully');
  //     setRating('');
  //     setComment('');
  //     dispatch({ type: ANIMAL_REVIEW_CREATE_RESET });
  //   }
  //   dispatch(detailsAnimal(animalId));
  // }, [dispatch, animalId, successReviewCreate]);
  // const addToCartHandler = () => {
  //   navigate(`/cart/${animalId}?qty=${qty}`);
  // };
  
  return (
    <Card>
      <Link to={`/animal/${animal._id}`}>
        <img src={animal.image} className="card-img-top" alt={animal.name} />
      </Link>
      <Card.Body>
        <Link to={`/animal/${animal._id}`}>
          <Card.Title>{animal.name}</Card.Title>
        </Link>
        <Rating rating={animal.rating} numReviews={animal.numReviews} />
        <Card.Text>${animal.price}</Card.Text>
        <div>
          <Link to={`/seller/${animal.seller._id}`}>
            {animal.seller.seller.name}
          </Link>
        </div>
        {animal.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(animal)}>Add to list</Button>
        )}
      </Card.Body>
    </Card>
  );
}