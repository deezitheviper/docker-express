import  Post from "../models/postModel.js";

export const getPosts = async (req, res, next) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }catch(err){
        console.error(err);
        res.status(400).json({
            status: "Failed to find posts"
        });
    }
}

export const getPost = async (req, res, next) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        console.error(err);
        res.status(400).json({status: "Failed to find post"});
    }
}

export const createPost = async (req, res, next) => {
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }catch(err){
        console.error(err);
        res.status(400).json({status: "Failed to create post"});
    }
}

export const updatePost = async (req, res, next) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body,{new: true});
        res.status(200).json(updatedPost);
    }catch(err){
        console.error(err);
        res.status(400).json({status: "Failed to update post"});
    }
}

export const deletePost = async (req, res, next) => {
    try{
        const deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.status(200).json("Post deleted");
    }catch(err){
        console.error(err);
        res.status(400).json({status: "Failed to delete post"});
    }
}