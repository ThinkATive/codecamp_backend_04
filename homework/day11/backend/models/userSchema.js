import mongoose from "mongoose";

// const StockSchema = new mongoose.Schema({
//     title: String,
//     description: String,
//     image: String
// })

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    personal: String,
    prefer: String,
    pwd: String,
    phone: String,
    og: {
        title: String,
        description: String,
        image: String
    }
});

export const User = mongoose.model("User", UserSchema);