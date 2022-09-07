import React from 'react';

export default function CartView(props) {
  const animalId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : AnimalID: {animalId} Qty: {qty}
      </p>
    </div>
  );
}