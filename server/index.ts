import express, { Response, Request } from "express";
import dotenv from "dotenv";
import path from 'path';
import bodyParser from "body-parser";
import cors from 'cors';
import OrderBookRoute from './routes/orderbook';
dotenv.config({ path: path.join(__dirname,'../.env' )});


const app = express();

app.use(bodyParser.json());

app.use(cors({ 
    origin: "http://localhost:3000",
    credentials: true
}));

// setup express app here
// ...

app.use('/api', [
    OrderBookRoute, 
])
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (_:Request, res: Response) => { 
    res.sendFile(path.join(__dirname, '../dist/index.html')) 
}); 

// start express server
const PORT = process.env["PORT"] || 4000; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));