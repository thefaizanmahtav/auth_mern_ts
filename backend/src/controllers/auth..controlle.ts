import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED } from "../constant/http";
import { setAuthCookie } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";


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

export const loginHandler = catchErrors(async (req, res) => {
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"],

    })

    const { accessToken, refreshToken } = await loginUser(request);

    return setAuthCookie({ res, accessToken, refreshToken }).status(CREATED).json({
        message: "Login Successful"
    })
})