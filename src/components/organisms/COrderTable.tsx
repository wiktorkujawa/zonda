import React from 'react';
import { ResponseDetails, SellBuyDetails } from '../../models';
import MOrdersRow from '../molecules/MOrdersRow';

type Props = {
  orders: ResponseDetails,
  formik: any
}
const COrderTable = ({orders, formik}: Props) => {
  return <>
    {
      orders.status==='Ok' ?
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
              orders.buy?.map((order: SellBuyDetails, index: number) => {
                return <MOrdersRow key={index} order={order} />
            })
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
              orders.sell?.map((order: SellBuyDetails, index: number) => {
                return <MOrdersRow key={index} order={order} />
            })
      
          }
        </div>  
      </div> :  orders.errors?.map( (error: string,index: number) => {
                return <h2 className='text-center mt-5' key={index}> { error }</h2>
              }) 
    }
  </>
};

export default COrderTable;
