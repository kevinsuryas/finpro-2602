import express, { Router } from "express";
import * as SampleController from "../controllers/sample.controller"

const router: Router = express.Router()

router.get("/", SampleController.sample)

export default router