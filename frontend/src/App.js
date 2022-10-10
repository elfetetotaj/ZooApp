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
import PaymentMethodView from './views/PaymentMethodView';
import AdoptView from './views/AdoptView';
import FinishAdoptionView from './views/FinishAdoptionView';
import AdoptionHistoryView from './views/AdoptionHistoryView';
import ProfileView from './views/ProfileView';
import PrivateRoute from './components/PrivateRoute';
import AnimalListView from './views/AnimalListView';
import AnimalEditView from './views/AnimalEditView';
import AdoptListView from './views/AdoptListView';

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
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/adoptionhistory">Adoption History</Link>
                  </li>
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
             {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/animallist">Animals</Link>
                  </li>
                  <li>
                    <Link to="/adoptlist">Adopts</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/cart" element={<CartView />} />
            <Route path="/cart/:id" element={<CartView />} />
            <Route path="/animal/:id" element={<AnimalView />} exact/>
            <Route path="/signin" element={<SignInView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/shipping" element={<ShippingAddressView />} />
            <Route path="/payment" element={<PaymentMethodView />} />
            <Route path="/finishAdoption" element={<FinishAdoptionView />} />
            <Route path="/adopt/:id" element={<AdoptView />} />
            <Route path="/adoptionhistory" element={<AdoptionHistoryView />} />
            <Route path="/animallist" element={<AnimalListView />} />
            <Route path="/animal/:id/edit" element={<AnimalEditView />} />
            <Route path="/adoptlist" element={<AdoptListView />} />
            {/* <Route path="/profile" element={<ProfileView />} /> */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileView />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<HomeView />} exact />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;