import express from 'express';
import { getAllBooks } from '../controllers/bookController.ts';

const router = express.Router();

router.get('/', getAllBooks);

export default router;
