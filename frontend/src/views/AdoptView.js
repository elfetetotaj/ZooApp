import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsAdopt, payAdopt, deliverAdopt } from '../actions/adoptActions';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ADOPT_PAY_RESET,
  ADOPT_DELIVER_RESET,
} from '../constants/adoptConstants';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function AdoptView(props) {
  const params = useParams();
  const { id: adoptId } = params;
  const [sdkReady, setSdkReady] = useState(false);
  const adoptDetails = useSelector((state) => state.adoptDetails);
  const { adopt, loading, error } = adoptDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const adoptPay = useSelector((state) => state.adoptPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = adoptPay;
  const adoptDeliver = useSelector((state) => state.adoptDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = adoptDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !adopt ||
      successPay ||
      successDeliver ||
      (adopt && adopt._id !== adoptId)
    ) {
      dispatch({ type: ADOPT_PAY_RESET });
      dispatch({ type: ADOPT_DELIVER_RESET });
      dispatch(detailsAdopt(adoptId));
    } else {
      if (!adopt.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, adopt, adoptId, sdkReady, successPay, successDeliver]);

  const successPaymentHnadler = (paymentResult) => {
    dispatch(payAdopt(adopt, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverAdopt(adopt._id));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Adopt {adopt.name}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {adopt.shippingAddress.fullName} <br />
                <strong>Address: </strong> {adopt.shippingAddress.address},
                {adopt.shippingAddress.city},{' '}
                {adopt.shippingAddress.postalCode},
                {adopt.shippingAddress.country}
                &nbsp;
              </Card.Text>
              {adopt.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {adopt.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {adopt.paymentMethod}
              </Card.Text>
              {adopt.isPaid ? (
                <MessageBox variant="success">
                  Paid at {adopt.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {adopt.adoptItems.map((item) => (
                  <ListGroup.Item key={item.animal}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{" "}
                        <Link to={`/animal/${item.animal}`}></Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${adopt.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${adopt.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${adopt.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${adopt.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!adopt.isPaid && (
                  <ListGroup.Item>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}

                        <PayPalButton
                          amount={adopt.totalPrice}
                          onSuccess={successPaymentHnadler}
                        ></PayPalButton>
                      </>
                    )}
                  </ListGroup.Item>
                )}
                {userInfo.isAdmin && adopt.isPaid && !adopt.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    {errorDeliver && (
                      <MessageBox variant="danger">{errorDeliver}</MessageBox>
                    )}
                    <Button
                      type="button"
                      className="primary block"
                      onClick={deliverHandler}
                    >
                      Deliver Adopt
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}