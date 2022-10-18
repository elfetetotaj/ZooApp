import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAdopts, deleteAdopt } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ADOPT_DELETE_RESET } from '../constants/adoptConstants';
import { useNavigate,useLocation } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export default function AdoptListView(props) {
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf('/seller') >= 0;
  const navigate = useNavigate();
  const adoptList = useSelector((state) => state.adoptList);
  const { loading, error, adopts } = adoptList;
  const adoptDelete = useSelector((state) => state.adoptDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = adoptDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: ADOPT_DELETE_RESET });
    }
    dispatch(listAdopts({ seller: sellerMode ? userInfo._id : '' }));
  }, [dispatch, sellerMode, userInfo._id, successDelete]);
  const deleteHandler = (adopt) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteAdopt(adopt._id));
    }
  };
  return (
    <div>
      <h1>Adopts</h1>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Adoption Deleted Successfully</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered hover className="table">
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
                  &nbsp;
                  <Button
                    type="button"
                    variant="danger"
                    className="small"
                    onClick={() => deleteHandler(adopt)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}