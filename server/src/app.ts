import express from 'express';
import bookRouter from './routes/bookRouter.ts';

const app = express();

app.use('/books', bookRouter);

export default app;
