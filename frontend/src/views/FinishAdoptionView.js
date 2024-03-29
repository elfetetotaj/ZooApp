import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createAdopt } from '../actions/adoptActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ADOPT_CREATE_RESET } from '../constants/adoptConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <Row>
                <Col md={8}>
                    <ul>
                        <li>
                            <div className="cardd cardd-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address: </strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                                    ,{cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="cardd cardd-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="cardd cardd-body">
                                <h2>Adopt Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
                                        <li key={item.animal}>
                                            <div className="roww">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/animal/${item.animal}`}>
                                                        {item.name}
                                                    </Link>
                                                </div>

                                                <div>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                    </Col>
                    <Col md={4}>
                    <div className="cardd cardd-body">
                        <ul>
                            <li>
                                <h2>Summary</h2>
                            </li>
                            <li>
                                <div className="roww">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="roww">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="roww">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="roww">
                                    <div>
                                        <strong>Total</strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)}</strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={finishAdoptionHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    FinishAdoption
                                </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                    </Col>
                </Row>
        </div>
    );
}