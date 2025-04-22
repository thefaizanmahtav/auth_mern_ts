import { z } from "zod";
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser } from "../services/auth.service";
import { CREATED, OK } from "../constant/http";
import { clearAuthCookies, setAuthCookie } from "../utils/cookies";
import { loginSchema, registerSchema } from "./auth.schemas";
import { accessTokenPayload, verifyToken } from "../utils/jwt";
import sessionModel from "../models/session.model";


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

    return setAuthCookie({ res, accessToken, refreshToken }).status(OK).json({
        message: "Login Successful"
    })
})


export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const {payload}  = verifyToken(accessToken)
    if (payload) {
        await sessionModel.findByIdAndDelete(payload.sessionId)
    }
    
    return clearAuthCookies(res)
    .status(OK).json({
        message: "Logout Successfull"
    })
})