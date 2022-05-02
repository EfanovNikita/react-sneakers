import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import './index.scss';
import { batch } from 'react-redux';
import { fetchItems } from './redux/itemsSlice';
import { cartSelector, fetchCartItems } from './redux/cartSlice';
import { fetchFavoriteItems } from './redux/favoriteSlice';
import { useAppDispatch, useAppSelector } from './hooks/appHooks';

function App() {

  const [cartOpened, setCartOpened] = useState(false); //корзина (открыта/закрыта)
  const cartItems = useAppSelector(cartSelector.selectAll) // - cart items
  const dispatch = useAppDispatch()


  useEffect(() => {
    //получаем данные
    batch(() => {
      dispatch(fetchCartItems());
      dispatch(fetchFavoriteItems());
      dispatch(fetchItems());
    })
  }, []);

  return (
      <div className="wrapper">
        <Drawer setCartOpened={setCartOpened} cartOpened={cartOpened} />
        <Header cartItems={cartItems} setCartOpened={setCartOpened} />

        <Routes>
          <Route path='/' element={
            <Home />
          } />
          <Route path="favorites" element={
            <Favorites />
          } />
          <Route path="orders" element={
            <Orders />
          } />
        </Routes>
      </div>
  )
}

export default App;
