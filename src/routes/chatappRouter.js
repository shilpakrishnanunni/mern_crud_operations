import express from 'express';
const router = express.Router();
import chatappController from "../controllers/chatappController.js";


router.get('/main',chatappController.mainPage)

export default router;