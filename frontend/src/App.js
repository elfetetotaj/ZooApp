import React from 'react';
import data from './data';
function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            ZooLife
          </a>
        </div>
        <div>
          <a href="/signup">Signup</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {data.animals.map((animal) => (
              <div key={animal._id} className="card">
                <a href={`/animal/${animal._id}`}>
                  <img
                    className="medium"
                    src={animal.image}
                    alt={animal.name}
                  />
                </a>
                <div className="card-body">
                  <a href={`/animal/${animal._id}`}>
                    <h2>{animal.name}</h2>
                  </a>
                  <div className="rating">
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                    <span>
                      <i className="fa fa-star"></i>
                    </span>
                  </div>
                  <div className="price">${animal.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;