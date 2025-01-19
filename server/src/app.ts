import express from 'express';
import bookRouter from './routes/bookRouter.ts';
import categoryRouter from './routes/categoryRouter.ts';

const app = express();

app.use('/books', bookRouter);
app.use('/categories', categoryRouter);

export default app;
