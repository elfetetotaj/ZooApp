import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Animal from '../models/animalModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const animalRouter = express.Router();

animalRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    const animals = await Animal.find({ 
      ...sellerFilter }).populate(
        'seller',
        'seller.name seller.logo'
      );
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
    const animal = await Animal.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews'
    );
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
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const animal = new Animal({
      name: 'sample name ' + Date.now(),
      seller: req.user._id,
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
animalRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const animalId = req.params.id;
    const animal = await Animal.findById(animalId);
    if (animal) {
      animal.name = req.body.name;
      animal.price = req.body.price;
      animal.image = req.body.image;
      animal.category = req.body.category;
      animal.countInStock = req.body.countInStock;
      animal.description = req.body.description;
      const updatedAnimal = await animal.save();
      res.send({ message: 'Animal Updated', animal: updatedAnimal });
    } else {
      res.status(404).send({ message: 'Animal Not Found' });
    }
  })
);
animalRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    if (animal) {
      const deleteAnimal = await animal.remove();
      res.send({ message: 'Animal Deleted', animal: deleteAnimal });
    } else {
      res.status(404).send({ message: 'Animal Not Found' });
    }
  })
);

animalRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const animalId = req.params.id;
    const animal = await Animal.findById(animalId);
    if (animal) {
      if (animal.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      animal.reviews.push(review);
      animal.numReviews = animal.reviews.length;
      animal.rating =
        animal.reviews.reduce((a, c) => c.rating + a, 0) /
        animal.reviews.length;
      const updatedAnimal = await animal.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedAnimal.reviews[updatedAnimal.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Animal Not Found' });
    }
  })
);

export default animalRouter;