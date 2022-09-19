import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Animal from '../models/animalModel.js';

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

export default animalRouter;