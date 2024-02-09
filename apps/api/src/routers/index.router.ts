import { Router } from "express";
import SampleRouter from "./sample.router"

const router = Router()

router.use("/api/sample", SampleRouter)

export default router