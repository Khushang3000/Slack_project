import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: {type: String, required: true},
    clerkId: {type: String, required: true, unique: true}
}, {timestamps: true})//giving this option also gives us the createdAt and updatedAt fields.

export const User = mongoose.model("User", userSchema)//by using this model we can interact with our database such as a creating user, deleting, updating.
// now go back to inngest.js