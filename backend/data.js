import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Elfete',
      email: 'elfete@gmail.com',
      password: bcrypt.hashSync('Test123.', 8),
      isAdmin: true,
    },
    {
      name: 'Test',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('Test123.', 8),
      isAdmin: false,
    },
  ],
    animals: [
      {
        _id: '1',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
      {
        _id: '2',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
      {
        _id: '3',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
      {
        _id: '4',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
      {
        _id: '5',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
      {
        _id: '6',
        name: 'Bear',
        category: 'Test',
        image: '/images/bear.jpg',
        price: 120,
        countInStock: 10,
        rating: 4.5,
        numReviews: 10,
        description: 'test',
      },
    ],
  };
  export default data;