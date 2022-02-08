import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import COrderTable from '../components/organisms/COrderTable';
import { getOrderbook, selectOrderbook } from '../features/orderbook';
import { OrderbookParams } from '../models';

type Props = {};

const initialValues: OrderbookParams = {
  limit: 10,
  trading_pair: 'BTC-PLN'
}

const trading_pair_options: string[] = [
  'BTC-PLN',
  'BTC-USD',
  'ETH-PLN',
  'ETH-USD',
  'SOL-PLN',
  'SOL-USD'
]

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(selectOrderbook);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {}
  });
  useEffect((): any => {

    const socket = io({ query: {
      'limit': formik.values.limit,
      'trading_pair': formik.values.trading_pair
    }});

    socket.on("FromAPI", data => {
      dispatch(getOrderbook(data))
    });
    return () => socket.disconnect();
  },[dispatch, formik.values])

  const roundNumber = (number: number) => parseFloat(Number(number).toFixed(4))

  return <section className='w-full o-container o-container--xl my-8'>

    <form className='flex bg-pale-green justify-between border-2 p-4' >
      <div>
        <label htmlFor="trading_pair" className="form-label inline-block mb-2 text-gray-700">Trading Pair:</label>
        <select
          className='p-2 bg-white'
          name="trading_pair"
          value={formik.values.trading_pair}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ display: 'block' }}
        >
          {
            trading_pair_options.map( option => <option key={option} value={option} label={option} /> )
          }
        </select>
      </div>

      <div className='flex items-end'> 
        <h2>Spread: {roundNumber(orders.spread as number)} </h2>
      </div>

      <div>
        <label htmlFor="limit" className="form-label inline-block mb-2 text-gray-700">Limit:</label>
        <select
          className='p-2 bg-white'
          name="limit"
          value={formik.values.limit}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{ display: 'block' }}
        >
          <option value={10} label="10" />
          <option value={50} label="50" />
          <option value={100} label="100" />
        </select>
      </div>

        
    </form>

    <COrderTable orders={orders} formik={formik} />
    
    </section>;
};

export default Home;
