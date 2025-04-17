import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface userDocument extends mongoose.Document {
    email: string,
    password: string,
    verified: boolean
    createdAt: Date,
    updateAt: Date
    __v: number
    comparePassword(val: string): Promise<boolean>
    omitPassword(): Pick<userDocument, "_id" | "email" | "verified" | "createdAt" | "updateAt" | "__v">;
}

const userSchema = new mongoose.Schema<userDocument>(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false },
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    this.password = await hashValue(this.password)
    next()
})

userSchema.methods.comparePassword = async function (val: string) {
    return compareValue(val, this.password)
}

userSchema.methods.omitPassword = function () {
    const user = this.toObject();
    delete user.password
    return user
}

const userModels = mongoose.model<userDocument>('User', userSchema)

export default userModels;