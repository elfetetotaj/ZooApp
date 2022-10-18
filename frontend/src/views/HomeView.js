import React, { useEffect } from 'react';
import Animal from '../components/Animal';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listAnimals } from '../actions/animalActions';
import Row from 'react-bootstrap/Row';
import Col from "react-bootstrap/Col";

export default function HomeView() {
    const dispatch = useDispatch();
    const animalList = useSelector((state) => state.animalList);
    const { loading, error, animals } = animalList;

    useEffect(() => {
        dispatch(listAnimals({}));
    }, [dispatch]);
    return (
        <div>
            <h2>Animals</h2>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                    {animals.length === 0 && <MessageBox>No Animal Found</MessageBox>}
                    <Row>
                        {animals.map((animal) => (
                            <Col key={animal.name} sm={5} md={3} lg={3} className="mb-3">
                                <Animal key={animal._id} animal={animal}></Animal>
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
}