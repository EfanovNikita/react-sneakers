import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Card from './components/Card/Card';

import './index.scss';
import axios from 'axios';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://61d422528df81200178a8ac2.mockapi.io/items').then(res => {
      setItems(res.data);
    })
    axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    })
  }, []);

  const addToCart = obj => {
    for (let i = 0; i < cartItems.length; i++) {
      if (obj.url == cartItems[i].url) {
        return
      }
    }
    axios.post('https://61d422528df81200178a8ac2.mockapi.io/cart', obj).then(res => {
      axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart').then(res => {
        setCartItems(res.data);
      })
    });
  }

  const onRemoveItem = id => {
    axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/cart/${id}`).then(res => {
      axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart').then(res => {
        setCartItems(res.data);
      })
    })
  }

  const onChangeSearchValue = event => {
    setSearchValue(event.target.value)
  }

  return (
    <div className="wrapper">
      {cartOpened && <Drawer closeCart={() => setCartOpened(false)} onRemove={onRemoveItem} items={cartItems} />}
      <Header openCart={() => setCartOpened(true)} />

      <div className='content'>
        <div className='contentHeader'>
          <h1>{searchValue ? `Поиск по "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className='searchBlock'>
            <img src='/img/search.svg' alt='search' />
            {searchValue && <img className='clearBtn' onClick={() => setSearchValue('')} src='/img/btn-remove.svg' alt='clear' />}
            <input onChange={onChangeSearchValue} value={searchValue} placeholder='Поиск...' />
          </div>
        </div>

        <div className='sneakers'>
          {items
            .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) =>
              <Card url={item.url}
                title={item.name}
                price={item.price}
                key={item.url}
                //id={item.url}
                onPlus={obj => addToCart(obj)} />)}
        </div>
      </div>
    </div>
  )
}

export default App;
