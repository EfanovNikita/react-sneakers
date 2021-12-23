import React from 'react';

function App() {
  return (
    <div className="wrapper">
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
        <h1>Все кроссовки</h1>
        <div className='sneakers'>
          <div className='card'>
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
