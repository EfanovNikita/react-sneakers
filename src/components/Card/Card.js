import { useContext } from 'react';
import style from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';



function Card({ url, title, price, onPlus, onFavorite, isLoading }) {

    const onClickPlus = () => {
        onPlus({ url, title, price });
    }

    const onClickFavorite = () => {
        onFavorite({ url, title, price });
    }

    const { isAddedItem, isFavoritedItem } = useContext(AppContext);

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
                        <img onClick={onClickFavorite} src={isFavoritedItem(url) ? '/img/liked.svg' : '/img/unliked.svg'} alt='unliked' />
                    </div>
                    <img width="100%" height={135} src={url} alt='sneakers1' />
                    <h5>{title}</h5>
                    <div className={style.cardInfo}>
                        <div className={style.cardPrice}>
                            <span>Цена:</span>
                            <b>{`${price} руб.`}</b>
                        </div>
                        <img onClick={onClickPlus} src={isAddedItem(url) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} alt='plus' />
                    </div>
                </>
            }
        </div>
    )
}

export default Card;