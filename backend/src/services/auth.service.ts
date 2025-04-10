import mongoose from "mongoose"
import userModels from "../models/user.model"
import verificaltionType from "../constant/verificationCodeTypes"
import { oneYearFromNow } from "../utils/date"

export type createAccountParams = {
    email: string,
    password: string,
    userAgent?: string
}


const createAccount = async (data: createAccountParams) => {
    // verify existing dosn't exist 

    const existingUser = await userModels.exists({
        email: data.email
    })

    if (existingUser) {
        throw new Error("user alredy exists")
    }

    // create user

    const user = await userModels.create({
        email: data.email,
        password: data.password
    })

    // create verification code

    const verificationCode = await userModels.create({
        userId: user._id,
        type: verificaltionType.emailVerification,
        createAccount: oneYearFromNow(),
    })
    
    // create verificateion email
    // create session
    // sing access token ans refresh token
    // return user
}