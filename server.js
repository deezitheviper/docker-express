import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import { MONGO_IP, MONGO_PASSWORD, MONGO_PORT, MONGO_USER, REDIS_HOST, REDIS_PORT, SESSION_SECRET } from './config/config.js'; 
import postRouter from './routes/postRoutes.js';
import authRouter from './routes/authRoutes.js';
import {createClient} from 'redis';
import redis from 'connect-redis';
import cors from 'cors';

 


dotenv.config();

const app = express();
app.use(express.json());
app.set('trust proxy', true)
app.use(cors({}));


const RedisStore = redis(session);

const redisClient = createClient({
    legacyMode: true,
    socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
    }
})
redisClient.connect().catch(console.error)


app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: SESSION_SECRET, 
      resave: false,
      cookie:{
        httpOnly: true,
        secure: false,
        maxAge: 30000, 
      }
    })
  )

//connect DB
const connectDB = async () => {
   
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?directConnection=true&authSource=admin`) 
        console.log('Connected to MongoDB')
    }catch(err){ 
        console.log(err) 
        setTimeout(() => {
            connectDB() 
        },5000)
    }
}


app.get('/api', (req, res) => {
    res.send('<h2>Hello World!</h2>');
    console.log("Test Load Bal")
})
app.use('/api/posts',postRouter)
app.use('/api/auth',authRouter)
 

app.listen(5000, () => {
    connectDB();
    console.log('Server listening on port 5000');
})

// db.createUser({ user: "root", pwd: passwordPrompt(), roles: [{ role: "root", db: "admin" }] })