import { Router } from "express";
import AdminRouter from "./admin.router"

const router = Router()
router.use("/api/admin", AdminRouter)

export default router