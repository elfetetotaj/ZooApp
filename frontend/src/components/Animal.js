import React from 'react';
import Rating from './Rating';

export default function Animal(props) {
  const { animal } = props;
  return (
    <div key={animal._id} className="card">
      <a href={`/animal/${animal._id}`}>
        <img className="medium" src={animal.image} alt={animal.name} />
      </a>
      <div className="card-body">
        <a href={`/animal/${animal._id}`}>
          <h2>{animal.name}</h2>
        </a>
        <Rating
          rating={animal.rating}
          numReviews={animal.numReviews}
        ></Rating>
        <div className="price">${animal.price}</div>
      </div>
    </div>
  );
}