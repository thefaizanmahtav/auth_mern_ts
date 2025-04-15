import assert from "assert"
import appError from "./appError"
import { HttpStatusCode } from "../constant/http"
import appErrorCode from "../constant/appErrorCode"

type AppAssert = (
    condition: any,
    HttpStatusCode: HttpStatusCode,
    message: string,
    appErrorCode?: appErrorCode
) => asserts condition;

// Asserts a condition and throws an AppError if the condition is falsy

const appAssert: AppAssert = (
    condition,
    HttpStatusCode,
    message,
    appErrorCode
) => assert(condition, new appError(HttpStatusCode, message, appErrorCode))

export default appAssert 