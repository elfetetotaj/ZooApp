import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useParams } from 'react-router-dom';
import { detailsAnimal} from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import data from '../data';

export default function AnimalView(props) {
  const dispatch = useDispatch();

  const params = useParams();
  //const {id} = useParams();
  //const animalId = data.animals.find((p) => Number(p._id) === Number(id));

  const { id: animalId } = params;
  const [qty, setQty] = useState(1);
  const animalDetails = useSelector((state) => state.animalDetails);
  const { loading, error, animal } = animalDetails;

  useEffect(() => {
    dispatch(detailsAnimal(animalId));
  }, [dispatch, animalId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${animalId}?qty=${qty}`);
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={animal.image}
                alt={animal.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{animal.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={animal.rating}
                    numReviews={animal.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${animal.price}</li>
                <li>
                  Description:
                  <p>{animal.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${animal.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {animal.countInStock > 0 ? (
                          <span className="success">Available</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {animal.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
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
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}