import React, { useEffect } from 'react';
import Animal from '../components/Animal';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listAnimals } from '../actions/animalActions';

export default function HomeView() {
    const dispatch = useDispatch();
    const animalList = useSelector((state) => state.animalList);
    const { loading, error, animals } = animalList;

    useEffect(() => {
        dispatch(listAnimals({}));
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {animals.map((animal) => (
                        <Animal key={animal._id} animal={animal}></Animal>
                    ))}
                </div>
            )}
        </div>
    );
}