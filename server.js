import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from './config/config.js'; 
import postRouter from './routes/postRoutes.js';
import authRouter from './routes/authRoutes.js';
 


dotenv.config();

const app = express();
app.use(express.json());

//connect DB
 

const connectDB = async () => {
    
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`) 
        console.log('Connected to MongoDB')
    }catch(err){ 
        console.log(err) 
        setTimeout(() => {
            connectDB() 
        },5000)
    }
}


app.get('/', (req, res) => {
    res.send('<h2>Hello World!</h2>');
})
app.use('/api/posts',postRouter)
app.use('/api/auth',authRouter)
 

app.listen(5000, () => {
    connectDB();
    console.log('Server listening on port 5000');
})

// db.createUser({ user: "root", pwd: passwordPrompt(), roles: [{ role: "root", db: "admin" }] })