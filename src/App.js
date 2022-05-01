import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import './index.scss';
import { batch, useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemsSelector } from './redux/itemsSlice';
import { cartSelector, fetchCartItems } from './redux/cartSlice';
import { favoriteSelector, fetchFavoriteItems } from './redux/favoriteSlice';

function App() {

  const [cartOpened, setCartOpened] = useState(false); //корзина (открыта/закрыта)
  const items = useSelector(itemsSelector.selectAll) // all items
  const cartItems = useSelector(cartSelector.selectAll) // - cart items
  const favoriteItems = useSelector(favoriteSelector.selectAll) //- favorite items
  const dispatch = useDispatch()


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
