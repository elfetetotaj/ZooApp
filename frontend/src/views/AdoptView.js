import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsAdopt, payAdopt } from '../actions/adoptActions';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ADOPT_PAY_RESET } from '../constants/adoptConstants';

export default function AdoptView(props) {
  const params = useParams();
  const { id: adoptId } = params;
  const [sdkReady, setSdkReady] = useState(false);
  const adoptDetails = useSelector((state) => state.adoptDetails);
  const { adopt, loading, error } = adoptDetails;
  const adoptPay = useSelector((state) => state.adoptPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = adoptPay;
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
    if (!adopt || successPay || (adopt && adopt._id !== adoptId)) {
      dispatch({ type: ADOPT_PAY_RESET });
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
  }, [dispatch, adopt, adoptId, sdkReady, successPay]);

  const successPaymentHnadler = (paymentResult) => {
    dispatch(payAdopt(adopt, paymentResult));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Adopt {adopt._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
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
              <div className="card card-body">
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
              <div className="card card-body">
                <h2>Adopt Items</h2>
                <ul>
                  {adopt.adoptItems.map((item) => (
                    <li key={item.animal}>
                      <div className="row">
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
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${adopt.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${adopt.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${adopt.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}