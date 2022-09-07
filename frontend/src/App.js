import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeView from './views/HomeView';
import AnimalView from './views/AnimalView';
import CartView from './views/CartView';

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              ZooLife
            </a>
          </div>
          <div>
            <a href="/list">Add to list</a>
            <a href="/signin">Sign In</a>
          </div>
        </header>
        <main>
          <Routes>
          <Route path="/cart/:id" element={<CartView/>} />
          <Route path="/animal/:id" element={<AnimalView/>} />
          <Route path="/" element={<HomeView/>} exact />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;