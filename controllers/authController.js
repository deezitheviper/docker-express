import User from '../models/authModel.js';
import bcrypt from 'bcryptjs';


export const register =  async (req, res, next) => {
    const {username, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12)
    try{
        const user =  new User({
                    username: username,
                    email: email,
                    password: hashedPassword
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

export const login = async (req, res, next) => {
    const {email, password} = req.body;
    try{
        const user =  await User.findOne({email});
        if(!user){
            return res.status(404).json({error: "User not found"})
        }
        else{
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                res.status(401).json({error: "Invalid password"})
            }
            else{
                return res.status(200).json("Login success")
            }
        }
    }catch(err){
        console.log(err);
                res.status(500).json({
                            status: "Can't find user"
                        })
                    }

}