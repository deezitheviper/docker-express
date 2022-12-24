import express from 'express';
import dotenv from 'dotenv';

dotenv.config();



const app = express();

app.get('/', (req, res) => {
    res.send('<h2>Hello World!</h2>');
})

app.listen(5000, () => {
    console.log('Server listening on port 5000');
})