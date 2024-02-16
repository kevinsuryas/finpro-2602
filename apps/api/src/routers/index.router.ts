import { Router } from "express";
import AdminRouter from "./admin.router"
import { loginAdminValidator } from "@/libs/expressValidator";

const router = Router()
router.use("/api/admin", loginAdminValidator, AdminRouter)

export default router