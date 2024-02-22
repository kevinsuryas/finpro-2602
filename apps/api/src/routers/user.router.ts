import { Router } from "express";

// Define Variable
const router = Router()

// Import user Controller
import * as userController from '../controllers/user.controller';

router.post('/register', userController.register)
router.post('/verification', userController.verification)
router.post('/login', userController.login)



export default router