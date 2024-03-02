import express, { Router } from "express";
import * as AdminController from "../controllers/admin.controller"
import { handleValidator, loginAdminValidator } from "@/libs/expressValidator";

const router: Router = express.Router()

router.post("/login", loginAdminValidator, handleValidator, AdminController.loginAdmin)

export default router