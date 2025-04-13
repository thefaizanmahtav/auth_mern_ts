import { Response, CookieOptions } from "express"
import { fifteenMinutesFromNow, thirtyDayFromNow } from "./date"

const secure = process.env.NODE_ENV !== "development"

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
})

const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDayFromNow(),
    path: "/auth/refresh"
})

type Preams = {
    res: Response,
    accessToken: String,
    refreshToken: String
}

export const setAuthCookie = ({ res, accessToken, refreshToken }: Preams) =>
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())