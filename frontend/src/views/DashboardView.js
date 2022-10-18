import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-google-charts';
import { summaryAdopt } from '../actions/adoptActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

export default function DashboardView() {
  const adoptSummary = useSelector((state) => state.adoptSummary);
  const { loading, summary, error } = adoptSummary;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryAdopt());
  }, [dispatch]);
  return (
    <div>
      <div className="roww">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <ul className="roww summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users" /> Users
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart" /> Adopts
                </span>
              </div>
              <div className="summary-body">
                {summary.adopts[0] ? summary.adopts[0].numAdopts : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money" /> Sales
                </span>
              </div>
              <div className="summary-body">
                $
                {summary.adopts[0]
                  ? summary.adopts[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          <Row>
            <Col md={7}>
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
            </Col>

            <Col md={5}>
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
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}