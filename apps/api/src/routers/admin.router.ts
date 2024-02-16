import express, { Router } from "express";
import * as AdminController from "../controllers/admin.controller"

const router: Router = express.Router()

router.post("/login", AdminController.loginAdmin)

export default router