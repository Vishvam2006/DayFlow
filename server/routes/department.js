import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment, getDepartments, deleteDepartment, updateDepartment, getDepartmentById } from '../controller/departmentController.js';

const router = express.Router();

router.post("/add", authMiddleware, addDepartment);
router.get("/", authMiddleware, getDepartments);
router.get("/:id", authMiddleware, getDepartmentById);   // fetch one
router.put("/:id", authMiddleware, updateDepartment);    // update
router.delete("/:id", authMiddleware, deleteDepartment); // delete


export default router;