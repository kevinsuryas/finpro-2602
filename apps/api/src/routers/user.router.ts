import { Router } from "express";

// Define Variable
const router = Router()

// Import user Controller
import * as userController from '../controllers/user.controller';

router.post('/register', userController.register)


export default router