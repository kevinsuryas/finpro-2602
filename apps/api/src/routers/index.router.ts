<<<<<<< Updated upstream
import { Router } from "express";
import AdminRouter from "./admin.router"
import { loginAdminValidator } from "@/libs/expressValidator";

const router = Router()
router.use("/api/admin", loginAdminValidator, AdminRouter)

export default router
=======
import express, { Router } from 'express';
import AdminRouter from './admin.router';
import UserRouter from './user.router';

const router = Router();
router.use('*/image', express.static('public/image'));
router.use('/api/admin', AdminRouter);
router.use('/api/user', UserRouter);

export default router;
>>>>>>> Stashed changes
