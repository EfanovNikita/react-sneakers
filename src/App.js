import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import AppContext from './context';

import './index.scss';
import { API } from './api/api';
import { batch, useDispatch, useSelector } from 'react-redux';
import { fetchItems, itemsSelector } from './redux/itemsSlice';
import { cartSelector, fetchCartItems } from './redux/cartSlice';
import { favoriteSelector, fetchFavoriteItems } from './redux/favoriteSlice';

function App() {

  const [cartOpened, setCartOpened] = useState(false); //корзина (открыта/закрыта)
  //const [cartItems, setCartItems] = useState([]); //товары в корзине
  //const [items, setItems] = useState([]); //все товары
  const [searchValue, setSearchValue] = useState(''); //значение поля (поиск по товарам)
  //const [favoriteItems, setFavoriteItems] = useState([]); //товары в избранном
  const [isLoading, setIsLoading] = useState(true); //показатель загрузки
  const items = useSelector(itemsSelector.selectAll) // all items
  const cartItems = useSelector(cartSelector.selectAll) // - cart items
  const favoriteItems = useSelector(favoriteSelector.selectAll) //- favorite items
  const dispatch = useDispatch()

  //получить данные о товарах, добавленных в корзину
  /*function getCartItems() {
    return API('get', 'cart')
  }
  // получить данные о всех товарах
  function getItems() {
    return API('get', 'items')
  }
  // получить данные о товарах, добавленных в избранное
  function getFavoriteItems() {
    return API('get', 'favorites')
  }*/

  useEffect(() => {
    //получаем данные
    //setIsLoading(true);
    //товары в корзине
    /*getCartItems().then(res => {
      setCartItems(res.data);
    }).catch(err => {
      console.log(err)
    })
    //товары в избранном
    getFavoriteItems().then(res => {
      setFavoriteItems(res.data)
    }).catch(err => {
      console.log(err)
    })
    //все товары
    getItems().then(res => {
      setItems(res.data)
      setIsLoading(false);
    }).catch(err => {
      console.log(err)
      setIsLoading(false);
    })
    */
    batch(() => {
      dispatch(fetchCartItems());
      dispatch(fetchFavoriteItems());
      dispatch(fetchItems());
    })
    //setIsLoading(false);
  }, []);

  // добавить товар в корзину
  /*const addToCart = obj => {
    API('post', 'cart', obj).then(res => {
      setCartItems(prev => [...prev, res.data]);
    }).catch(err => {
      console.log(err)
    })
  }*/
  // удаляет товар из корзины
  /*const onRemoveItem = url => {
    const findCartItem = cartItems.find(item => item.url === url);
    API('delete', `cart/${findCartItem.id}`).then(res => {
      setCartItems(prev => prev.filter(item => item.id !== findCartItem.id));
    }).catch(err => {
      console.log(err)
    })
  }*/
  // контролирует поле ввода
  /*const onChangeSearchValue = event => {
    setSearchValue(event.target.value)
  }*/
  // добавляет товар в избранное
  /*const onAddFavorite = obj => {
    API('post', 'favorites', obj).then(res => {
      setFavoriteItems(prev => [...prev, res.data]);
    }).catch(err => {
      console.log(err)
    })
  }
  // удаляет товар из избранного
  function removeFromFavorite(url) {
    const favoriteItem = favoriteItems.find(item => item.url === url);
    API('delete', `favorites/${favoriteItem.id}`).then(res => {
      setFavoriteItems(prev => prev.filter(item => item.url !== url))
    }).catch(err => {
      console.log(err)
    })
  }*/
  // проверяет, есть ли данный товар в корзине
  /*const isAddedItem = itemId => {
    return cartItems.some(item => item.itemId === itemId)
  }
  // проверяет, есть ли данный товар в избранном
  const isFavoritedItem = itemId => {
    return favoriteItems.some(item => item.itemId === itemId)
  }/*/
  // объект для контекста
  const contextValue = {
    //items, //все товары
    //cartItems, //товары, добавленные в корзину
    //favoriteItems, //товары, добавленные в избранное
    //searchValue, //значение, поискового запроса
    //isLoading, //значение, обозначающее процесс загрузки
    cartOpened, //значение, обозначающее открытую/закрытыую корзину
    //addToCart, // ф-ция, добавляет товар в корзину
    //onAddFavorite, //ф-ция, добавляет товар в избранное
    //isAddedItem,  //ф-я, проверяет, есть ли данный товар в корзине
    //isFavoritedItem,  //ф-я, проверяет, есть ли данный товар в избранном
    //onChangeSearchValue, //ф-я, для события onChange у input элемента
    //setSearchValue, //ф-я, меняет searchValue на указанное значение
    setCartOpened, //ф-я, меняет cartOpened
    //onRemoveItem, //ф-я, удаляет товар из корзины
    //removeFromFavorite, //ф-я, удаляет товар из избранных(favorite)
    //setCartItems, // устанавливает cartItems
    //setIsLoading //ф-я, устанавливает isLoading
  }

  return (
    <AppContext.Provider value={contextValue}>
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
    </AppContext.Provider>
  )
}

export default App;
