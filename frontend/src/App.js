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
import { ToastContainer, toast } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";


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
      <div /*className="grid-containerr"*/
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'}>
        <ToastContainer position="bottom-center" limit={1} />
        <header /*className="roww"*/>
          <Navbar bg="dark" variant="dark" expand="lg">

            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>ZooLife</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav.Link href="/animals" className="nav_link" >Animals</Nav.Link>
                <Nav.Link href="/contact" className="nav_link">Contact</Nav.Link>
                <SearchBox id="searchButton" />
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    <i className="fa fa-shopping-cart" />
                    {cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/adoptionhistory">
                        <NavDropdown.Item>Adoption History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}

                  {userInfo && userInfo.isSeller && (
                    <NavDropdown title="Seller" id="admin-nav-dropdown">
                      <LinkContainer to="/animallist/seller">
                        <NavDropdown.Item>Animals</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/adoptionlist/seller">
                        <NavDropdown.Item>Adoptions</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/animallist">
                        <NavDropdown.Item>Animals</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/adoptlist">
                        <NavDropdown.Item>Adoptions</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/support">
                        <NavDropdown.Item>Support</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((category) => (
                <Nav.Item key={category}>
                  <LinkContainer
                    to={`/search/category/${category}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    <Nav.Link className="nav_link">{category}</Nav.Link>
                  </LinkContainer>
                </Nav.Item>
              ))
            )}
          </Nav>
        </div>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
          </Routes>
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
              <Route path="/animals" element={<HomeView />} />
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

        </main>
        <footer className="roww center">
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div>All right reserved</div>{' '}
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;