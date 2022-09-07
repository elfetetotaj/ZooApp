import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data';

export default function AnimalView(props) {
    const { id } = useParams();
  const animal = data.animals.find((x) => x._id === (id));
  if (!animal) {
    return <div> Animal Not Found</div>;
  }
  return (
    <div>
      <Link to="/">Back to result</Link>
      <div className="row top">
        <div className="col-2">
          <img className="large" src={animal.image} alt={animal.name}></img>
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
              <li>
                <button className="primary block">Add to List</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}