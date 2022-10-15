import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAdopt } from '../actions/adoptActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ADOPT_CREATE_RESET } from '../constants/adoptConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function FinishAdoptionView(props) {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        navigate('/payment');
    }
    const adoptCreate = useSelector((state) => state.adoptCreate);
    const { loading, success, error, adopt } = adoptCreate;
    const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const finishAdoptionHandler = () => {
        dispatch(createAdopt({ ...cart, adoptItems: cart.cartItems }));
    };
    useEffect(() => {
        if (success) {
            navigate(`/adopt/${adopt._id}`);
            dispatch({ type: ADOPT_CREATE_RESET });
        }
    }, [dispatch, adopt, navigate, success]);
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <h1 className="my-3">Preview Adopt</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Shipping</Card.Title>
                            <Card.Text>
                                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                <strong>Address: </strong> {cart.shippingAddress.address},
                                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                ,{cart.shippingAddress.country}
                            </Card.Text>
                            <Link to="/shipping">
                                <Button variant="info" type="button">
                                    Edit
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Payment</Card.Title>
                            <Card.Text>
                                <strong>Method:</strong> {cart.paymentMethod}
                            </Card.Text>
                            <Link to="/payment">
                                <Button variant="info" type="button">
                                    Edit
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>Items</Card.Title>
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item) => (
                                    <ListGroup.Item key={item.animal}>
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="img-fluid rounded img-thumbnail"
                                                ></img>{" "}

                                                <Link to={`/animal/${item.animal}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={3}>

                                                <span>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Link to="/cart">
                                <Button variant="info" type="button">
                                    Edit
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Summary</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice.toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <strong> Order Total</strong>
                                        </Col>
                                        <Col>
                                            <strong>${cart.totalPrice.toFixed(2)}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button
                                            type="button"
                                            onClick={finishAdoptionHandler}
                                            className="primary block"
                                            disabled={cart.cartItems.length === 0}
                                        >
                                            FinishAdoption
                                        </Button>
                                    </div>
                                    {loading && <LoadingBox></LoadingBox>}
                                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}