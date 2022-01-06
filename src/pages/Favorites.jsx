import Card from "../components/Card/Card";

function Favorites({ favoriteItems, onAddFavorite, addToCart }) {
    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {favoriteItems
                    .map(item =>
                        <Card url={item.url}
                            title={item.title}
                            price={item.price}
                            key={item.url}
                            onFavorite={obj => onAddFavorite(obj)}
                            onPlus={obj => addToCart(obj)}
                            favorited={true}
                        />)}
            </div>
        </div>
    )
}

export default Favorites;