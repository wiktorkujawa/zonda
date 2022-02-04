import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getTodos, selectTodos } from '../features/todos';

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(selectTodos);
  useEffect(() => {
    const interval = setInterval(() => 
      dispatch(getTodos()),1000)
      return () => clearInterval(interval)
  },[dispatch])
  return <ul>
    {
      todos.map( (todo: any) => {
        return <li key={todo.todo}> {todo.todo}</li>
      })
    }
    
    </ul>;
};

export default Home;
