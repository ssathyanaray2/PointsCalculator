import express from 'express';
import pointsCalculatorController from '../controllers/pointsCalculatorController.js';
const router = express.Router();

router
.get('/:userId/points', pointsCalculatorController.getPoints)
.post('/process', pointsCalculatorController.processReceipt);

export default router;