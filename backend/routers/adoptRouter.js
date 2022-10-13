import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Adopt from '../models/adoptModel.js';
import { isAuth, isAdmin, isSellerOrAdmin } from '../utils.js';
import User from '../models/userModel.js';
import Animal from '../models/animalModel.js';

const adoptRouter = express.Router();

adoptRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const adopts = await Adopt.aggregate([
      {
        $group: {
          _id: null,
          numAdopts: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyAdopts = await Adopt.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          adopts: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const animalCategories = await Animal.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, adopts, dailyAdopts, animalCategories });
  })
);

adoptRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const adopts = await Adopt.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
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
        seller: req.body.orderItems[0].seller,
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