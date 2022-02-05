import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTodos, selectTodos } from '../features/todos';

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos);
  useEffect(() => {
    const interval = setInterval(() => 
      dispatch(getTodos({trading_pair: 'BTC-PLN', limit: 10})),1000)
      return () => clearInterval(interval)
  },[dispatch])
  return <ul>
    {
      todos.sell?.map( (todo: any, index: number) => {
        return <li key={index}> {todo.ra}</li>
      })
    }
    
    </ul>;
};

export default Home;
