import { Response, CookieOptions } from "express"
import { fifteenMinutesFromNow, thirtyDayFromNow } from "./date"

export const REFRESH_PATH = "/auth/refresh"

const secure = process.env.NODE_ENV !== "development"

const defaults: CookieOptions = {
    sameSite: "strict",
    httpOnly: true,
    secure
}

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow()
})

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDayFromNow(),
    path: REFRESH_PATH
})

type Preams = {
    res: Response,
    accessToken: String,
    refreshToken: String
}

export const setAuthCookie = ({ res, accessToken, refreshToken }: Preams) =>
    res.cookie("accessToken", accessToken, getAccessTokenCookieOptions()).cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())


export const clearAuthCookies = (res: Response) =>
    res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: REFRESH_PATH
    })