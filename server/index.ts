import express, { Response, Request } from "express";
import dotenv from "dotenv";
import path from 'path';
import bodyParser from "body-parser";
import OrderBookRoute from './routes/orderbook';

import { createServer } from 'http';
import { Server } from 'socket.io';
import axios from "axios";

dotenv.config({ path: path.join(__dirname,'../.env' )});


const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        credentials: true,
        origin: "http://localhost:3000"
    }
 });

let interval: NodeJS.Timer;
io.on("connection", (socket) => {
  // ...
  console.log("Client Connected");

  if(interval) {
      clearInterval(interval);
  }
  let params = {
      limit: socket.handshake.query['limit'],
      trading_pair: socket.handshake.query['trading_pair']
    }
  interval = setInterval(() => getApiAndEmit(socket, params), 1000);

  socket.on("disconnect", () => {
    console.log("Client Disconnected");
    clearInterval(interval);
  })
});

const getApiAndEmit = async (socket:any, params:any) => {
    try {
        const { data } = await axios.get(`${process.env.API_URL}${params.trading_pair}/${params.limit}`);

        if(data && data.buy) {
            data.buy!.map((item:any) => item.val= item.ra*item.ca)
            data.sell!.map((item:any) => item.val= item.ra*item.ca)
            data.spread =  Math.max.apply(Math, data.sell!.map((order:any) => order.val))
            -
            Math.min.apply(Math, data!.buy!.map((order:any) => order.val))
        }
        socket.emit("FromAPI", data)
        }
    catch(e) {
        console.log('error')
    }
}

app.use(bodyParser.json());

// setup express app here
// ...

app.use('/api', [
    OrderBookRoute, 
])
app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (_:Request, res: Response) => { 
    res.sendFile(path.join(__dirname, '../dist/index.html')) 
}); 

// start server
const PORT = process.env["PORT"] || 4000; 

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
