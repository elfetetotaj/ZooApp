import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import animalRouter from './routers/animalRouter.js'
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import adoptRouter from './routers/adoptRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('connected to db0')
}).catch(err => {
  console.log(err.message);
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/uploads', uploadRouter);
app.use('/api/animals', animalRouter);
app.use('/api/users', userRouter);
app.use('/api/adopts', adoptRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});