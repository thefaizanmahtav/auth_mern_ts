import { z } from "zod";
import { ErrorRequestHandler, Response } from "express";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constant/http";
import appError from "../utils/appError";


const handleZodError = (res: Response, error: z.ZodError) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join('.'),
        message: err.message
    }))
    return res.status(BAD_REQUEST).json({
        message: error.message,
        errors
    })
}

const handleAppError = (res: Response, error: appError) => {
    return res.status(error.statusCode).json({
        message: error.message
    })
}


const errorHandler: ErrorRequestHandler = (error, req, res, next) => {

    if (error instanceof z.ZodError) {
        handleZodError(res, error)
    }

    if (error instanceof appError) {
        handleAppError(res, error)
    }

    console.log(`PATH: ${req.path}`, error);
    res.status(INTERNAL_SERVER_ERROR).send(`Internal server error`)
}

export default errorHandler;