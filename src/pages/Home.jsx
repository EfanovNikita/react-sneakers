import Card from '../components/Card/Card';

function Home({ items, searchValue, addToCart, onAddFavorite, onChangeSearchValue, setSearchValue }) {
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
                {items
                    .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(item =>
                        <Card url={item.url}
                            title={item.title}
                            price={item.price}
                            key={item.url}
                            onFavorite={obj => onAddFavorite(obj)}
                            onPlus={obj => addToCart(obj)}
                        />)}
            </div>
        </div>
    )
}

export default Home;