import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Animal from '../models/animalModel.js';
import { isAdmin, isAuth } from '../utils.js';

const animalRouter = express.Router();

animalRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const animals = await Animal.find({});
    res.send(animals);
  })
);

animalRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Animal.remove({});
    const createdAnimals = await Animal.insertMany(data.animals);
    res.send({ createdAnimals });
  })
);

animalRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    if (animal) {
      res.send(animal);
    } else {
      res.status(404).send({ message: 'Animal Not Found' });
    }
  })
);

animalRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const animal = new Animal({
      name: 'sample name ' + Date.now(),
      image: '../images/bear.jpg',
      price: 0,
      category: 'test',
      countInStock: 1,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const createdAnimals = await animal.save();
    res.send({ message: 'Animal Created', animal: createdAnimals });
  })
);

export default animalRouter;