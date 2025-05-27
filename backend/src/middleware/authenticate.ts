import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import { UNAUTHORIZED } from "../constant/http";
import { accessTokenPayload, verifyToken } from "../utils/jwt";
import appErrorCode from "../constant/appErrorCode";


const authenticate: RequestHandler = (req, res, next) => {
    const accessToken = req.cookies.accessToken as string | undefined;

    appAssert(accessToken, UNAUTHORIZED, "Not authorized", appErrorCode.InvalidAccessToken);

    const { error, payload } = verifyToken(accessToken);
    
    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token",
        appErrorCode.InvalidAccessToken);


    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
};

export default authenticate;