import { Router, Response, Request } from 'express';
import axios from 'axios';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname,'../../.env' )});
const router = Router();

router.get('/orderbook/:trading_pair/:limit', async (req: Request, res: Response) => {
  const { params: { trading_pair, limit} } = req;
  try {
    const { data } = await axios.get(`${process.env.API_URL}${trading_pair}/${limit}`);

    if(data.status!=="Ok") return res.status(400).send(data.errors)
    else return res.send(data)
  }
  catch(e: unknown) {
    return res.status(500).send(e)
  }
})

export default router