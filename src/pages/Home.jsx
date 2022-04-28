import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card/Card';
import { itemsSelector } from '../redux/itemsSlice';
import { cartSelector } from '../redux/cartSlice';
import { favoriteSelector } from '../redux/favoriteSlice';

function Home() {

    const [searchValue, setSearchValue] = useState('');
    const items = useSelector(itemsSelector.selectAll);
    const cartItems = useSelector(cartSelector.selectAll);
    const favoriteItems = useSelector(favoriteSelector.selectAll);
    const itemsIsLoading = useSelector(state => state.items.loading) === 'loading';
    const cartIsLoading = useSelector(state => state.cart.loading) === 'loading';
    const favoriteIsLoading = useSelector(state => state.favorite.loading) === 'loading';
    const allIsLoading = itemsIsLoading && favoriteIsLoading && cartIsLoading;

    const onChangeSearchValue = (e) => {
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
                        isLoading = {itemsIsLoading}
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
                    <img src={process.env.PUBLIC_URL + '/img/search.svg'} alt='search' />
                    {searchValue && <img className='clearBtn' onClick={() => setSearchValue('')} src={process.env.PUBLIC_URL + '/img/btn-remove.svg'} alt='clear' />}
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