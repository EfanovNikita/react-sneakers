import style from './Header.module.scss';

function Header({ openCart }) {
    return (
        <header>
            <div className={style.headerLeft}>
                <img width={40} height={40} src='/img/logo.png' alt="logo" />
                <div className={style.headerInfo}>
                    <h3>REACT SNEAKERS</h3>
                    <p>Магазин лучших кроссовок</p>
                </div>
            </div>
            <ul className={style.headerRight}>
                <li onClick={openCart}>
                    <img width={18} height={18} src='/img/cart.svg' alt="cart" />
                    <span>7655 руб.</span>
                </li>
                <li>
                    <img width={18} height={18} src='/img/user.svg' alt="user" />
                </li>
            </ul>
        </header>
    )
}

export default Header;