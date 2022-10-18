import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsAnimal, updateAnimal } from '../actions/animalActions';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ANIMAL_UPDATE_RESET } from '../constants/animalConstants';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

export default function AnimalEditView(props) {
    const navigate = useNavigate();
    const params = useParams();
    const { id: animalId } = params;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDescription] = useState('');

    const animalDetails = useSelector((state) => state.animalDetails);
    const { loading, error, animal } = animalDetails;
    const animalUpdate = useSelector((state) => state.animalUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = animalUpdate;
    const dispatch = useDispatch();
    useEffect(() => {
        if (successUpdate) {
            navigate('/animallist');
        }
        if (!animal || animal._id !== animalId || successUpdate) {
            dispatch({ type: ANIMAL_UPDATE_RESET });
            dispatch(detailsAnimal(animalId));
        } else {
            setName(animal.name);
            setPrice(animal.price);
            setImage(animal.image);
            setCategory(animal.category);
            setCountInStock(animal.countInStock);
            setDescription(animal.description);
        }
    }, [animal, dispatch, animalId, successUpdate, navigate]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateAnimal({
                _id: animalId,
                name,
                price,
                image,
                category,
                countInStock,
                description,
            })
        );
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <Container className="small-container">
            <h1>Edit Animal {name}</h1>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <Form onSubmit={submitHandler} className="formm">
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="imageFile">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control type="file" onChange={uploadFileHandler} />
                        {loadingUpload && <LoadingBox></LoadingBox>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="countInStock">
                        <Form.Label>Count In Stock</Form.Label>
                        <Form.Control
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="mb-3">
                        <Button className="primary" type="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            )}
        </Container>
    );
}