import express from 'express';
const router = express.Router()
import budgetController from "../controllers/budgetController.js";

// router.get("/display",budgetController.displayGraph)
router.get("/main",budgetController.mainPage)

export default router;