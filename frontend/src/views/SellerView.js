import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAnimals } from '../actions/animalActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Animal from '../components/Animal';
import Rating from '../components/Rating';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SellerView(props) {
    const params = useParams();
    const { id: sellerId } = params;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const animalList = useSelector((state) => state.animalList);
    const {
        loading: loadingAnimals,
        error: errorAnimals,
        animals,
    } = animalList;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(sellerId));
        dispatch(listAnimals({ seller: sellerId }));
    }, [dispatch, sellerId]);
    return (
        <Row>
            <Col md={3}>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <ul className="cardd cardd-body">
                        <li>
                            <div className="roww start">
                                <div className="p-1">
                                    <img
                                        className="small"
                                        src={user.seller.logo}
                                        alt={user.seller.name}
                                    ></img>
                                </div>
                                <div className="p-1">
                                    <h1>{user.seller.name}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <Rating
                                rating={user.seller.rating}
                                numReviews={user.seller.numReviews}
                            ></Rating>
                        </li>
                        <li>{user.seller.description}</li>
                    </ul>
                )}
            </Col>
            <Col md={9} >
                {loadingAnimals ? (
                    <LoadingBox></LoadingBox>
                ) : errorAnimals ? (
                    <MessageBox variant="danger">{errorAnimals}</MessageBox>
                ) : (
                    <>
                        <Row>
                            {animals.map((animal) => (
                                <Col sm={6} lg={4} className="mb-3" key={animal._id}>
                                    <Animal key={animal._id} animal={animal}></Animal>
                                </Col>
                            ))}
                        </Row>
                    </>
                )}
            </Col>
        </Row>
    );
}