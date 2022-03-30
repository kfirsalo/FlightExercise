import express from 'express';
const router = express.Router();
import getTrip from './getTrip.js'

router.get('/', async (req, res) => { 
    const contriesTrip = await getTrip();
    console.log(contriesTrip)
    return res.json(contriesTrip);
});

export default router;