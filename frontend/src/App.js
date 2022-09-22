import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import HomeView from './views/HomeView';
import AnimalView from './views/AnimalView';
import CartView from './views/CartView';
import SignInView from './views/SignInView';
import { signout } from './actions/userActions';
import RegisterView from './views/RegisterView';
import ShippingAddressView from './views/ShippingAddressView';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              ZooLife
            </Link>
          </div>
          <div>
            <Link to="/cart">Add to list{cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartView />} />
            <Route path="/cart/:id" element={<CartView />} />
            <Route path="/animal/:id" element={<AnimalView />} />
            <Route path="/signin" element={<SignInView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/shipping" element={<ShippingAddressView />} />
            <Route path="/" element={<HomeView />} exact />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;