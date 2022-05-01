import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import cart from '../../assets/img/cart.svg';
import heart from '../../assets/img/heart.svg';
import user from '../../assets/img/user.svg';


function Header({cartItems, setCartOpened}) {
    const totalPrice = cartItems.reduce(((sum, obj) => sum + obj.price), 0);

    function openCart() {
        setCartOpened(true)
    }

    return (
        <header>
            <Link to='/'>
                <div className={style.headerLeft}>
                    <img width={40} height={40} src={logo} alt="logo" />
                    <div className={style.headerInfo}>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className={style.headerRight}>
                <li onClick={openCart}>
                    <img width={18} height={18} src={cart} alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img width={18} height={18} src={heart} alt="heart" />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src={user} alt="user" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;