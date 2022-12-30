import User from '../models/authModel.js';

export const register =  async (req, res, next) => {
    try{
        const user =  new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password
                });
        
    const result = await user.save();
    if(result){
        res.status(201).json(result)
    }
    }catch(err){
        console.log(err);
        res.status(500).json({
                    status: "Can't create user at the moment"
                })
    }
}