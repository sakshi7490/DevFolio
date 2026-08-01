import express from "express";
import userRoutes from "./modules/user/user.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

export default app;