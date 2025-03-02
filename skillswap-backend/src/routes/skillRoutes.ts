import express from 'express';
import {addSkill, getSkill} from '../controllers/skillController'

const router = express.Router();

router.post('/addSkill', addSkill);
router.get('/getSkill', getSkill);

export default router;