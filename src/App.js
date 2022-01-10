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
      try {
        const [itemsResponse, cartResponse, favoriteResponse] = await Promise.all([
          axios.get('https://61d422528df81200178a8ac2.mockapi.io/items'),
          await axios.get('https://61d422528df81200178a8ac2.mockapi.io/cart'),
          await axios.get('https://61d422528df81200178a8ac2.mockapi.io/favorites')
        ])
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const addToCart = async obj => {
    try {
      const findCartItem = cartItems.find(item => item.url == obj.url);
      if (findCartItem) {
        setCartItems(prev => prev.filter(item => item.url !== obj.url));
        axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/cart/${findCartItem.id}`)
        return
      }
      const res = await axios.post('https://61d422528df81200178a8ac2.mockapi.io/cart', obj)
      setCartItems(prev => [...prev, res.data]);
    } catch (error) {
      console.log(error)
    }
  }

  const onRemoveItem = id => {
    try {
      axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeSearchValue = event => {
    setSearchValue(event.target.value)
  }

  const onAddFavorite = async obj => {
    try {
      const favoriteItem = favoriteItems.some(item => item.url == obj.url);
      if (favoriteItem) {
        axios.delete(`https://61d422528df81200178a8ac2.mockapi.io/favorites/${favoriteItem.id}`)
        setFavoriteItems(prev => prev.filter(item => item.url !== obj.url))
      } else {
        const res = await axios.post('https://61d422528df81200178a8ac2.mockapi.io/favorites', obj)
        setFavoriteItems(prev => [...prev, res.data]);
      }
    } catch (error) {
      console.log(error)
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
        <Drawer opened={cartOpened} />
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
