import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

export default function SearchBox(props) {
    const navigate = useNavigate();
  const [name, setName] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/name/${name}`);
  };
  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup id="box">
                <FormControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="search products..."
                    aria-label="Search Products"
                    aria-describedby="button-search"
                ></FormControl>
                <Button variant="outline-primary" type="submit" id="button-search">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
  );
}