import userModels from "../models/user.model"
import verificaltionType from "../constant/verificationCodeTypes"
import { fiveMinutesAgo, ONE_DAY_IN_MS, oneHourFromNow, oneYearFromNow, thirtyDayFromNow } from "../utils/date"
import sessionModel from "../models/session.model"
import verificaltionCodeModel from "../models/verification.model"
import appAssert from "../utils/appAssert"
import { CONFLICT, INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS, UNAUTHORIZED } from "../constant/http"
import { refershTokenPayload, refreshTokenSingOptions, signToken, verifyToken } from "../utils/jwt"
import { sendMail } from "../utils/sendMail"
import { getPasswordResetTemplate, getVerifyEmailTemplate } from "../utils/emailTemplates"
import { APP_ORIGIN } from "../constant/env"

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

    const verificationCode = await verificaltionCodeModel.create({
        userId,
        type: verificaltionType.emailVerification,
        createdAt: Date.now(),
        expiresAt: oneYearFromNow(),
    })

    // create verificateion email

    const url = `${APP_ORIGIN}/email/verify/${verificationCode._id}`

    const { error } = await sendMail({
        to: user.email,
        ...getVerifyEmailTemplate(url)
    })

    if (error) {
        console.log("error", error);
    }


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

export const refreshUserAccessToken = async (refreshToken: string) => {

    const { payload } = verifyToken<refershTokenPayload>(refreshToken, {
        secret: refreshTokenSingOptions.secret,
    })

    appAssert(payload, UNAUTHORIZED, "Invalid refresh token")

    const session = await sessionModel.findById(payload.sessionId)
    const now = Date.now()
    appAssert(session && session.expireAt.getTime() > now, UNAUTHORIZED, "Session expired")

    // refresh the session if it expire in the 24 hours
    const sessionNeedRefresh = session.expireAt.getTime() - now <= ONE_DAY_IN_MS
    if (sessionNeedRefresh) {
        session.expireAt = thirtyDayFromNow()
        await session.save()
    }

    const newRefreshToken = sessionNeedRefresh ? signToken(
        { sessionId: session._id },
        refreshTokenSingOptions
    ) : undefined;

    const accessToken = signToken(
        {
            userId: session.userId,
            sessionId: session._id
        }
    )

    return {
        accessToken,
        newRefreshToken,
    }
}


export const verifyEmail = async (code: string) => {

    // get the verification code

    const validCode = await verificaltionCodeModel.findOne({
        _id: code,
        type: verificaltionType.emailVerification,
        expiresAt: { $gt: Date.now() }
    })
    appAssert(validCode, INTERNAL_SERVER_ERROR, "Invalid  or expired verification code")

    // update the user to verified true

    const updateUser = await userModels.findByIdAndUpdate(
        validCode.userId,
        { verified: true },
        { new: true }
    )
    appAssert(updateUser, INTERNAL_SERVER_ERROR, "Faild to verify user")

    // delete the verification code

    await validCode.deleteOne()

    // return the user

    return {
        user: updateUser.omitPassword()
    }

}

export const sendPasswordResetEmail = async (email: string) => {
    // get the user by email

    const user = await userModels.findOne({ email });
    appAssert(user, UNAUTHORIZED, "User not found")

    // check email rate limit

    const fiveMinAgo = fiveMinutesAgo()
    const count = await verificaltionCodeModel.countDocuments({
        userId: user._id,
        type: verificaltionType.passwordReset,
        createdAt: { $gt: fiveMinAgo }
    })
    appAssert(count <= 1, TOO_MANY_REQUESTS, "Too many requests, please try again later")

    // create a verification code

    const expiresAt = oneHourFromNow()
    const verificationCode = await verificaltionCodeModel.create({
        userId: user._id,
        type: verificaltionType.passwordReset,
        createdAt: Date.now(),
        expiresAt,
    })

    // send verification email
    const url = `${APP_ORIGIN}/password/reset?code=${verificationCode._id}&exp=${expiresAt.getTime()}`
    const { data, error } = await sendMail({
        to: user.email,
        ...getPasswordResetTemplate(url)
    })

    appAssert(data?.id, INTERNAL_SERVER_ERROR, `${error?.name}-${error?.message}`)

    // return success 
    return {
        url,
        emailId: data.id,
    }
}