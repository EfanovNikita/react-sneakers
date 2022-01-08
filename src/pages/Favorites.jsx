import { useContext } from "react";
import Card from "../components/Card/Card";
import AppContext from "../context";

function Favorites({ onAddFavorite, addToCart }) {

    const { favoriteItems } = useContext(AppContext);

    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {favoriteItems
                    .map(item =>
                        <Card 
                            key={item.url}
                            onFavorite={obj => onAddFavorite(obj)}
                            onPlus={obj => addToCart(obj)}
                            {...item}
                        />)}
            </div>
        </div>
    )
}

export default Favorites;