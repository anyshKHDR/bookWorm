import mongoose from "mongoose";

// creating new schema
const userSchema = new mongoose.Schema({
    user: [String],
    rating: [Number],
    review: [String]
})

// creating model
const User = mongoose.model("User", userSchema);

export {userSchema, User};