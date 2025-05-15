import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import pointsCalculatorRouter from './routes/pointsCalculator.js';
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.SERVER_PORT || 8000;

const app = express();

app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_, res) => {
  res.send("server is running ....");
});

app.use('/receipts', pointsCalculatorRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).send('The receipt is invalid.');
  }
  next(err);
});

app.use((err, req, res, next)  => {
  console.error(err);
  res.status(500).json({err: 'There was an error while serving the request.'});
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
});