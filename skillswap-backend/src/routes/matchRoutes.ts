import express from 'express';
import { matchUsersBySkills } from '../controllers/matchController';

const router = express.Router();

router.get('/matches', matchUsersBySkills);

export default router;