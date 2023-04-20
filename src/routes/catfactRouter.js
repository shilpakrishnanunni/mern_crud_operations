import express from 'express';
const router = express.Router()
import catfactController from "../controllers/catfactController.js";

router.get("/find",catfactController.findOperations)
// router.post('/create',createOperations)
export default router;
