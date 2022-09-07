import React from 'react';
import Animal from '../components/Animal';
import data from '../data';

export default function HomeView() {
  return (
    <div>
      <div className="row center">
        {data.animals.map((animal) => (
          <Animal key={animal._id} animal={animal}></Animal>
        ))}
      </div>
    </div>
  );
}