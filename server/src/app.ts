import express from 'express';
import cors from 'cors';
import bookRouter from './routes/bookRouter.ts';
import categoryRouter from './routes/categoryRouter.ts';
import userRouter from './routes/userRouter.ts';
import ratingRouter from './routes/ratingRouter.ts';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);
app.use('/ratings', ratingRouter);

export default app;
