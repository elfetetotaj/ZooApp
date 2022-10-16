import React, { useEffect, useState } from 'react';
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
import AdminRoute from './components/AdminRoute';
import AnimalListView from './views/AnimalListView';
import AnimalEditView from './views/AnimalEditView';
import AdoptListView from './views/AdoptListView';
import UserListView from './views/UserListView';
import UserEditView from './views/UserEditView';
import MapView from './views/MapView';
import DashboardView from './views/DashboardView';
import SupportView from './views/SuportView';
import ChatBox from './components/ChatBox';
import ParallaxView from './views/ParallaxView';
import HomePage from './views/HomePage';
import Container from "react-bootstrap/Container";
import SellerRoute from './components/SellerRoute';
import SellerView from './views/SellerView';
import SearchBox from './components/SearchBox';
import SearchView from './views/SearchView';
import { listAnimalCategories } from './actions/animalActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';


function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const animalCategoryList = useSelector((state) => state.animalCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = animalCategoryList;
  useEffect(() => {
    dispatch(listAnimalCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              ZooLife
            </Link>
            <div>
              <SearchBox />
            </div>
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
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/animallist/seller">Animals</Link>
                  </li>
                  <li>
                    <Link to="/adoptionlist/seller">Adopts</Link>
                  </li>
                </ul>
              </div>
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
                  <li>
                    <Link to="/support">Support</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/seller/:id" element={<SellerView />} />
              <Route path="/cart" element={<CartView />} />
              <Route path="/cart/:id" element={<CartView />} />
              <Route path="/animal/:id" element={<AnimalView />} exact />
              <Route path="/signin" element={<SignInView />} />
              <Route path="/register" element={<RegisterView />} />
              <Route path="/shipping" element={<ShippingAddressView />} />
              <Route path="/payment" element={<PaymentMethodView />} />
              <Route path="/finishAdoption" element={<FinishAdoptionView />} />
              <Route path="/adopt/:id" element={<AdoptView />} />
              <Route path="/adoptionhistory" element={<AdoptionHistoryView />} />
              <Route path="/search/name/:name?" element={<SearchView />} />
              <Route path="/search/category/:category" element={<SearchView />} />
              <Route path="/search/category/:category/name/:name" element={<SearchView />} />
              <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/adopt/:adopt" element={<SearchView />} />
              <Route path="/p" element={<ParallaxView />} />
              <Route
                path="/animallist"
                element={
                  <AdminRoute>
                    <AnimalListView />
                  </AdminRoute>
                }
              />
              <Route
                path="/animal/:id/edit"
                element={
                  <AdminRoute>
                    <AnimalEditView />
                  </AdminRoute>
                }
              />
              <Route
                path="/adoptlist"
                element={
                  <AdminRoute>
                    <AdoptListView />
                  </AdminRoute>
                }
              />
              <Route
                path="/userlist"
                element={
                  <AdminRoute>
                    <UserListView />
                  </AdminRoute>
                }
              />
              <Route
                path="/user/:id/edit"
                element={
                  <AdminRoute>
                    <UserEditView />
                  </AdminRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <AdminRoute>
                    <DashboardView />
                  </AdminRoute>
                }
              />
              <Route
                path="/support"
                element={
                  <AdminRoute>
                    <SupportView />
                  </AdminRoute>
                }
              />
              <Route
                path="/animallist/seller"
                element={
                  <SellerRoute>
                    <AnimalListView />
                  </SellerRoute>
                }
              />
              <Route
                path="/adoptionlist/seller"
                element={
                  <SellerRoute>
                    <AdoptListView />
                  </SellerRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <ProfileView />
                  </PrivateRoute>
                }
              />
              <Route
                path="/map"
                element={
                  <PrivateRoute>
                    <MapView />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
          </Routes>
        </main>
        <footer className="row center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;