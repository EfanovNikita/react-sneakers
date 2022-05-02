import Card from "../components/Card/Card";
import { useAppSelector } from "../hooks/appHooks";
import { cartSelector } from "../redux/cartSlice";
import { favoriteSelector } from "../redux/favoriteSlice";

function Favorites() {
    const favoriteItems = useAppSelector(favoriteSelector.selectAll);
    const cartItems = useAppSelector(cartSelector.selectAll);
    const isLoading = useAppSelector(state => state.favorite.loading) === 'loading';

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