import mongoose,{Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8,"Password must be at least 8 characters"],
    }

},{timestamps: true});

export default model("User", userSchema);