import React from 'react';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Card from './components/Card/Card';

import './index.scss';

const arr = [
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede',
    url: '/img/sneakers/1.jpg',
    price: 10565
  },
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede',
    url: '/img/sneakers/2.jpg',
    price: 10565
  },
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede',
    url: '/img/sneakers/3.jpg',
    price: 10565
  },
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede',
    url: '/img/sneakers/4.jpg',
    price: 10565
  },
  {
    name: 'Мужские кроссовки Nike Blazer Mid Suede',
    url: '/img/sneakers/5.jpg',
    price: 10565
  },
]

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
          {arr.map(obj => <Card url={obj.url} title={obj.name} price={obj.price} key={obj.url} />)}
        </div>
      </div>
    </div>
  )
}

export default App;
