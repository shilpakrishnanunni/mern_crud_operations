import express from 'express';
const router = express.Router();
import userauthController from "../controllers/userauthController.js";
import auth from '../middleware/authMid.js'

router.post('/signupform',userauthController.signupForm),
router.get('/main',userauthController.signupPageMain),
router.post('/login',userauthController.login)



export default router;