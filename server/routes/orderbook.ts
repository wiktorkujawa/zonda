import { Router, Response, Request } from 'express';
import axios from 'axios';
const router = Router();

router.get('/orderbook/:from-:to/:limit', async (req: Request, res: Response) => {
  const { params: { trading_pair, limit} } = req;
  try {
    const { data } = await axios.get(`https://api.zonda.exchange/rest/trading/orderbook-limited/${trading_pair}/${limit}`);

    if(data.status!=="Ok") return res.status(400).send(data.errors)
    else return res.send(data)
  }
  catch(e) {
    return res.status(500).send(e)
  }
})

export default router