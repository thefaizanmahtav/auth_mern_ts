import mongoose from "mongoose";
import { thirtyDayFromNow } from "../utils/date";


export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId,
    userAgent?: string,
    createAt: Date,
    expireAt: Date
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId: { ref: "User", type: mongoose.Schema.ObjectId, required: true, index: true },
    userAgent: { type: String },
    createAt: { type: Date, required: true, default: Date.now },
    expireAt: { type: Date, default: thirtyDayFromNow }
})

const sessionModel = mongoose.model<SessionDocument>("Session", sessionSchema);
export default sessionModel;