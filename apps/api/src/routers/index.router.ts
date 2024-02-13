import { Router } from "express";
import SampleRouter from "./sample.router"
import cors from "cors"

const router = Router()
router.use("/api/sample", SampleRouter)

export default router