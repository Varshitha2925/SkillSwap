import express from 'express';
import {addSkill, getSkill,searchskills} from '../controllers/skillController'

const router = express.Router();

router.post('/addSkill', addSkill);
router.get('/getSkill', getSkill);
router.get('/searchskills', searchskills);



export default router;