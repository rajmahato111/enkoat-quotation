import express from 'express';
import { getProjects, getProjectStats } from '../controllers/projectController';

const router = express.Router();

router.route('/').get(getProjects);
router.route('/stats').get(getProjectStats);

export default router;