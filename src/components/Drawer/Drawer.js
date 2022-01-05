import style from './Drawer.module.scss';

function Drawer({ closeCart, items, onRemove }) {
    return (
        <div className={style.overlay}>
            <div className={style.drawer}>
                <h2>Корзина <img className='' onClick={closeCart} src='/img/btn-remove.svg' alt='close' /></h2>

                <div className={style.items}>
                    {items.map(obj => (
                        <div className={style.cartItem} key={obj.url}>
                            <div style={{ backgroundImage: `url(${obj.url})` }} className={style.cartItemImg}></div>
                            <div>
                                <p>{obj.title}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img className={style.btnRemove} onClick={() => onRemove(obj.id)} src='/img/btn-remove.svg' alt='remove' />
                        </div>
                    ))}
                </div>

                <div className={style.cartTotalBlock}>
                    <ul>
                        <li>
                            <span>Итого: </span>
                            <div></div>
                            <b>21 000 руб. </b>
                        </li>
                        <li>
                            <span>Налог 5%: </span>
                            <div></div>
                            <b>1074 руб. </b>
                        </li>
                    </ul>
                    <button className={style.greenButton}>Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                </div>
            </div>
        </div>
    )
}

export default Drawer;