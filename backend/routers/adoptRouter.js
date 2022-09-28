import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Adopt from '../models/adoptModel.js';
import { isAuth } from '../utils.js';

const adoptRouter = express.Router();

adoptRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.adoptItems.length === 0) {
      res.status(400).send({ message: 'List is empty' });
    } else {
      const adopt = new Adopt({
        adoptItems: req.body.adoptItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdAdopt = await adopt.save();
      res
        .status(201)
        .send({ message: 'New Adopt', adopt: createdAdopt });
    }
  })
);

export default adoptRouter;