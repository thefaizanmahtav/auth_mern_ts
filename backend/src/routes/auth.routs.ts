import { Router } from "express";
import { registerHandler } from "../controllers/auth..controlle";



const authRoutes = Router();

// prefix: /auth 

authRoutes.post("/register", registerHandler)

export default authRoutes