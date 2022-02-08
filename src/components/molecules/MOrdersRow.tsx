import React from 'react';
import { SellBuyDetails } from '../../models';

type Props = {
  order: SellBuyDetails
};

const MOrdersRow = ({order}: Props) => {

  const roundNumber = (number: number) => parseFloat(Number(number).toFixed(4))
  return <div className='w-full grid grid-cols-4'>
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
};

export default MOrdersRow;
