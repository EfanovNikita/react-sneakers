import { useState } from 'react';
import style from './Card.module.scss';


function Card({ url, title, price, onPlus, onFavorite, favorited = false }) {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({url, title, price});
        setIsAdded(!isAdded);
    }

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite({url, title, price});
    }

    return (
        <div className={style.card}>
            <div className={style.favorite}>
                <img onClick={onClickFavorite} src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'} alt='unliked' />
            </div>
            <img width={133} height={112} src={url} alt='sneakers1' />
            <h5>{title}</h5>
            <div className={style.cardInfo}>
                <div className={style.cardPrice}>
                    <span>Цена:</span>
                    <b>{`${price} руб.`}</b>
                </div>
                <img onClick={onClickPlus} src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt='plus' />
            </div>
        </div>
    )
}

export default Card;