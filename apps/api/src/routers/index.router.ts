import express, { Router } from "express";
import AdminRouter from "./admin.router"
import UserRouter from "./user.router"

const router = Router()
router.use("*/image", express.static("public/image"))
router.use("/api/admin", AdminRouter)
router.use('/api/user', UserRouter)


export default router