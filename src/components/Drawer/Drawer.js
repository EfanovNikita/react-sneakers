import axios from 'axios';
import { useContext, useState } from 'react';
import AppContext from '../../context';
import Info from '../Info/Info';
import style from './Drawer.module.scss';

function Drawer({ opened }) {

    const { setCartOpened, onRemoveItem, cartItems, setCartItems } = useContext(AppContext);

    const [isOrderComplite, setIsOrderComplite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const totalPrice = cartItems.reduce(((sum, obj) => sum + obj.price), 0);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://61d422528df81200178a8ac2.mockapi.io/orders', { items: cartItems});
            cartItems.forEach(item => onRemoveItem(item.id));
            setCartItems([]);
            setOrderNumber(data.id);
            setIsOrderComplite(true);
            
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    const onCartExit = () => {
        setCartOpened(false);
        setIsOrderComplite(false);
    }

    return (
        <div className={`${style.overlay} ${opened ? style.overlayVisible : ''}`}>
            <div className={style.drawer}>
                <h2>Корзина <img onClick={onCartExit} src='/img/btn-remove.svg' alt='close' /></h2>

                {!cartItems[0] ?
                    <Info title={isOrderComplite ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isOrderComplite ? `Ваш заказ #${orderNumber} отправлен доставкой курьером` : "Добавьте товар в корзину"}
                        image={isOrderComplite ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                        onCartExit={onCartExit} />
                    :
                    <>
                        <div className={style.items}>
                            {cartItems.map(obj => (
                                <div className={style.cartItem} key={obj.url}>
                                    <div style={{ backgroundImage: `url(${obj.url})` }} className={style.cartItemImg}></div>
                                    <div>
                                        <p>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img className={style.btnRemove} onClick={() => onRemoveItem(obj.id)} src='/img/btn-remove.svg' alt='remove' />
                                </div>
                            ))}
                        </div>
                        <div className={style.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого: </span>
                                    <div></div>
                                    <b>{totalPrice} руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{totalPrice * 0.95} руб. </b>
                                </li>
                            </ul>
                            <button className={style.greenButton} onClick={onClickOrder} disabled={isLoading}>
                                Оформить заказ
                                <img src="/img/arrow.svg" alt="arrow" />
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Drawer;