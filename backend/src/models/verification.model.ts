import mongoose from "mongoose";
import verificationType from "../constant/verificationCodeTypes";


export interface VerificationCodeDocuments extends mongoose.Document {
    userId: mongoose.Types.ObjectId,
    type: verificationType,
    createdAt: Date,
    expiresAt: Date
}

const verificaltionSchema = new mongoose.Schema<VerificationCodeDocuments>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true }
})

const verificaltionModel = mongoose.model<VerificationCodeDocuments>("VerificationCode", verificaltionSchema, "Verification_Code")

export default verificaltionModel;