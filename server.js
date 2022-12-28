import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER } from './config/config.js'; 

 


dotenv.config();

const app = express();

//connect DB

const connectDB = async () => {
    console.log(MONGO_USER,MONGO_PASSWORD)
    try{
        mongoose.set('strictQuery', false)
    await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    console.log('Connected to MongoDB')
    }catch(err){
        console.log(err)
    }
}

app.get('/', (req, res) => {
    res.send('<h2>Hello World!</h2>');
})

app.listen(5000, () => {
    connectDB();
    console.log('Server listening on port 5000');
})