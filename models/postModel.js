import mongoose,{Schema, model} from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Post must have a title']
    },
    body: {
        type: String,
        required: [true, 'Post must have a body']
    }
},{timestamps: true})

export default  model("post", postSchema)