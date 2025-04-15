import appErrorCode from "../constant/appErrorCode";
import { HttpStatusCode } from "../constant/http";



class appError extends Error {
    constructor(
        public statusCode: HttpStatusCode,
        public message: string,
        public errorCode?: appErrorCode,
    ) {
        super(message)
    }
}

export default appError;