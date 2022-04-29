import style from './Card.module.scss';
import ContentLoader from "react-content-loader";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, cartSelector, removeFromCart } from '../../redux/cartSlice';
import { addToFavorite, favoriteSelector, removeFromFavorite } from '../../redux/favoriteSlice';
import btnChecked from '../../assets/img/btn-checked.svg';
import btnPlus from '../../assets/img/btn-plus.svg';
import like from '../../assets/img/liked.svg';
import unliked from '../../assets/img/unliked.svg';



function Card({url, title, price, isOrder = false, isAddedItem = false, isFavorited = false, isLoading = false }) {

    const dispatch = useDispatch();
    const cartItems = useSelector(cartSelector.selectAll);
    const favoriteItems = useSelector(favoriteSelector.selectAll);
    // добваить товар в корзину
    const onClickPlus = () => {
        dispatch(addToCart({ url, title, price }))
    }
    // удалить товар из корзины
    const deleteFromCart = () => {
        const itemId = cartItems.find(item => item.url === url).id
        dispatch(removeFromCart(itemId))
    }
    // добавить товар в избранное
    const onClickFavorite = () => {
        dispatch(addToFavorite({ url, title, price }))
    }
    // удалить товар из избранных
    const deleteFromFavorite = () => {
        const itemId = favoriteItems.find(item => item.url === url).id
        dispatch(removeFromFavorite(itemId))
    }

    return (
        <div className={style.card}>
            {isLoading ? <ContentLoader
                speed={2}
                width={155}
                height={265}
                viewBox="0 0 150 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="10" ry="10" width="155" height="155" />
                <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
                <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
                <rect x="0" y="234" rx="5" ry="5" width="80" height="25" />
                <rect x="118" y="230" rx="10" ry="10" width="32" height="32" />
            </ContentLoader> :
                <>
                    <div className={style.favorite}>
                        {!isOrder && (isFavorited ?
                            <img  src={like} alt='liked' onClick={deleteFromFavorite}/>
                            : <img  src={unliked} alt='unliked' onClick={onClickFavorite}/>)}
                    </div>
                    <img width="100%" height={135} src={require(`../../assets/${url}`)} alt='sneaker' />
                    <h5>{title}</h5>
                    <div className={style.cardInfo}>
                        <div className={style.cardPrice}>
                            <span>Цена:</span>
                            <b>{`${price} руб.`}</b>
                        </div>
                        {!isOrder && (isAddedItem ?
                            <img src={btnChecked} alt='checked' onClick={deleteFromCart}/>
                            : <img src={btnPlus} alt='plus' onClick={onClickPlus}/>)}
                    </div>
                </>
            }
        </div>
    )
}

export default Card;