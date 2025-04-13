import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount } from "../services/auth.service";
import { CREATED } from "../constant/http";
import { setAuthCookie } from "../utils/cookies";

export const registerSchema = z.object({
    email: z.string().email().min(1).max(255),
    password: z.string().min(1).max(255),
    confirmPassword: z.string().min(1).max(255),
    userAgent: z.string().optional()
}).refine(
    (data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
}
)


export const registerHandler = catchErrors(
    async (req, res) => {
        // validate request

        const request = registerSchema.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        })

        // call service

        const { user, accessToken, refreshToken } = await createAccount(request)


        // returen response

        return setAuthCookie({ res, accessToken, refreshToken }).status(CREATED).json(user)
    }
)