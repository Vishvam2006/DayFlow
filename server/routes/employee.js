import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getEmployees } from '../controller/employeeController.js';

const router = express.Router();

router.get("/get",authMiddleware, getEmployees);

export default router;