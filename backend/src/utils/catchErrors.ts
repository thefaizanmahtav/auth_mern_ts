import { NextFunction, Request, Response } from "express"

type AsyncControler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>


const catchErrors = (controler: AsyncControler): AsyncControler => async (req, res, next) => {
    try {
        await controler(req, res, next)
    } catch (error) {
        next(error)
    }
}

export default catchErrors;