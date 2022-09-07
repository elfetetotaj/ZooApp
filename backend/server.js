import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/animals/:id', (req, res) => {
  const animal = data.animals.find((x) => x._id === req.params.id);
  if (animal) {
    res.send(animal);
  } else {
    res.status(404).send({ message: 'Animal Not Found' });
  }
});

app.get('/api/animals', (req, res) => {
  res.send(data.animals);
});

app.get('/', (req, res) => {
  res.send('Server is ready');
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});