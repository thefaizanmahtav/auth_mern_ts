import mongoose from "mongoose";
import verificaltionType from "../constant/verificationCodeTypes";


export interface verificationCodeDocuments extends mongoose.Document {
    userId: mongoose.Types.ObjectId,
    type: verificaltionType,
    createdAt: Date,
    expireAt: Date
}

const verificaltionSchema = new mongoose.Schema<verificationCodeDocuments>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expireAt: { type: Date, required: true }
})

const verificaltionModel = mongoose.model<verificationCodeDocuments>("verificationCode", verificaltionSchema, "verification_Code")

export default verificaltionModel;