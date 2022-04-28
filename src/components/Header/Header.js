import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context';


function Header({cartItems}) {
    //const { cartItems, setCartOpened } = useContext(AppContext);
    const totalPrice = cartItems.reduce(((sum, obj) => sum + obj.price), 0);

    /*function openCart() {
        setCartOpened(true)
    }*/

    return (
        <header>
            <Link to='/'>
                <div className={style.headerLeft}>
                    <img width={40} height={40} src={process.env.PUBLIC_URL + '/img/logo.png'} alt="logo" />
                    <div className={style.headerInfo}>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className={style.headerRight}>
                <li >
                    <img width={18} height={18} src={process.env.PUBLIC_URL + '/img/cart.svg'} alt="cart" />
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to='/favorites'>
                        <img width={18} height={18} src={process.env.PUBLIC_URL + '/img/heart.svg'} alt="heart" />
                    </Link>
                </li>
                <li>
                    <Link to='/orders'>
                        <img width={18} height={18} src={process.env.PUBLIC_URL + '/img/user.svg'} alt="user" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;