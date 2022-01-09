import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context';

function Header({ openCart }) {
    const { cartItems } = useContext(AppContext);
    const totalPrice = cartItems.reduce(((sum, obj) => sum + obj.price), 0);

    return (
        <header>
            <Link to='/'>
                <div className={style.headerLeft}>
                    <img width={40} height={40} src='/img/logo.png' alt="logo" />
                    <div className={style.headerInfo}>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className={style.headerRight}>
                <li onClick={openCart}>
                    <img width={18} height={18} src='/img/cart.svg' alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img width={18} height={18} src='/img/heart.svg' alt="user" />
                    </Link>
                </li>
                <li>
                    <img width={18} height={18} src='/img/user.svg' alt="user" />
                </li>
            </ul>
        </header>
    )
}

export default Header;