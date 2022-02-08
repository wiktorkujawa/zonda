import React, { useState } from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Home from './pages/Home';
import CHeader from './components/organisms/CHeader';
import { ReactComponent as MenuIcon} from './assets/icons/menu.svg'
import CNavMenu from './components/organisms/CNavMenu';
import CFooter from './components/organisms/CFooter';
import About from './pages/About';

function App() {

  const [ isOpened, setIsOpened ] = useState(false);
  return (
      <Router>
      <CHeader />
      <CNavMenu isOpened={isOpened}/>

      <button onClick={() => setIsOpened(!isOpened)} className="md:hidden absolute top-4 right-4 w-8"> 
      {
        isOpened ? <div className="text-h3">&times;</div> : <MenuIcon/>
      }
        
      </button>
        <main className='min-h-screen'>
        <div className='h-16'/> 
          <Routes>
            <Route path="/" element={ <Home/> }/>
            <Route path="about" element={ <About/> }/>
          </Routes>
          <div className='h-10'/>
        </main>
      <CFooter/>
      </Router>
  );
}

export default App;
