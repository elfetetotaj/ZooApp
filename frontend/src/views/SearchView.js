import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { listAnimals } from '../actions/animalActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Animal from '../components/Animal';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

export default function SearchView(props) {
  const navigate = useNavigate();
  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    adopt = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const animalList = useSelector((state) => state.animalList);
  const { loading, error, animals, page, pages } = animalList;
  const animalCategoryList = useSelector((state) => state.animalCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = animalCategoryList;
  useEffect(() => {
    dispatch(listAnimals({
      pageNumber,
      name: name !== 'all' ? name : '',
      category: category !== 'all' ? category : '',
      min,
      max,
      rating,
      adopt,
    }));
  }, [dispatch, name, category, max, min, adopt, rating, pageNumber]);
  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortAdopt = filter.adopt || adopt;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/adopt/${sortAdopt}`;
  };
  return (
    <div>
      <h2>Animals</h2>
      <Row>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{animals.length} Results</div>
        )}
        <Col md={3}>
          <h4>Category</h4>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h4>Price</h4>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Avg. Customer Review</h4>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Row className="justify-content-between mb-3">
                {/* <Col md={6}>
                            <div>
                                {countProducts === 0 ? 'No' : countProducts} Results
                                {query !== 'all' && ' : ' + query}
                                {category !== 'all' && ' : ' + category}
                                {price !== 'all' && ' : Price ' + price}
                                {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                {query !== 'all' ||
                                    category !== 'all' ||
                                    rating !== 'all' ||
                                    price !== 'all' ? (
                                    <Button
                                        variant="light"
                                        onClick={() => navigate('/search')}
                                    >
                                        <i className="fas fa-times-circle"></i>
                                    </Button>
                                ) : null}
                            </div>
                        </Col> */}
                <Col className="text-end">
                  Sort by{' '}
                  <select
                    value={adopt}
                    onChange={(e) => {
                      navigate(getFilterUrl({ adopt: e.target.value }));
                    }}
                  >
                    <option value="newest">Newest Arrivals</option>
                    <option value="lowest">Price: Low to High</option>
                    <option value="highest">Price: High to Low</option>
                    <option value="toprated">Avg. Customer Reviews</option>
                  </select>
                </Col>
              </Row>
              {animals.length === 0 && (
                <MessageBox>No Animal Found</MessageBox>
              )}

              <Row>
                {animals.map((animal) => (
                  <Col sm={6} lg={4} className="mb-3" key={animal._id}>
                    <Animal key={animal._id} animal={animal}></Animal>
                  </Col>
                ))}
              </Row>
              <div className="pagination">
                {[...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? 'active' : ''}
                    key={x + 1}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}