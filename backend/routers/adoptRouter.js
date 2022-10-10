import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Adopt from '../models/adoptModel.js';
import { isAuth, isAdmin } from '../utils.js';

const adoptRouter = express.Router();

adoptRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adopts = await Adopt.find({}).populate('user', 'name');
    res.send(adopts);
  })
);

adoptRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const adopts = await Adopt.find({ user: req.user._id });
    res.send(adopts);
  })
);

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
        .send({ message: 'New Adoption', adopt: createdAdopt });
    }
  })
);

adoptRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const adopt = await Adopt.findById(req.params.id);
    if (adopt) {
      res.send(adopt);
    } else {
      res.status(404).send({ message: 'Adopt Not Found' });
    }
  })
);

adoptRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const adopt = await Adopt.findById(req.params.id);
    if (adopt) {
      adopt.isPaid = true;
      adopt.paidAt = Date.now();
      adopt.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedAdopt = await adopt.save();
      res.send({ message: 'Adopt Paid', adopt: updatedAdopt });
    } else {
      res.status(404).send({ message: 'Adoption Not Found' });
    }
  })
);
adoptRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adopt = await Adopt.findById(req.params.id);
    if (adopt) {
      const deleteAdopt = await adopt.remove();
      res.send({ message: 'Adopt Deleted', adopt: deleteAdopt });
    } else {
      res.status(404).send({ message: 'Adopt Not Found' });
    }
  })
);

adoptRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adopt = await Adopt.findById(req.params.id);
    if (adopt) {
      adopt.isDelivered = true;
      adopt.deliveredAt = Date.now();

      const updatedAdopt = await adopt.save();
      res.send({ message: 'Adopt Delivered', adopt: updatedAdopt });
    } else {
      res.status(404).send({ message: 'Adopt Not Found' });
    }
  })
);

export default adoptRouter;