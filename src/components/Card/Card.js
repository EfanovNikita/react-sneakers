import style from './Card.module.scss';


function Card({url, title, price}) {
    const onClickButton = () => {
        alert(1);
    }

    return (
        <div className={style.card}>
            <div className={style.favorite}>
                <img src='/img/unliked.svg' alt='unliked' />
            </div>
            <img width={133} height={112} src={url} alt='sneakers1' />
            <h5>{title}</h5>
            <div className={style.cardInfo}>
                <div className={style.cardPrice}>
                    <span>Цена:</span>
                    <b>{`${price} руб.`}</b>
                </div>
                <button onClick={onClickButton}>
                    <img width={11} height={11} src='/img/plus.svg' alt='plus' />
                </button>
            </div>
        </div>
    )
}

export default Card;