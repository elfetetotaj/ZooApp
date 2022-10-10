import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listAdoptMine } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdoptionHistoryView(props) {
  const navigate = useNavigate();
  const adoptMineList = useSelector((state) => state.adoptMineList);
  const { loading, error, adopts } = adoptMineList;
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
        <table className="table">
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
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                     navigate(`/adopt/${adopt._id}`);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}