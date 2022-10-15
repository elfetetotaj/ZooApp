import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { listAdoptMine } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";

export default function AdoptionHistoryView(props) {
  const navigate = useNavigate();
  const adoptMineList = useSelector((state) => state.adoptMineList);
  const { loading, error, adopts, pages } = adoptMineList;

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAdoptMine());
  }, [dispatch]);
  return (
    <div>
      <h1>Adopt History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table className="table" striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {adopts?.map((adopt) => (
                <tr key={adopt._id}>
                  <td>{adopt._id}</td>
                  <td>{adopt.createdAt.substring(0, 10)}</td>
                  <td>{adopt.totalPrice.toFixed(2)}</td>
                  <td>{adopt.isPaid ? adopt.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {adopt.isDelivered
                      ? adopt.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="info"
                      className="small"
                      onClick={() => {
                        navigate(`/adopt/${adopt._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
                key={x + 1}
                to={`/adopthistory?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}