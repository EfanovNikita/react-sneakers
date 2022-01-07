import Card from '../components/Card/Card';

function Home({ items, searchValue, cartItems, favoriteItems, addToCart, onAddFavorite, onChangeSearchValue, setSearchValue, isLoading }) {

    const renderItems = () => {
        const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (
            isLoading ? [...Array(8)].map((item, index) =>
            <Card 
                key={index}
                isLoading={isLoading}
                {...item}
            />)
            : filtredItems.map((item, index) => {
            console.log(item.url, cartItems, favoriteItems)
            return <Card 
                key={index}
                onFavorite={obj => onAddFavorite(obj)}
                onPlus={obj => addToCart(obj)}
                added={cartItems.some(obj => obj.url == item.url)}
                favorited={favoriteItems.some(obj => obj.url == item.url)}
                isLoading={isLoading}
                {...item}
            />})
                
        )
    }

    return (
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
                { renderItems() }
            </div>
        </div>
    )
}

export default Home;