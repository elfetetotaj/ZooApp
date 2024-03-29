import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsAdopt, payAdopt, deliverAdopt } from '../actions/adoptActions';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  ADOPT_PAY_RESET,
  ADOPT_DELIVER_RESET,
} from '../constants/adoptConstants';

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
      dispatch({ type: ADOPT_DELIVER_RESET});
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
      <h1>Adopt {adopt._id}</h1>
      <Row>
      <Col md={8}>
          <ul>
            <li>
              <div className="cardd cardd-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {adopt.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {adopt.shippingAddress.address},
                  {adopt.shippingAddress.city},{' '}
                  {adopt.shippingAddress.postalCode},
                  {adopt.shippingAddress.country}
                </p>
                {adopt.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {adopt.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="cardd cardd-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {adopt.paymentMethod}
                </p>
                {adopt.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {adopt.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="cardd cardd-body">
                <h2>Adopt Items</h2>
                <ul>
                  {adopt.adoptItems.map((item) => (
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
                  <div>${adopt.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="roww">
                  <div>Shipping</div>
                  <div>${adopt.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="roww">
                  <div>Tax</div>
                  <div>${adopt.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="roww">
                  <div>
                    <strong> Total</strong>
                  </div>
                  <div>
                    <strong>${adopt.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {!adopt.isPaid && (
                <li>
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
                </li>
              )}
               {userInfo.isAdmin && adopt.isPaid && !adopt.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Adopt
                  </button>
                </li>
              )}
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
}