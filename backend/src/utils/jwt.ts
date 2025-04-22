import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken"
import { SessionDocument } from "../models/session.model"
import { userDocument } from "../models/user.model"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constant/env"

export type refershTokenPayload = {
    sessionId: SessionDocument["_id"]
}

export type accessTokenPayload = {
    sessionId: SessionDocument["_id"]
    userId: userDocument["_id"]
}

type singOptionsAndSecret = SignOptions & {
    secret: string
}

const defaults: SignOptions = {
    audience: ["user"]
}

const accessTokenSingOptions: singOptionsAndSecret = {
    expiresIn: "15m",
    secret: JWT_SECRET,
}

export const refreshTokenSingOptions: singOptionsAndSecret = {
    expiresIn: "30d",
    secret: JWT_REFRESH_SECRET,
}

export const signToken = (
    payload: refershTokenPayload | accessTokenPayload,
    options?: singOptionsAndSecret

) => {
    const { secret, ...signOpts } = options || accessTokenSingOptions
    return jwt.sign(payload, secret, {
        ...defaults,
        ...signOpts,
    })
}


export const verifyToken = <TPayload extends object = accessTokenPayload>(
    token: string,
    options?: VerifyOptions & { secret: string }
) => {
    const { secret = JWT_SECRET, ...verifyOpts } = options || {}
    try {
        const payload = jwt.verify(token, secret, {
            ...defaults,
            ...verifyOpts
        }) as TPayload
        return {
            payload
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}
