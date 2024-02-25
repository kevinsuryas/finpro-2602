import { Router } from "express";
import { loginUserValidator, registerUserValidator, forgetPasswordUserValidator, resetPasswordValidator, verificationUserValidator,handleValidator } from "@/middlewares/expressValidator";

// Define Variable
const router = Router()

// Import user Controller
import * as userController from '../controllers/user.controller';

router.post('/register', registerUserValidator, handleValidator,userController.register)
router.post('/verification', verificationUserValidator, handleValidator,userController.verification)
router.post('/login', loginUserValidator, handleValidator, userController.login)
router.post('/validateGoogle', userController.validateGoogle)
router.post('/forgetPassword', forgetPasswordUserValidator, handleValidator,userController.forgetPassword)
router.post('/resetPassword', resetPasswordValidator, handleValidator, userController.resetPassword)

export default router