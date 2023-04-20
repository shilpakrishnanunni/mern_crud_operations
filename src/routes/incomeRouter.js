import express from 'express';
const router = express.Router()
import incomeController from "../controllers/incomeController.js";

router.post("/insert",incomeController.insertIncome)
router.get("/display",incomeController.displayIncome)
// router.post('/create',createOperations)
export default router;
