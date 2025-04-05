import express from 'express';
import cors from 'cors';
import bookRouter from './routes/bookRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import userRouter from './routes/userRouter.js';
import ratingRouter from './routes/ratingRouter.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/ratings', ratingRouter);

export default app;
