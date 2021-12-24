import React from 'react';

function App() {
  return (
    <div className="wrapper">
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


      <header>
        <div className='headerLeft'>
          <img width={40} height={40} src='/img/logo.png' alt="logo" />
          <div className='headerInfo'>
            <h3>REACT SNEAKERS</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className='headerRight'>
          <li>
            <img width={18} height={18} src='/img/cart.svg' alt="cart" />
            <span>7655 руб.</span>
          </li>
          <li>
            <img width={18} height={18} src='/img/user.svg' alt="user" />
          </li>
        </ul>
      </header>
      <div className='content'>
        <div className='contentHeader'>
          <h1>Все кроссовки</h1>
          <div className='searchBlock'>
            <img src='/img/search.svg' alt='search' />
            <input placeholder='Поиск...' />
          </div>
        </div>


        <div className='sneakers'>
          <div className='card'>
            <div className='favorite'>
              <img src='/img/unliked.svg' alt='unliked' />
            </div>
            <img width={133} height={112} src='/img/sneakers/1.jpg' alt='sneakers1' />
            <h5>Мужские кроссовки Nike Blazer Mid Suede</h5>
            <div className='cardInfo'>
              <div className='cardPrice'>
                <span>Цена:</span>
                <b>10 565 руб.</b>
              </div>
              <button>
                <img width={11} height={11} src='/img/plus.svg' alt='plus' />
              </button>
            </div>
          </div>
          <div className='card'>
            <img width={133} height={112} src='/img/sneakers/2.jpg' alt='sneakers1' />
            <h5>Мужские кроссовки Nike Blazer Mid Suede</h5>
            <div className='cardInfo'>
              <div className='cardPrice'>
                <span>Цена:</span>
                <b>10 565 руб.</b>
              </div>
              <button>
                <img width={11} height={11} src='/img/plus.svg' alt='plus' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
