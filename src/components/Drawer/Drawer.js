import { useContext, useState } from 'react';
import Info from '../Info/Info';
import style from './Drawer.module.scss';
import completeOrder from '../../assets/img/complete-order.jpg';
import emptyCart from '../../assets/img/empty-cart.jpg';
import btnRemove from '../../assets/img/btn-remove.svg';
import arrow from '../../assets/img/arrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { cartSelector, removeFromCart } from '../../redux/cartSlice';
import { postOrder } from '../../redux/orderSlice';

function Drawer({ setCartOpened, cartOpened }) {

    //const { /*setCartOpened,*/ onRemoveItem, /*cartItems*/ setCartItems, /*cartOpened*/ } = useContext(AppContext);
    const cartItems = useSelector(cartSelector.selectAll);
    const [isOrderComplite, setIsOrderComplite] = useState(false); //сделан(или нет) заказ
    const [isLoading, setIsLoading] = useState(false); // локальный показатель загрузки
    const [orderNumber, setOrderNumber] = useState(null); // номер заказа
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce(((sum, obj) => sum + obj.price), 0); //цена всех товаров в корзине
    // отправляем заказ на сервер и удаляем товары из корзины
    const doOrder = async () => {
        setIsLoading(true);
       /* API('post', 'orders', { order: cartItems }).then(res => {
            cartItems.forEach(item => {
                API('delete', `cart/${item.id}`);
            });
            setCartItems([]);
            setOrderNumber(res.data.id);
            setIsOrderComplite(true);
            setIsLoading(false);
        }).catch(err => {
            console.log(err)
        })*/
        try {
            const res = await dispatch(postOrder({ order: cartItems })).unwrap()
            cartItems.forEach(item => {
                dispatch(removeFromCart(item.id))
            })
            setOrderNumber(res.id)
            setIsOrderComplite(true)
        } catch(err) {
            console.log(err)
        }
        setIsLoading(false);
    }
    // закрыть корзину
    const onCartExit = () => {
        setCartOpened(false);
        setIsOrderComplite(false);
    }

    const onRemoveItem = (e) => {
        dispatch(removeFromCart(e.target.dataset.id))
    }

    return (
        <div className={`${style.overlay} ${cartOpened ? style.overlayVisible : ''}`}>
            <div className={style.drawer}>
                <h2>Корзина <img onClick={onCartExit} src={btnRemove} alt='close' /></h2>

                {!cartItems[0] ?
                    <Info title={isOrderComplite ? "Заказ оформлен!" : "Корзина пустая"}
                        description={isOrderComplite ? `Ваш заказ #${orderNumber} отправлен доставкой курьером` : "Добавьте товар в корзину"}
                        image={isOrderComplite ? completeOrder : emptyCart}
                        onCartExit={onCartExit} />
                    :
                    <>
                        <div className={style.items}>
                            {cartItems.map(obj => (
                                <div className={style.cartItem} key={obj.url}>
                                    <div style={{ backgroundImage: `url(${require(`../../assets/${obj.url}`)})` }} className={style.cartItemImg}></div>
                                    <div>
                                        <p>{obj.title}</p>
                                        <b>{obj.price} руб.</b>
                                    </div>
                                    <img className={style.btnRemove} onClick={onRemoveItem} src={btnRemove} alt='remove' data-id={obj.id} />
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
                                    <b>{Math.floor(totalPrice * 0.05)} руб. </b>
                                </li>
                            </ul>
                            <button className={style.greenButton} onClick={doOrder} disabled={isLoading}>
                                Оформить заказ
                                <img src={arrow} alt="arrow" />
                            </button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Drawer;