import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

import './index.scss';
import axios from 'axios';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    axios.get('https://61d422528df81200178a8ac2.mockapi.io/items').then(res => {
      setItems(res.data);
    })
    axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart').then(res => {
      setCartItems(res.data);
    })
    axios.get('https://61d422528df81200178a8ac2.mockapi.io/favorites').then(res => {
      setFavoriteItems(res.data);
    })
  }, []);

  const addToCart = obj => {
    if (cartItems.find(item => item.url == obj.url)) {
      return
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

  const onAddFavorite = obj => {
    let favoriteItem = favoriteItems.find(item => item.url == obj.url);
    if (favoriteItem) {
      axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/favorites/${favoriteItem.id}`).then(res => {
        setFavoriteItems(prev => prev.filter(item => item.url !== obj.url))
      })
    } else {
      axios.post('https://61d422528df81200178a8ac2.mockapi.io/favorites', obj).then(res => {
        axios.get('https://61d422528df81200178a8ac2.mockapi.io/favorites').then(res => {
          setFavoriteItems(res.data)
        })
      })
    }
  }

  return (
    <div className="wrapper">
      {cartOpened && <Drawer closeCart={() => setCartOpened(false)} onRemove={onRemoveItem} items={cartItems} />}
      <Header openCart={() => setCartOpened(true)} />

      <Routes>
        <Route exact path="/" element={
          <Home items={items}
            searchValue={searchValue}
            addToCart={addToCart}
            onAddFavorite={onAddFavorite}
            onChangeSearchValue={onChangeSearchValue}
            setSearchValue={setSearchValue}
          />} />
        <Route path="/favorites" element={
          <Favorites
            favoriteItems={favoriteItems}
            addToCart={addToCart}
            onAddFavorite={onAddFavorite} />
        } />
      </Routes>
    </div>
  )
}

export default App;
