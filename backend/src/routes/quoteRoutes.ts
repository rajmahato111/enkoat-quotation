import express from 'express';
import { submitQuote, getQuotes, getFilterOptions } from '../controllers/quoteController';

const router = express.Router();

router.route('/').get(getQuotes).post(submitQuote);
router.route('/filter-options').get(getFilterOptions);

export default router;