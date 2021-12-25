import React from 'react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';

function App() {
  return (
    <div className="wrapper">
      <Drawer />
      <Header />

      <div className='content'>
        <div className='contentHeader'>
          <h1>Все кроссовки</h1>
          <div className='searchBlock'>
            <img src='/img/search.svg' alt='search' />
            <input placeholder='Поиск...' />
          </div>
        </div>

        <div className='sneakers'>
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

export default App;
