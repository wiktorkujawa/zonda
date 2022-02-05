import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOrderbook, selectOrderbook, selectError } from '../features/orderbook';

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectOrderbook);
  const errors = useAppSelector(selectError);
  
  useEffect(() => {
    const interval = setInterval(() => 
      dispatch(getOrderbook({trading_pair: 'BTC-PLN', limit: 10})),1000)
      return () => clearInterval(interval)
  },[dispatch])
  return <ul>
    {
      todos && todos?.sell ?
      todos.sell?.map( ( item: any, index: number) => {
        return <li key={index}> {item.ra}</li>
      }):
      errors.map( (error: string,index: number) => {
        return <li key={index}> { error }</li>
      })
    }
    
    </ul>;
};

export default Home;
