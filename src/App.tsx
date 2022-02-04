import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <div className='min-h-screen'>
      <header></header>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={ <Home/> }/>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
