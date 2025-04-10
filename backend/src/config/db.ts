import mongoose from "mongoose";
import { MONGO_URI } from "../constant/env";


const connectToDatabase = async ()=>{

    try {
        await mongoose.connect(MONGO_URI)
        console.log(`Cloud database connected succesfully`);
    } catch (error) {
        console.log(`Cloud database not connected ${error}`);
        process.exit(1)
    }

}

export default connectToDatabase;