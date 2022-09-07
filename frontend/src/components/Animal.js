import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Animal(props) {
  const { animal } = props;
  return (
    <div key={animal._id} className="card">
      <Link to={`/animal/${animal._id}`}>
        <img className="medium" src={animal.image} alt={animal.name} />
      </Link>
      <div className="card-body">
        <Link to={`/animal/${animal._id}`}>
          <h2>{animal.name}</h2>
        </Link>
        <Rating
          rating={animal.rating}
          numReviews={animal.numReviews}
        ></Rating>
        <div className="price">${animal.price}</div>
      </div>
    </div>
  );
}