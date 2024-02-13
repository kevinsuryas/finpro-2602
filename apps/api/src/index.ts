import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors"
import router from "./routers/index.router";
import { createTransactionMidtrans } from "./libs/midtrans"

const app: Express = express()
const port: number = 8000

app.use(express.json())
app.use(cors())
app.use(router)

app.get("/api/user", (_, res: Response) => {
  res.status(200).send({
    success: true,
    mesage: "get user success",
    data: [
      { id: 1, name: "Immanuel" },
      { id: 2, name: "Joshua" }
    ]
  })
})

app.post("/api/midtrans", async (_, res: Response) => {
  const snap = await createTransactionMidtrans()
  res.send({
    success: "true",
    message: "create midtrans transaction success",
    data: snap
  })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).send({
    error: true,
    message: err.message,
    data: null
  })
})

app.listen(port, () => {
  console.log(`  ➜  [API] Local:   http://localhost:${port}/`);
})