import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryAdopt } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function DashboardView() {
  const adoptSummary = useSelector((state) => state.adoptSummary);
  const { loading, summary, error } = adoptSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryAdopt());
  }, [dispatch]);
  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <div className="summary-title color1">
                      <span>
                        <i className="fa fa-users" /> Users
                      </span>
                    </div>
                  </Card.Title>
                  <div className="summary-body">{summary.users[0].numUsers ? summary.users[0].numUsers : 0}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <div className="summary-title color2">
                      <span>
                        <i className="fa fa-shopping-cart" /> Adopts
                      </span>
                    </div>
                  </Card.Title>
                  <div className="summary-body">
                    {summary.adopts[0] ? summary.adopts[0].numAdopts : 0}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <div className="summary-title color3">
                      <span>
                        <i class="	fa fa-dollar" aria-hidden="true"></i> Sales
                      </span>
                    </div>


                  </Card.Title>
                  <div className="summary-body">
                    $
                    {summary.adopts[0]
                      ? summary.adopts[0].totalSales.toFixed(2)
                      : 0}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="my-3">
            <h2>Sales</h2>
            {summary.dailydopts === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="AreaChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Date', 'Sales'],
                  ...summary.dailyAdopts.map((x) => [x._id, x.sales]),
                ]}
              ></Chart>
            )}
          </div>

          <div className="my-3">
            <h2>Categories</h2>
            {summary.animalCategories === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Chart
                width="100%"
                height="400px"
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Category', 'Animals'],
                  ...summary.animalCategories.map((x) => [x._id, x.count]),
                ]}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}