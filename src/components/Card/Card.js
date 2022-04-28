import { useContext } from 'react';
import style from './Card.module.scss';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, cartSelector, removeFromCart } from '../../redux/cartSlice';
import { addToFavorite, favoriteSelector, removeFromFavorite } from '../../redux/favoriteSlice';



function Card({ url, title, price, isOrder = false, isAddedItem = false, isFavorited = false, isLoading = false }) {

    const dispatch = useDispatch();
    // добваить товар в корзину
    /*const onClickPlus = () => {
        //addToCart({ url, title, price });
        //dispatch(addToCart({ url, title, price }))
    }
    // удалить товар из корзины
    //const deleteFromCart = () => {
        //onRemoveItem(url)
        dispatch(removeFromCart(props.id))
    }
    // добавить товар в избранное
    //const onClickFavorite = () => {
        //onAddFavorite({ url, title, price });
        dispatch(addToFavorite({ url, title, price }))
    }
    // удалить товар из избранных
    const deleteFromFavorite = () => {
        //removeFromFavorite(url)
        //dispatch(removeFromFavorite(id))
    }*/

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
                            <img  src={process.env.PUBLIC_URL + '/img/liked.svg'} alt='liked' />
                            : <img  src={process.env.PUBLIC_URL + '/img/unliked.svg'} alt='unliked' />)}
                    </div>
                    <img width="100%" height={135} src={process.env.PUBLIC_URL + '/' + url} alt='sneakers1' />
                    <h5>{title}</h5>
                    <div className={style.cardInfo}>
                        <div className={style.cardPrice}>
                            <span>Цена:</span>
                            <b>{`${price} руб.`}</b>
                        </div>
                        {!isOrder && (isAddedItem ?
                            <img src={process.env.PUBLIC_URL + '/img/btn-checked.svg'} alt='checked' />
                            : <img src={process.env.PUBLIC_URL + '/img/btn-plus.svg'} alt='plus' />)}
                    </div>
                </>
            }
        </div>
    )
}

export default Card;