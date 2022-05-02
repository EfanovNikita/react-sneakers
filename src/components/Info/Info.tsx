import style from '../Drawer/Drawer.module.scss';
import arrow from '../../assets/img/arrow.svg';

type InfoProps = {
    title: string;
    description: string;
    image: string;
    onCartExit: ()=>void;
}

const Info = ({ title, description, image, onCartExit }: InfoProps) => {
    return (
        <div className={style.cartEmpty}>
            <img className={style.cartImg} src={image} alt="empty-cart" />
            <h2>{title}</h2>
            <p>{description}</p>
            <button className={style.greenButton} onClick={onCartExit}>
                Вернуться назад
                <img className={style.leftArrow} src={arrow} alt="arrow" />
            </button>
        </div>
    )
}

export default Info;