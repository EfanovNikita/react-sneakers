import React, { useState } from 'react';
import Card from '../components/Card/Card';
import { itemsSelector } from '../redux/itemsSlice';
import { cartSelector } from '../redux/cartSlice';
import { favoriteSelector } from '../redux/favoriteSlice';
import searchImg from '../assets/img/search.svg';
import btnRemove from '../assets/img/btn-remove.svg';
import { useAppSelector } from '../hooks/appHooks';

function Home() {

    const [searchValue, setSearchValue] = useState('');
    const items = useAppSelector(itemsSelector.selectAll);
    const cartItems = useAppSelector(cartSelector.selectAll);
    const favoriteItems = useAppSelector(favoriteSelector.selectAll);
    const itemsIsLoading = useAppSelector(state => state.items.loading) === 'loading';
    const cartIsLoading = useAppSelector(state => state.cart.loading) === 'loading';
    const favoriteIsLoading = useAppSelector(state => state.favorite.loading) === 'loading';
    const allIsLoading = itemsIsLoading && favoriteIsLoading && cartIsLoading;

    const onChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const renderItems = () => {
        const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (
            (allIsLoading ? [...Array(8)] : filtredItems)
                .map((item, index) => {
                    const isAddedItem = Boolean(cartItems?.find(cartItem => cartItem.url === item.url))
                    const isFavorited = Boolean(favoriteItems?.find(favoriteItem => favoriteItem.url === item.url))
                    return <Card
                        key={index}
                        isLoading = {allIsLoading}
                        isAddedItem={isAddedItem}
                        isFavorited={isFavorited}
                        {...item}
                    />
                })

        )
    }

    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>{searchValue ? `Поиск по "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='searchBlock'>
                    <img src={searchImg} alt='search' />
                    {searchValue && <img className='clearBtn' onClick={() => setSearchValue('')} src={btnRemove} alt='clear' />}
                    <input onChange={onChangeSearchValue} value={searchValue} placeholder='Поиск...' />
                </div>
            </div>

            <div className='sneakers'>
                {renderItems()}
            </div>
        </div>
    )
}

export default Home;