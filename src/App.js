import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Card from './components/Card/Card';

import './index.scss';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://61d422528df81200178a8ac2.mockapi.io/items').then(res => {
      return res.json()
    }).then(json => {
      setItems(json);
    })
  }, []);

  const addInCart = obj => {
    setCartItems(prev => {
      for (let i = 0; i < prev.length; i++) {
        if (obj.url == prev[i].url) {
          return [...prev]
        }
      }
      return [...prev, obj]
    });
  }

  return (
    <div className="wrapper">
      {cartOpened && <Drawer closeCart={() => setCartOpened(false)} items={cartItems} />}
      <Header openCart={() => setCartOpened(true)} />

      <div className='content'>
        <div className='contentHeader'>
          <h1>Все кроссовки</h1>
          <div className='searchBlock'>
            <img src='/img/search.svg' alt='search' />
            <input placeholder='Поиск...' />
          </div>
        </div>

        <div className='sneakers'>
          {items.map(item =>
            <Card url={item.url}
              title={item.name}
              price={item.price}
              key={item.url}
              onPlus={obj => addInCart(obj)} />)}
        </div>
      </div>
    </div>
  )
}

export default App;
