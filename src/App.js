import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';

import './index.scss';
import axios from 'axios';

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get('https://61d422528df81200178a8ac2.mockapi.io/items');
      const cartResponse = await axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart');
      const favoriteResponse = await axios.get('https://61d422528df81200178a8ac2.mockapi.io/favorites');

      setCartItems(cartResponse.data);
      setFavoriteItems(favoriteResponse.data);
      setItems(itemsResponse.data);

      setIsLoading(false);
    }
    fetchData();
  }, []);

  const addToCart = obj => {
    let findCartItem = cartItems.find(item => item.url == obj.url);
    if (findCartItem) {
      setCartItems(prev => prev.filter(item => item.url !== obj.url));
      axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/cart/${findCartItem.id}`)
      return
    }
    axios.post('https://61d422528df81200178a8ac2.mockapi.io/cart', obj).then(res => {
      setCartItems(prev => [...prev, res.data]);
    });
  }

  const onRemoveItem = id => {
    axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id));
  }

  const onChangeSearchValue = event => {
    setSearchValue(event.target.value)
  }

  const onAddFavorite = obj => {
    let favoriteItem = favoriteItems.some(item => item.url == obj.url);
    if (favoriteItem) {
      axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/favorites/${favoriteItem.id}`).then(res => {
        setFavoriteItems(prev => prev.filter(item => item.url !== obj.url))
      })
    } else {
      axios.post('https://61d422528df81200178a8ac2.mockapi.io/favorites', obj).then(res => {
        setFavoriteItems(prev => [...prev, res.data]);
      })
    }
  }

  const isAddedItem = url => {
    return cartItems.some(item => item.url == url)
  }

  const isFavoritedItem = url => {
    return favoriteItems.some(item => item.url == url)
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favoriteItems, isAddedItem, isFavoritedItem, setCartOpened, onRemoveItem, setCartItems }}>
      <div className="wrapper">
        <Drawer  opened={cartOpened} />
        <Header openCart={() => setCartOpened(true)} />

        <Routes>
          <Route exact path="/" element={
            <Home
              searchValue={searchValue}
              addToCart={addToCart}
              onAddFavorite={onAddFavorite}
              onChangeSearchValue={onChangeSearchValue}
              setSearchValue={setSearchValue}
              isLoading={isLoading} />
          } />
          <Route path="/favorites" element={
            <Favorites
              addToCart={addToCart}
              onAddFavorite={onAddFavorite} />
          } />
          <Route path="/orders" element={
            <Orders />
          } />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App;
