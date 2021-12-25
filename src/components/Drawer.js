function Drawer() {
    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2>Корзина <img className='' src='/img/btn-remove.svg' alt='remove' /></h2>

                <div className='items'>
                    <div className='cartItem'>
                        <div style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }} className='cartItemImg'></div>
                        <div>
                            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
                            <b>10 565 руб.</b>
                        </div>
                        <img className='btnRemove' src='/img/btn-remove.svg' alt='remove' />
                    </div>
                    <div className='cartItem'>
                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} className='cartItemImg'></div>
                        <div>
                            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
                            <b>10 565 руб.</b>
                        </div>
                        <img className='btnRemove' src='/img/btn-remove.svg' alt='remove' />
                    </div>
                    <div className='cartItem'>
                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} className='cartItemImg'></div>
                        <div>
                            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
                            <b>10 565 руб.</b>
                        </div>
                        <img className='btnRemove' src='/img/btn-remove.svg' alt='remove' />
                    </div>
                    <div className='cartItem'>
                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} className='cartItemImg'></div>
                        <div>
                            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
                            <b>10 565 руб.</b>
                        </div>
                        <img className='btnRemove' src='/img/btn-remove.svg' alt='remove' />
                    </div>
                    <div className='cartItem'>
                        <div style={{ backgroundImage: 'url(/img/sneakers/2.jpg)' }} className='cartItemImg'></div>
                        <div>
                            <p>Мужские кроссовки Nike Blazer Mid Suede</p>
                            <b>10 565 руб.</b>
                        </div>
                        <img className='btnRemove' src='/img/btn-remove.svg' alt='remove' />
                    </div>
                </div>

                <div className="cartTotalBlock">
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
                    <button className='greenButton'>Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                </div>
            </div>
        </div>
    )
}

export default Drawer;