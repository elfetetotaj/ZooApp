import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAdopts } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function AdoptListView(props) {
  const adoptList = useSelector((state) => state.adoptList);
  const { loading, error, adopts } = adoptList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAdopts());
  }, [dispatch]);
  const deleteHandler = (adopt) => {
    // TODO: delete handler
  };
  return (
    <div>
      <h1>Adopts</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {adopts.map((adopt) => (
              <tr key={adopt._id}>
                <td>{adopt._id}</td>
                <td>{adopt.user.name}</td>
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
                      props.history.push(`/adopt/${adopt._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onclick={() => deleteHandler(adopt)}
                  >
                    Delete
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