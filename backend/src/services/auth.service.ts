import userModels from "../models/user.model"
import verificaltionType from "../constant/verificationCodeTypes"
import { oneYearFromNow } from "../utils/date"
import sessionModel from "../models/session.model"
import jwt from "jsonwebtoken"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constant/env"
import verificaltionModel from "../models/verification.model"
import appAssert from "../utils/appAssert"
import { CONFLICT, UNAUTHORIZED } from "../constant/http"
import { refreshTokenSingOptions, signToken } from "../utils/jwt"

export type createAccountParams = {
    email: string,
    password: string,
    userAgent?: string
}


export const createAccount = async (data: createAccountParams) => {
    // verify existing dosn't exist 

    const existingUser = await userModels.exists({
        email: data.email
    })

    appAssert(
        !existingUser, CONFLICT, "Email alrady in use"
    )

    // if (existingUser) {
    //     throw new Error("user alredy exists")
    // }

    // create user

    const user = await userModels.create({
        email: data.email,
        password: data.password
    })

    const userId = user._id

    // create verification code

    const verificationCode = await verificaltionModel.create({
        userId,
        type: verificaltionType.emailVerification,
        createdAt: Date.now(),
        expiresAt: oneYearFromNow(),
    })

    // create verificateion email


    // create session

    const session = await sessionModel.create({
        userId,
        userAgent: data.userAgent
    })


    // sing access token & refresh token

    const refreshToken = signToken(
        { sessionId: session._id },
        refreshTokenSingOptions
    )

    const accessToken = signToken(
        {
            userId,
            sessionId: session._id
        }
    )

    // return user

    return {
        user: user.omitPassword(),
        refreshToken,
        accessToken,
    }
}

export type LoginParams = {
    email: string,
    password: string,
    userAgent?: string
}

export const loginUser = async ({ email, password, userAgent }: LoginParams) => {

    // get user by email

    const user = await userModels.findOne({ email });
    appAssert(user, UNAUTHORIZED, "Invalid email or password")

    // validate password from the request 

    const isValid = await user.comparePassword(password);
    appAssert(isValid, UNAUTHORIZED, "Invalid email or password")

    // create session

    const userId = user._id;

    const session = await sessionModel.create({
        userId,
        userAgent
    })

    const sessionInfo = {
        sessionId: session.id
    }

    // sing access token & refresh token

    const refreshToken = signToken(
        sessionInfo,
        refreshTokenSingOptions
    )

    const accessToken = signToken(
        {
            ...sessionInfo,
            userId: user._id,
        }
    )

    // return user & token

    return {
        user: user.omitPassword(),
        accessToken,
        refreshToken,
    }
}

