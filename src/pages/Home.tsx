import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrderbook, selectOrderbook, selectError } from '../features/orderbook';
import { OrderbookParams, SellBuyDetails } from '../models';

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
  const errors = useAppSelector(selectError);
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: () => {}
  });
  useEffect(() => {
    
    const interval = setInterval(() => {
        dispatch(getOrderbook({trading_pair: formik.values.trading_pair, limit: formik.values.limit}))
    }
      ,1000)
      return () => clearInterval(interval)
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
          {/* <option value={""} label="Select tradingpair" /> */}

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
          {/* <option value={""} label="Select a limit" /> */}
          <option value={10} label="10" />
          <option value={50} label="50" />
          <option value={100} label="100" />
        </select>
      </div>

        
    </form>

  {
    orders && orders?.buy ?
    <div className='flex flex-col justify-center md:flex-row'>
      <div className='w-full text-center border-x-2'>
        <h2 className='w-full font-bold'>Ask</h2>

        <div className='w-full grid grid-cols-4'>
          <div className='border-2 border-l-0 flex justify-center items-center'>Rate</div>
          <div className='border-2 flex justify-center items-center'>Amount of {formik.values.trading_pair.substring(0,3)}</div>
          <div className='border-2 flex justify-center items-center'>{formik.values.trading_pair.substring(4,7)} value</div>
          <div className='border-2 border-r-0 flex justify-center items-center'>Offers number</div>
        </div>
        {
          orders && orders?.buy ? 
            orders.buy?.map((order: SellBuyDetails, index: number) => {
              return <div key={index} className='w-full grid grid-cols-4'>
                <div className='border-2 border-l-0 text-center'>
                  {roundNumber(order.ra)}
                </div>
                <div className='border-2 text-center'>
                  {roundNumber(order.ca)}
                </div>
                <div className='border-2 text-center'>
                  {roundNumber(order.val)}
                </div>
                <div className='border-2 border-r-0 text-center'>
                  {order.co}
                </div>
              </div>
          }): null
        }
       </div>  

      <div className='w-full text-center border-x-2'>
        <h2 className='w-full font-bold'>Bid</h2>

        <div className='w-full grid grid-cols-4'>
          <div className='border-2 border-l-0 flex justify-center items-center'>Rate</div>
          <div className='border-2 flex justify-center items-center'>Amount of {formik.values.trading_pair.substring(0,3)}</div>
          <div className='border-2 flex justify-center items-center'>{formik.values.trading_pair.substring(4,7)} value</div>
          <div className='border-2 border-r-0 flex justify-center items-center'>Offers number</div>
        </div>

        {
          orders && orders?.sell ? 
            orders.sell?.map((order: SellBuyDetails, index: number) => {
              return <div key={index} className='w-full grid grid-cols-4'>
                <div className='border-2 border-l-0 text-center'>
                  {roundNumber(order.ra)}
                </div>
                <div className='border-2 text-center'>
                  {roundNumber(order.ca)}
                </div>
                <div className='border-2 text-center'>
                {roundNumber(order.val)}
                </div>
                <div className='border-2 border-r-0 text-center'>
                  {order.co}
                </div>
              </div>
          }): null
    
        }
       </div>  
    </div> :  errors.map( (error: string,index: number) => {
              return <h2 className='text-center mt-5' key={index}> { error }</h2>
            })}
    {/* {
      orders && orders?.sell ?
      orders.sell?.map( ( order: any, index: number) => {
        return <div key={index}> {order.ra}</div>
      }):
      errors.map( (error: string,index: number) => {
        return <div key={index}> { error }</div>
      })
    } */}
    
    </section>;
};

export default Home;
