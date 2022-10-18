import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { detailsAnimal, createReview } from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { ANIMAL_REVIEW_CREATE_RESET } from '../constants/animalConstants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function AnimalView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = useParams();
  const { id: animalId } = params;
  const [qty, setQty] = useState(1);
  const animalDetails = useSelector((state) => state.animalDetails);
  const { loading, error, animal } = animalDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const animalReviewCreate = useSelector((state) => state.animalReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = animalReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: ANIMAL_REVIEW_CREATE_RESET });
    }
    dispatch(detailsAnimal(animalId));
  }, [dispatch, animalId, successReviewCreate]);
  const addToCartHandler = () => {
    navigate(`/cart/${animalId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(animalId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Link to="/animals">Back to result</Link>
              <img
                className="img-large"
                src={animal.image}
                alt={animal.name}
              ></img>
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{animal.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={animal.rating}
                    numReviews={animal.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item><strong><em>Price : ${animal.price}</em></strong></ListGroup.Item>
                <ListGroup.Item>
                  {/* <Row xs={2} md={2} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card>
                      <Button
                        className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <img variant="top" src={x} alt="product" className='img-thumbnail' />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row> */}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong><em>Description:</em></strong>
                  <p>{animal.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        Seller{' '}
                        <h2>
                          <Link to={`/seller/${animal.seller._id}`}>
                            {/* {animal.seller.seller.name} */}
                          </Link>
                        </h2>
                        <Rating
                          rating={animal.seller.seller.rating}
                          numReviews={animal.seller.seller.numReviews}
                        ></Rating>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${animal.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {animal.countInStock > 0 ? (
                            <Badge bg="success">Available</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {animal.countInStock > 0 && (
                      <ListGroup.Item>
                        {/* <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(animal.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </select> */}
                        <div className="d-grid">
                          <Button onClick={addToCartHandler} variant="primary">
                            Add to List
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>


          <div>
            <h2 id="reviews">Reviews</h2>
            {animal.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {animal.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="formm" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <Form.Group className="mb-3" controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        aria-label="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </Form.Select>
                    </Form.Group>
                    <FloatingLabel
                      controlId="floatingTextarea"
                      label="Comments"
                      className="mb-3"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FloatingLabel>
                    <div>
                      <label />
                      <Button type="submit">
                        Submit
                      </Button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}