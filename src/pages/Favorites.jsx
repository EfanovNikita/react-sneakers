import { useContext } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card/Card";
import AppContext from "../context";
import { cartSelector } from "../redux/cartSlice";
import { favoriteSelector } from "../redux/favoriteSlice";

function Favorites() {

    //const { favoriteItems } = useContext(AppContext);

    const favoriteItems = useSelector(favoriteSelector.selectAll);
    const cartItems = useSelector(cartSelector.selectAll);
    const isLoading = useSelector(state => state.favorite.loading) === 'loading';

    return (
        <div className='content'>
            <div className='contentHeader'>
                <h1>Мои закладки</h1>
            </div>

            <div className="sneakers">
                {favoriteItems.map(item => {
                    const isAdded = cartItems.includes(item);
                    return <Card
                        key={item.url}
                        isLoading = {isLoading}
                        isAddedItem = {isAdded}
                        isFavorited = {true}
                        {...item}
                    />
                })}
            </div>
        </div>
    )
}

export default Favorites;