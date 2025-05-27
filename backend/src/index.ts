import "dotenv/config"
import express from "express";
import cors from "cors"
import connectToDatabase from "./config/db";
import { NODE_ENV, PORT, APP_ORIGIN } from "./constant/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constant/http";
import authRoutes from "./routes/auth.routs";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.routs";
import sessionRoutes from "./routes/session.routs";

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true
    })
);

app.use(cookieParser());

app.get("/", (req, res, next) => {
    res.status(OK).json({
        message: "healthy"
    })
})

// auth routes
app.use("/auth", authRoutes)

// user routes
app.use("/user", authenticate, userRoutes)

// session routes
app.use("/sessions", authenticate, sessionRoutes)

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`server is running on port ${PORT} in ${NODE_ENV} enviroment`);
    await connectToDatabase();
})