import mongoose from "mongoose";
const uri: string = "";
const options: object = {};

export default mongoose.connect(uri, options).then().catch();
