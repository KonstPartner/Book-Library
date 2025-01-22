import express from 'express';
import bookRouter from './routes/bookRouter.ts';
import categoryRouter from './routes/categoryRouter.ts';
import userRouter from './routes/userRouter.ts';

const app = express();

app.use(express.json());

app.use('/books', bookRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

export default app;
