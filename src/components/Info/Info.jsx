import React from 'react';
import style from '../Drawer/Drawer.module.scss';

function Info({ title, description, image, onCartExit }) {
    return (
        <div className={style.cartEmpty}>
            <img className={style.cartImg} src={image} alt="empty-cart" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={style.greenButton} onClick={onCartExit}>
                Вернуться назад
                <img className={style.leftArrow} src="img/arrow.svg" alt="arrow" />
            </button>
        </div>
    )
}

export default Info;